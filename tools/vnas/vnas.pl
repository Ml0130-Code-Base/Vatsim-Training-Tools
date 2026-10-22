#!/usr/bin/perl
# vnas.pl - pull and read the public vNAS data, with perl and curl only.
#
#   perl tools/vnas/vnas.pl config
#   perl tools/vnas/vnas.pl summaries
#   perl tools/vnas/vnas.pl artcc ZID ZID/_vnas/ZID_vnas.json
#   perl tools/vnas/vnas.pl diff old.json new.json
#   perl tools/vnas/vnas.pl maps ZID/_vnas/ZID_vnas.json 'TRACON Boundary|MVA'
#   perl tools/vnas/vnas.pl map ZID 01H1ANPCMZ93CWNMTBPSP38P85 out.geojson
#   perl tools/vnas/vnas.pl stats out.geojson
#
# No Python and no Node on the owner's machine (root CLAUDE.md section 12); perl and curl are
# there. Everything here is an unauthenticated GET. The host sits behind Cloudflare and refuses a
# default library agent, so every request carries an identifying User-Agent. Read
# claude_vNAS_Source_Reference.md before using what this pulls.
#
# /api/* sends no ETag or Last-Modified (cf-cache-status DYNAMIC): invalidate an ARTCC record
# against lastUpdatedAt in /api/artcc-summaries. /Files/* does send both, so `map` is a
# conditional GET when an output file already exists.
use strict; use warnings;
use JSON::PP;

my $UA   = $ENV{VNAS_USER_AGENT} || 'vatsim-training-tools/1.0 (+https://github.com/Ml0130-Code-Base/Vatsim-Training-Tools)';
my $CFG  = 'https://configuration.vnas.vatsim.net/';
my $json = JSON::PP->new->canonical->allow_nonref;

sub curl {
  my ($url, @extra) = @_;
  open(my $fh, '-|', 'curl', '-sS', '--fail-with-body', '-A', $UA, @extra, $url) or die "curl: $!";
  local $/; my $body = <$fh>; close $fh;
  die "GET failed: $url\n" if $? != 0;
  return $body;
}
sub getj { return $json->decode(curl(@_)); }
sub slurp { open(my $fh, '<:raw', $_[0]) or die "$_[0]: $!"; local $/; my $s = <$fh>; close $fh; return $s; }
sub spit  { open(my $fh, '>:raw', $_[0]) or die "$_[0]: $!"; print $fh $_[1]; close $fh; }

my ($cmd, @a) = @ARGV;
$cmd ||= '';

