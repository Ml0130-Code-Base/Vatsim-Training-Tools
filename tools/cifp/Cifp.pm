package Cifp;
# Fixed-column ARINC 424 decoder for the FAA CIFP file (FAACIFP18), limited to a set of airports.
# Columns are 1-based as in the spec; c() wraps substr. Offsets are the ones recorded in
# claude_CIFP_Source_Reference.md and the memory notes, and each was checked against records.
use strict; use warnings;
use Exporter 'import';
our @EXPORT_OK = qw(load_cifp fmt_dm fmt_dd);

sub c { my ($l,$a,$b)=@_; $b//=$a; my $s = substr($l,$a-1,$b-$a+1); $s = '' unless defined $s; $s =~ s/\s+$//; $s =~ s/^\s+//; return $s; }

sub latlon_dec {
  my ($lat,$lon)=@_;
  my ($ns,$d,$m,$s)=($lat=~/^([NS])(\d\d)(\d\d)(\d{4})$/) ? ($1,$2,$3,$4/100) : return;
  my ($ew,$D,$M,$S)=($lon=~/^([EW])(\d{3})(\d\d)(\d{4})$/) ? ($1,$2,$3,$4/100) : return;
  my $ala = $d + $m/60 + $s/3600; my $alo = $D + $M/60 + $S/3600;
  my $la = $ns eq "S" ? -$ala : $ala; my $lo = $ew eq "W" ? -$alo : $alo;
  # minutes are taken back out of the decimal degrees, which is how the earlier files rounded them
  return { lat=>$la, lon=>$lo,
           latdm=>[$ns,$d,($ala-int($ala))*60], londm=>[$ew,$D+0,($alo-int($alo))*60] };
}

sub fmt_dm {
  my ($p)=@_;
  return sprintf("%s%d %05.2f / %s%d %05.2f", $p->{latdm}[0],$p->{latdm}[1],$p->{latdm}[2],
                                              $p->{londm}[0],$p->{londm}[1],$p->{londm}[2]);
}
sub fmt_dd { my ($p)=@_; return sprintf("%.5f, %.5f", $p->{lat}, $p->{lon}); }

# load_cifp($path, \@airports) -> model
sub load_cifp {
  my ($path,$aref)=@_;
  my %want = map { $_=>1 } @$aref;
  my %M = (apt=>{}, enr=>{}, nav=>{}, ndb=>{});
  open my $F, '<', $path or die "$path: $!";
  binmode $F;
  while (my $l = <$F>) {
    $l =~ s/[\r\n]+$//;
    next unless substr($l,0,1) eq 'S';
    my $sec = substr($l,4,1);
    if ($sec eq 'P') {
      my $a = substr($l,6,4);
      next unless $want{$a};
      my $sub = substr($l,12,1);
      my $ap = ($M{apt}{$a} ||= { icao=>$a, rwy=>{}, loc=>{}, term=>{}, tndb=>{}, proc=>{D=>{},E=>{},F=>{}}, raw=>[] });
      if ($sub eq 'A') {
        $ap->{iata}=c($l,14,16); $ap->{name}=c($l,94,123); $ap->{elev}=c($l,57,61)+0;
        $ap->{magvar}=c($l,52,56); $ap->{region}=c($l,11,12);
        my ($lat,$lon)=($l=~/([NS]\d{8})([EW]\d{9})/); $ap->{ref}=latlon_dec($lat,$lon) if $lat;
        $ap->{ifr}=c($l,30,30);
      } elsif ($sub eq 'G') {
        my $id=c($l,14,18);
        my ($lat,$lon)=(substr($l,32,9),substr($l,41,10));
        my $p=latlon_dec($lat,$lon);
        $ap->{rwy}{$id}={ id=>$id, len=>c($l,23,27)+0, brg=>c($l,28,31), lat=>$p, elev=>c($l,67,71),
                          disp=>c($l,72,75)+0, tch=>c($l,76,77), width=>c($l,78,80)+0,
                          locid=>c($l,82,85), cat=>c($l,86,86), tchind=>c($l,81,81),
                          surf=>c($l,102,102), dlen=>c($l,32,32) };
      } elsif ($sub eq 'I') {
        my $id=c($l,14,17);
        my ($lat,$lon)=(substr($l,32,9),substr($l,41,10));
        $ap->{loc}{$id.'|'.c($l,28,32)}={ id=>$id, cat=>c($l,18,18), freq=>c($l,23,27), rwy=>c($l,28,32),
                               course=>c($l,52,55), pos=>latlon_dec($lat,$lon) };
      } elsif ($sub eq 'C') {
        my $id=c($l,14,18);
        my ($lat,$lon)=(substr($l,32,9),substr($l,41,10));
        $ap->{term}{$id}=latlon_dec($lat,$lon);
      } elsif ($sub eq 'N') {
        my $id=c($l,14,17);
        my ($lat,$lon)=(substr($l,32,9),substr($l,41,10));
        $ap->{tndb}{$id}=latlon_dec($lat,$lon);
      } elsif ($sub =~ /[DEF]/) {
        my $cont = substr($l,38,1);
        next unless $cont eq '0' || $cont eq '1';        # continuation records (2+) are not legs
        my %leg = (
          seq=>c($l,27,29)+0, fix=>c($l,30,34), freg=>c($l,35,36), fsec=>substr($l,36,2),
          pt=>c($l,48,49), desc=>substr($l,39,4), turn=>substr($l,43,1),
          ad=>substr($l,82,1), a1=>c($l,85,89), a2=>c($l,90,94), spd=>c($l,100,102), spdd=>substr($l,102,1),
          crs=>c($l,71,74), vang=>c($l,103,106), navid=>c($l,51,54),
        );
        $leg{vang}=c($l,103,106);
        my $id = c($l,14,19);
        my $rt = substr($l,19,1);
        my $tr = c($l,21,25);
        my $P = ($ap->{proc}{$sub}{$id} ||= { id=>$id, kind=>$sub, tr=>{} });
        push @{ $P->{tr}{$rt.'|'.$tr} }, \%leg;
      }
    } elsif ($sec eq 'E' && substr($l,5,1) eq 'A') {
      my ($lat,$lon)=($l=~/([NS]\d{8})([EW]\d{9})/);
      next unless $lat;
      $M{enr}{c($l,14,18).'|'.c($l,20,21)} = latlon_dec($lat,$lon);
    } elsif ($sec eq 'D') {
      my $sub = substr($l,5,1);
      my ($lat,$lon)=($l=~/([NS]\d{8})([EW]\d{9})/);
      next unless $lat;
      if ($sub eq ' ') { $M{nav}{c($l,14,17).'|'.c($l,20,21)} = latlon_dec($lat,$lon); }   # first pair = VOR, DME second
      elsif ($sub eq 'B') { $M{ndb}{c($l,14,17).'|'.c($l,20,21)} = latlon_dec($lat,$lon); }
    }
  }
  close $F;
  # order legs by sequence
  for my $ap (values %{$M{apt}}) {
    for my $k (qw(D E F)) {
      for my $P (values %{$ap->{proc}{$k}}) {
        for my $t (keys %{$P->{tr}}) { @{$P->{tr}{$t}} = sort { $a->{seq} <=> $b->{seq} } @{$P->{tr}{$t}}; }
      }
    }
  }
  return \%M;
}

# Resolve a leg's fix to coordinates, by the section the leg names (PD cols 37-38).
sub resolve {
  my ($M,$apt,$leg)=@_;
  return undef if $leg->{fix} eq '';
  my $a = $M->{apt}{$apt};
  my $s = $leg->{fsec};
  if ($s eq 'PC') { return $a->{term}{$leg->{fix}}; }
  if ($s eq 'EA') { return $M->{enr}{$leg->{fix}.'|'.$leg->{freg}}; }
  if ($s eq 'D ' || $s eq 'D') { return $M->{nav}{$leg->{fix}.'|'.$leg->{freg}}; }
  if ($s eq 'DB') { return $M->{ndb}{$leg->{fix}.'|'.$leg->{freg}}; }
  if ($s eq 'PG') { my $r = $a->{rwy}{$leg->{fix}}; return $r ? $r->{lat} : undef; }
  if ($s eq 'PN') { return $a->{tndb}{$leg->{fix}}; }
  if ($s eq 'PA') { return $a->{ref}; }
  return undef;
}
1;
