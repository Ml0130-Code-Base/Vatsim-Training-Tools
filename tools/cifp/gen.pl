use strict; use warnings;
use FindBin; use lib $FindBin::Bin;
use Cifp qw(load_cifp fmt_dm fmt_dd);
binmode(STDOUT, ':utf8');

# usage: gen.pl <FAACIFP18> <cycle> <FAC> [section]
my ($file,$cycle,$fac,$only) = @ARGV;

my %FAC = (
  S56   => { style=>'grouped', apts=>[qw(KSLC KBMC KHIF KOGD KPVU KSPK KTVY KSVR)], idtable=>0 },
  C90   => { style=>'flat',    apts=>[qw(KORD KMDW KDPA KPWK KARR KGYY KLOT KUGN)], idtable=>1,
             idorder=>[qw(KARR KDPA KGYY KLOT KMDW KORD KPWK KUGN)] },
  AZO   => { style=>'flat',    apts=>[qw(KAZO KGRR KMKG KBTL KBIV KHLM)], idtable=>0 },
  BIGSKY=> { style=>'flat',    apts=>[qw(KBOI KBZN)], idtable=>1, idorder=>[qw(KBOI KBZN)] },
);
my $F = $FAC{$fac} or die "unknown facility $fac";
my $M = load_cifp($file, $F->{apts});

my %APPR_NAME = (H=>'RNAV (RNP)', I=>'ILS', L=>'LOC', R=>'RNAV (GPS)', S=>'VOR/DME required', V=>'VOR', X=>'LDA');

sub appr_name {
  my ($id)=@_;
  if ($id =~ /^VOR-([A-Z])$/) { return "VOR circling $1"; }
  if ($id =~ /^RNV-([A-Z])$/) { return "RNAV circling $1"; }
  if ($id =~ /^([A-Z])(\d\d)([LRC\-]?)([A-Z]?)$/) {
    my ($t,$r,$l,$s)=($1,$2,$3,$4);
    $l = '' if $l eq '-';
    my $n = $APPR_NAME{$t} // "type $t";
    return $n . ($s ne '' ? " $s" : '') . " RWY $r$l";
  }
  return $id;
}

