use strict; use warnings; use FindBin; use lib $FindBin::Bin; use Cifp;
my ($cifp,$man,@apts)=@ARGV;
my $M = Cifp::load_cifp($cifp,\@apts);
my %mf;
open my $F,"<",$man or die; while(<$F>){ chomp; s/\r//; my ($a,$t,$i)=split /\t/; push @{$mf{$a}{$t}}, $i; }
my $bad=0; my $tot=0;
for my $ap (@apts){
  my $A=$M->{apt}{$a} or do { print "$a: no airport record in CIFP\n"; next; };
  for my $pair (['D','SID'],['E','STAR'],['F','SIAP']){
    my ($k,$t)=@$pair;
    my @d = sort keys %{$A->{proc}{$k}}; my @m = sort @{$mf{$a}{$t}||[]};
    $tot += @m;
    # decoded ident is cols 14-19 (6 chars, trimmed); manifest ident is the same string
    if ("@d" ne "@m") { $bad++; print "$a $t MISMATCH\n  decoded : @d\n  manifest: @m\n"; }
  }
  # every runway named in a procedure leg exists in this airport's runway table, and every fix with a section resolves
  my ($unres,%missing);
  for my $k (qw(D E F)) { for my $P (values %{$A->{proc}{$k}}) { for my $tr (keys %{$P->{tr}}) { for my $g (@{$P->{tr}{$tr}}) {
    next if $g->{fix} eq '' ;
    next if $g->{pt} =~ /^(FM)$/;
    my $p = Cifp::resolve($M,$a,$g);
    if (!$p) { $missing{"$P->{id}:$g->{fix}($g->{fsec})"}++; }
  }}}}
  print "$a: unresolved fixes: ", join(' ', sort keys %missing), "\n" if %missing;
  # cross-check runway localizer ident/category against the I records
  for my $r (values %{$A->{rwy}}) { next unless $r->{locid};
    my ($li) = grep { $_->{id} eq $r->{locid} } values %{$A->{loc}};
    if (!$li) { print "$a $r->{id}: G record names loc $r->{locid} but no I record\n"; next; }
    print "$a $r->{id}: category G=$r->{cat} I=$li->{cat}\n" if $r->{cat} ne $li->{cat};
  }
}
print "checked $tot manifest procedures across ".scalar(@apts)." fields; mismatches: $bad\n";
