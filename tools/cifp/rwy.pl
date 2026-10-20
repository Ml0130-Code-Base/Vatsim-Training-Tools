use strict; use warnings; use FindBin; use lib $FindBin::Bin; use Cifp;
my ($file,@apts)=@ARGV;
my $M = Cifp::load_cifp($file,\@apts);
for my $ap (@apts) {
  my $A=$M->{apt}{$ap};
  if(!$A){ print "$ap: NO AIRPORT RECORD\n"; next; }
  printf("%s %s elev %s magvar %s ifr %s ref %s\n",$a,$A->{name},$A->{elev},$A->{magvar},$A->{ifr},$A->{ref}?Cifp::fmt_dd($A->{ref}):'-');
  for my $id (sort { my ($x,$y)=($a,$b); $x=~s/RW//; $y=~s/RW//; ($x=~/(\d+)/)[0] <=> ($y=~/(\d+)/)[0] or $x cmp $y } keys %{$A->{rwy}}) {
    my $r=$A->{rwy}{$id};
    printf("   %-6s len %5d brg %-5s w %3d disp %4d tch %s elev %-6s loc %-5s cat %s  thr %s\n",$id,$r->{len},$r->{brg},$r->{width},$r->{disp},$r->{tch},$r->{elev},$r->{locid},$r->{cat},$r->{lat}?Cifp::fmt_dd($r->{lat}):'-');
  }
}