sub altnum { my $s=shift; return undef if !defined $s || $s eq ''; return $s if $s =~ /^FL/; return $s+0 if $s =~ /^\d+$/; return $s; }
sub altfmt {
  my ($v,$thou)=@_;
  return $v if $v =~ /^FL/;
  if ($thou) { my $t = $v/1000; my $s = sprintf('%.1f',$t); $s =~ s/\.0$//; return $s; }
  return "$v";
}
my %NONFIX = map { $_=>1 } qw(CA CD CI CR FM VA VD VI VM VR);

sub crossing {
  my ($g,$thou)=@_;
  my $a1 = altnum($g->{a1}); my $a2 = altnum($g->{a2});
  my $ad = $g->{ad};
  my $x = '';
  if ($ad eq 'B' && defined $a1 && defined $a2) { $x = altfmt($a2,$thou).' - '.altfmt($a1,$thou); }
  elsif (defined $a1) {
    my $p = $ad eq '+' ? '>=' : $ad eq '-' ? '<=' : '';
    $x = $p . altfmt($a1,$thou);
  }
  my $sp = $g->{spd} ne '' ? '/'.($g->{spd}+0) : '';
  return $x.$sp;
}

# One transition's legs -> (text, nonfixcount, [fixes in order])
sub ladder {
  my ($legs,$thou)=@_;
  my (@parts,@fixes); my $nf=0;
  for my $g (@$legs) {
    if ($NONFIX{$g->{pt}}) { push @parts, "[$g->{pt} leg - not a fix]"; $nf++; next; }
    next if $g->{fix} eq '';
    my $x = crossing($g,$thou);
    push @parts, $g->{fix} . ($x ne '' ? ($x =~ m{^/} ? $x : " $x") : '');
    push @fixes, $g;
  }
  my $t = join(' | ', @parts);
  $t .= "  *($nf non-fix leg".($nf==1?'':'s').")*" if $nf;
  return ($t,\@fixes);
}

# group order for a procedure: returns list of [label, legs]
sub groups {
  my ($P)=@_;
  my $k = $P->{kind};
  my (@e,@c,@r);
  for my $key (keys %{$P->{tr}}) {
    my ($rt,$tr)=split /\|/, $key, 2;
    if ($k eq 'E') {
      if ($rt =~ /[147]/) { push @e, [$tr,$P->{tr}{$key}]; }
      elsif ($rt =~ /[258]/) { push @c, [($tr ne '' ? $tr : '(final)'),$P->{tr}{$key}]; }
      else { push @r, [$tr,$P->{tr}{$key}]; }
    } elsif ($k eq 'D') {
      if ($rt =~ /[14T]/) { push @r, [$tr,$P->{tr}{$key}]; }
      elsif ($rt =~ /[25]/) { push @c, [($tr ne '' ? $tr : '(final)'),$P->{tr}{$key}]; }
      else { push @e, [$tr,$P->{tr}{$key}]; }
    } else {
      if ($rt eq 'A') { push @e, [$tr,$P->{tr}{$key}]; }
      else { push @c, ['(final)',$P->{tr}{$key}]; }
    }
  }
  my $cmp = sub { $a->[0] cmp $b->[0] };
  @e = sort $cmp @e; @r = sort $cmp @r;
  return $k eq 'D' ? (@r,@c,@e) : (@e,@c,@r);
}

sub coding {
  my ($P)=@_;
  my %rts = map { (split /\|/)[0] => 1 } keys %{$P->{tr}};
  return 'vector' if $rts{T} && !grep { /[1-6]/ } keys %rts;
  return (grep { /[456]/ } keys %rts) ? 'RNAV' : 'conventional';
}

sub fixlist {
  my ($apt,$fixes)=@_;
  my (%seen,@out);
  for my $g (@$fixes) {
    next if $seen{$g->{fix}}++;
    my $p = Cifp::resolve($M,$apt,$g);
    next unless $p;
    push @out, sprintf("- **%s** %s -- `%s`", $g->{fix}, fmt_dm($p), fmt_dd($p));
  }
  return @out;
}

sub none_text {
  my ($apt,$what)=@_;
  if ($F->{style} eq 'grouped') { return "None coded in CIFP $cycle.\n"; }
  return '';
}

sub section_procs {
  my ($apt,$kind,$title)=@_;
  my $A = $M->{apt}{$apt};
  my $Ps = $A->{proc}{$kind};
  my $out = "### $title\n\n";
  my @ids = sort keys %$Ps;
  if (!@ids) {
    if ($F->{style} eq 'grouped') { return $out . "None coded in CIFP $cycle.\n\n"; }
    if ($kind eq 'E') { return $out . "**None coded.** CIFP does not code a STAR for $apt \x{2014} the chart is the only source.\n\n"; }
    if ($kind eq 'D') { return $out . "**None coded, and that is a gap at this field rather than a limit of the dataset.**\nCIFP does carry radar-vectored departures \x{2014} ARINC 424 route type `T`, Vector SID \x{2014} and\nuses it at Salt Lake City (SLC4) and Boise (BOI3). It simply codes no SID of any type\nhere. So this is a coding gap and not an absence of departures; the chart is the only\nsource. Corrected 2026-09-07, see root `claude_CIFP_Source_Reference.md` \x{a7}3.1.\n\n"; }
  }
  my @allfix;
  for my $id (@ids) {
    my $P = $Ps->{$id};
    $out .= "**$id**\n\n" if $F->{style} eq 'grouped';
    for my $g (groups($P)) {
      my ($t,$fx) = ladder($g->[1],1);
      $out .= "- **$g->[0]:** $t\n";
      push @allfix, @$fx;
    }
    $out .= "\n" if $F->{style} eq 'grouped';
  }
  $out .= "\n" if $F->{style} ne 'grouped';
  my @fl = fixlist($apt,\@allfix);
  $out .= "\n" if $F->{style} eq 'grouped' && @fl;
  $out .= "### Fix coordinates\n\n" . join("\n",@fl) . "\n\n" if @fl;
  return $out;
}

sub section_appr {
  my ($apt)=@_;
  my $A = $M->{apt}{$apt};
  my $Ps = $A->{proc}{F};
  my $out = "### Approaches\n\n";
  my @ids = sort keys %$Ps;
  if (!@ids) { return $F->{style} eq 'grouped' ? $out . "None coded in CIFP $cycle.\n\n" : $out . "\n"; }
  my (@allfix,@entry,%es);
  $out .= "\n" if $F->{style} ne 'grouped';
  for my $id (@ids) {
    my $P = $Ps->{$id};
    $out .= "**$id** \x{2014} ".appr_name($id)."\n\n";
    for my $g (groups($P)) {
      my ($t,$fx) = ladder($g->[1],0);
      $out .= "- **$g->[0]:** $t\n";
      push @allfix, @$fx;
      if ($g->[0] ne '(final)' && !$es{$g->[0]}++) { push @entry, $g->[0]; }
    }
    $out .= "\n";
  }
  $out .= "### Entry fixes \x{2014} every published way in\n\nThe approach transitions, which is where traffic is fed from:\n\n"
        . join(', ', map {"`$_`"} @entry) . "\n\n";
  my @fl = fixlist($apt,\@allfix);
  $out .= "### Fix coordinates\n\n" . join("\n",@fl) . "\n\n" if @fl;
  return $out;
}

sub fmt_brg { my $b=shift; return $b if $b eq ''; my $t = ($b =~ s/T$//) ? ' true' : ''; return sprintf("%05.1f\x{b0}%s", $b/10, $t); }
sub fmt_mv {
  my $m=shift; return 'none recorded' if $m eq '';
  my ($h,$v)=($m =~ /^([EWT])(\d+)$/); return $m unless defined $h;
  return sprintf("%.1f\x{b0} %s", $v/10, $h);
}
sub commas { my $n=shift; 1 while $n =~ s/^(\d+)(\d{3})/$1,$2/; return $n; }
sub section_runways {
  my ($apt)=@_;
  my $A = $M->{apt}{$apt};
  my $o = "### Runways\n\n";
  my @ids = sort rwsort keys %{$A->{rwy}};
  $o .= "Field elevation ".commas($A->{elev})." ft; magnetic variation ".fmt_mv($A->{magvar}).". Bearings are magnetic. From the CIFP $cycle runway (`G`) and localizer (`I`) records.\n\n";
  $o .= "| runway | length (ft) | width (ft) | magnetic bearing | threshold | displaced threshold (ft) | threshold crossing height (ft) | localizer |\n|---|---|---|---|---|---|---|---|\n";
  for my $id (@ids) {
    my $r = $A->{rwy}{$id};
    my $loc = "\x{2014}";
    if ($r->{locid} ne '') {
      my ($li) = grep { $_->{id} eq $r->{locid} } values %{$A->{loc}};
      my $f = $li ? sprintf("%.2f", $li->{freq}/100) : "?";
      my $cat = $li ? $li->{cat} : $r->{cat};
      my $crs = $li ? fmt_brg($li->{course}) : "";
      $loc = "**$r->{locid}** $f MHz, course $crs, category code `$cat`";
      $loc .= " (the runway record says `$r->{cat}`)" if $li && $li->{cat} ne $r->{cat};
    }
    my $thr = $r->{lat} ? fmt_dm($r->{lat})." -- `".fmt_dd($r->{lat})."`" : "\x{2014}";
    $o .= sprintf("| %s | %s | %d | %s | %s | %s | %d | %s |\n", $id, commas($r->{len}), $r->{width}, fmt_brg($r->{brg}), $thr, commas($r->{disp}), $r->{tch}, $loc);
  }
  return $o."\n";
}
sub airport_header {
  my ($apt)=@_;
  my $A = $M->{apt}{$apt};
  if ($F->{style} eq 'grouped') {
    my $rw = join(', ', map { (my $x=$_) =~ s/^RW//; $x } sort rwsort keys %{$A->{rwy}});
    return "## $apt \x{2014} $A->{name}\n\nRunways in CIFP: $rw\n\n";
  }
  return "## $apt\n\n";
}
sub rwsort { my ($x,$y)=($a,$b); $x=~s/^RW//; $y=~s/^RW//; my ($xn,$xl)=($x=~/^(\d+)(.*)$/); my ($yn,$yl)=($y=~/^(\d+)(.*)$/); return $xn <=> $yn || $xl cmp $yl; }

my $out = '';
if (!defined $only || $only eq 'airports') {
  for my $apt (@{$F->{apts}}) {
    $out .= airport_header($apt);
    my $A = $M->{apt}{$apt};
    if (!$A) { $out .= "**Not in CIFP $cycle at all** \x{2014} no airport, runway, SID, STAR or approach record. That means CIFP does not carry the field, **not** that it has none. The chart is the only source.\n\n"; next; }
    $out .= section_runways($apt);
    my $n = scalar(keys %{$A->{proc}{D}}) + scalar(keys %{$A->{proc}{E}}) + scalar(keys %{$A->{proc}{F}});
    if ($n == 0 && $F->{style} eq 'flat') {
      $out .= "**Nothing coded at all.** CIFP $cycle carries no SID, STAR or approach for $apt.\nThat means CIFP does not code them, **not** that the field has none. The chart is the\nonly source.\n\n";
      next;
    }
    $out .= section_procs($apt,'E','STARs');
    $out .= section_procs($apt,'D','SIDs');
    $out .= section_appr($apt);
  }
}
if (defined $only && $only eq 'idtable') {
  for my $apt (@{$F->{idorder}}) {
    my $A = $M->{apt}{$apt};
    $out .= "### $apt\n\n";
    for my $pair (['D','SIDs'],['E','STARs']) {
      my ($k,$lab)=@$pair; my $Ps=$A->{proc}{$k};
      next unless %$Ps;
      $out .= "**$lab**\n\n| identifier | coding | entry / exit transitions | runway transitions |\n|---|---|---|---|\n";
      for my $id (sort keys %$Ps) {
        my $P=$Ps->{$id}; my (@e,@r);
        for my $g (groups($P)) { next if $g->[0] eq '(final)'; if ($g->[0] =~ /^RW\d|^ALL$/) { push @r,$g->[0] } else { push @e,$g->[0] } }
        $out .= "| **$id** | ".coding($P)." | ".(@e?join(' ',@e):"\x{2014}")." | ".(@r?join(' ',@r):"\x{2014}")." |\n";
      }
      $out .= "\n";
    }
  }
}

# ---- deck data: PFIX / STARS / SIDS in the shape the procedures block carries ----
sub jsalt { my $v=shift; return undef unless defined $v && $v ne ''; if ($v =~ /^FL(\d+)$/) { return $1*100; } return $v+0; }
sub jsleg {
  my ($g)=@_;
  my @k;
  my $isvec = $NONFIX{$g->{pt}} ? 1 : 0;
  push @k, "from:'$g->{fix}'" if $isvec && $g->{fix} ne '';
  push @k, "f:'$g->{fix}'" if !$isvec;
  my $a1=jsalt($g->{a1}); my $a2=jsalt($g->{a2}); my $ad=$g->{ad};
  if ($ad eq 'B' && defined $a1 && defined $a2) { push @k, "lo:$a2", "hi:$a1"; }
  elsif (defined $a1) { push @k, ($ad eq '+' ? "above:$a1" : $ad eq '-' ? "below:$a1" : "at:$a1"); }
  push @k, "spd:".($g->{spd}+0) if $g->{spd} ne '';
  push @k, ($isvec ? "vec:'$g->{pt}'" : "t:'$g->{pt}'");
  return '{'.join(',',@k).'}';
}
sub jslegs { my ($legs)=@_; return '['.join(',', map { jsleg($_) } grep { !( !$NONFIX{$_->{pt}} && $_->{fix} eq '') } @$legs).']'; }

sub deck_proc_block {
  my ($var,$kind)=@_;
  my $o = "var $var = {\n";
  my %fixes;
  for my $apt (sort @{$F->{apts}}) {
    my $Ps = $M->{apt}{$apt}{proc}{$kind};
    next unless %$Ps;
    $o .= " $apt:{\n";
    for my $id (sort keys %$Ps) {
      my $P=$Ps->{$id};
      my (%e,%c,%r);
      for my $key (keys %{$P->{tr}}) {
        my ($rt,$tr)=split /\|/,$key,2;
        my $legs=$P->{tr}{$key};
        for my $g (@$legs) { $fixes{$g->{fix}} = [$apt,$g] if $g->{fix} ne '' && !$fixes{$g->{fix}}; }
        if ($kind eq 'E') { if ($rt =~ /[147]/) { $e{$tr}=$legs } elsif ($rt =~ /[258]/) { $c{$tr}=$legs } else { $r{$tr}=$legs } }
        else { if ($rt =~ /[14T]/) { $r{$tr}=$legs } elsif ($rt =~ /[25]/) { $c{$tr}=$legs } else { $e{$tr}=$legs } }
      }
      my $rnav = coding($P) eq 'RNAV' ? 'true' : 'false';
      $o .= "  $id:{rnav:$rnav," . (coding($P) eq 'vector' ? 'vector:true,' : '') . "\n";
      my $trans = sub { my ($h)=@_; return '{'.join(',', map { "'$_':".jslegs($h->{$_}) } sort keys %$h).'}'; };
      my %sec = ( trans => (%e ? "   trans:".$trans->(\%e).",\n" : ''),
                  rwy   => (%r ? "   rwy:".$trans->(\%r).",\n" : ''),
                  common=> '' );
      if (%c) { my ($k)=(sort keys %c); $sec{common} = "   common:".jslegs($c{$k}).",\n"; }
      $o .= $kind eq 'E' ? $sec{trans}.$sec{common}.$sec{rwy} : $sec{rwy}.$sec{common}.$sec{trans};
      $o .= "  },\n";
    }
    $o .= " },\n";
  }
  $o .= "};\n";
  return ($o,\%fixes);
}
if (defined $only && $only eq 'deck') {
  my ($so,$sf) = deck_proc_block('STARS','E');
  my ($do,$df) = deck_proc_block('SIDS','D');
  my %all = (%$sf,%$df);
  my @items;
  for my $f (sort keys %all) {
    my ($apt,$g)=@{$all{$f}};
    my $p = Cifp::resolve($M,$apt,$g);
    next unless $p;
    push @items, sprintf("%s:[%.5f,%.5f]", $f, $p->{lat}, $p->{lon});
  }
  my $pf = "var PFIX = {\n";
  for (my $i=0; $i<@items; $i+=4) { my @ch=@items[$i..($i+3 > $#items ? $#items : $i+3)]; $pf .= "  ".join(', ',@ch).($i+4 <= $#items ? ",\n" : "\n"); }
  $pf .= "};\n";
  $out = $pf."\n".$so.$do;
}
print $out;