if ($cmd eq 'config') {
  print $json->pretty->encode(getj($CFG));
}
elsif ($cmd eq 'summaries') {
  my $s = getj((getj($CFG))->{dataApiBaseUrl} . '/artcc-summaries');
  printf "%-4s %-26s %s\n", $_->{id}, $_->{lastUpdatedAt}, $_->{eramDataLastUpdatedAt} || '' for @$s;
}
elsif ($cmd eq 'artcc') {
  my ($id, $out) = @a; die "usage: artcc ID out.json\n" unless $out;
  my $base = (getj($CFG))->{dataApiBaseUrl};
  my $raw  = curl("$base/artccs/" . uc $id);
  my $rec  = $json->decode($raw);                       # refuse to save anything that is not JSON
  die "no facility in the reply\n" unless $rec->{facility};
  spit($out, $raw);                                     # as served; the committed snapshots are as served
  print "$rec->{id} lastUpdatedAt $rec->{lastUpdatedAt}, " . length($raw) . " bytes -> $out\n";
}
elsif ($cmd eq 'maps') {
  my ($file, $re) = @a; die "usage: maps record.json 'regex'\n" unless $file;
  my $rec = $json->decode(slurp($file));
  $re = qr/$re/i if defined $re;
  my $n = 0;
  for my $m (sort { $a->{name} cmp $b->{name} } @{ $rec->{videoMaps} || [] }) {
    next if defined $re && $m->{name} !~ $re;
    printf "%s  %s  [%s]\n", $m->{id}, $m->{name}, substr($m->{lastUpdatedAt} || '', 0, 10); $n++;
  }
  print STDERR "$n of " . scalar(@{ $rec->{videoMaps} || [] }) . " maps\n";
}
elsif ($cmd eq 'map') {
  my ($artcc, $id, $out) = @a; die "usage: map ARTCC ULID out.geojson\n" unless $out;
  my $base = (getj($CFG))->{videoMapBaseUrl};
  my @c = (-e $out) ? ('-z', $out) : ();                # If-Modified-Since from the file we hold
  my $tmp = "$out.part";
  system('curl', '-sS', '--fail', '-A', $UA, @c, '-D', "$out.hdr", '-o', $tmp, '-R', "$base/" . uc($artcc) . "/$id.geojson") == 0
    or die "map GET failed: $artcc/$id\n";
  if (-s $tmp) { rename $tmp, $out; print "fetched $artcc/$id (" . (-s $out) . " bytes)\n"; }
  else         { unlink $tmp; print "not modified $artcc/$id\n"; }
}
elsif ($cmd eq 'stats') {
  # What a map actually holds. Sentinel [0,0] points and out-of-range points are counted, not used.
  my $g = $json->decode(slurp($a[0]));
  my (%t, $sent, $bad, $pts, @lon, @lat);
  for my $f (@{ $g->{features} }) {
    my $geo = $f->{geometry} or next;
    $t{ $geo->{type} }++;
    my @p = flat($geo->{coordinates});
    for my $q (@p) {
      my ($x, $y) = @$q;
      if ($x == 0 && $y == 0) { $sent++; next }
      if (abs($x) > 180 || abs($y) > 90) { $bad++; next }
      $pts++; push @lon, $x; push @lat, $y;
    }
  }
  my ($x0, $x1) = minmax(@lon); my ($y0, $y1) = minmax(@lat);
  printf "features %d  types %s\nvertices %d  sentinel(0,0) %d  out-of-range %d\n", scalar(@{ $g->{features} }),
    join(',', map {"$_:$t{$_}"} sort keys %t), $pts || 0, $sent || 0, $bad || 0;
  printf "lat %.4f..%.4f  lon %.4f..%.4f\n", $y0, $y1, $x0, $x1 if @lon;
}
elsif ($cmd eq 'diff') {
  my ($old, $new) = @a; die "usage: diff old.json new.json\n" unless $new;
  my (%o, %n);
  flatten($json->decode(slurp($old)), '', \%o);
  flatten($json->decode(slurp($new)), '', \%n);
  my (%rem, %add, %chg);
  for my $k (sort keys %o) { if (!exists $n{$k}) { $rem{$k} = $o{$k} } elsif ($o{$k} ne $n{$k}) { $chg{$k} = [$o{$k}, $n{$k}] } }
  for my $k (sort keys %n) { $add{$k} = $n{$k} unless exists $o{$k} }
  printf "removed %d  added %d  changed %d\n", scalar(keys %rem), scalar(keys %add), scalar(keys %chg);
  print "CHANGED $_: $chg{$_}[0]  ->  $chg{$_}[1]\n" for sort keys %chg;
  print "REMOVED $_: $rem{$_}\n" for sort keys %rem;
  print "ADDED   $_: $add{$_}\n" for sort keys %add;
}
else {
  die "usage: vnas.pl config|summaries|artcc|maps|map|stats|diff (see the header)\n";
}

sub flat { my ($c) = @_; return () unless ref $c eq 'ARRAY'; return ($c) if @$c >= 2 && !ref $c->[0]; return map { flat($_) } @$c; }
sub minmax { my ($lo, $hi) = ($_[0], $_[0]); for (@_) { $lo = $_ if $_ < $lo; $hi = $_ if $_ > $hi } return ($lo, $hi); }

# Flatten to path => scalar. Arrays of objects are keyed by their id (or name) so that a
# reordering is not a change; videoMaps and transceivers are left to counts, they are not
# operational data and a diff of 1,359 maps is noise.
sub flatten {
  my ($v, $path, $out) = @_;
  if (ref $v eq 'HASH') {
    flatten($v->{$_}, "$path/$_", $out) for keys %$v;
  } elsif (ref $v eq 'ARRAY') {
    if ($path =~ m{/(videoMaps|transceivers)$}) { $out->{"$path#count"} = scalar @$v; return }
    my $i = 0;
    for my $e (@$v) {
      my $k = $i++;
      if (ref $e eq 'HASH') {
        $k = $e->{id} if defined $e->{id} && !ref $e->{id};
        $k = $e->{callsign} if defined $e->{callsign} && !ref $e->{callsign} && !defined $e->{id};
      } elsif (defined $e && !ref $e) { $k = $e }
      flatten($e, "$path\[$k]", $out);
    }
    $out->{"$path#count"} = scalar @$v;
  } else {
    $out->{$path} = defined $v ? "$v" : 'null';
  }
}
