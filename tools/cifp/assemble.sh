#!/bin/sh
# assemble.sh <FAC> <cycle> [workdir]
#
# Rebuild the generated half of one Tier 0 facility's CIFP reference in place. FAC is
# C90, AZO, S56 or BIGSKY. <workdir> holds the unzipped cycle as <workdir>/c<cycle>/FAACIFP18
# (default: ./cifp-work, which is NOT in the tree). The text above the cut line - the
# preamble, the notation and the hand-written notes - is kept; everything from the cut line
# to the end is regenerated. Read root claude_CIFP_Source_Reference.md section 8 first.
#
#   curl -sL -o CIFP_261029.zip https://aeronav.faa.gov/Upload_313-d/cifp/CIFP_261029.zip
#   mkdir -p cifp-work/c261029 && unzip -oq CIFP_261029.zip -d cifp-work/c261029
#   sh tools/cifp/assemble.sh C90 261029 cifp-work
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
REPO=$(cd "$HERE/../.." && pwd)
FAC=$1; CYC=$2; WORK=${3:-cifp-work}
[ -f "$WORK/c$CYC/FAACIFP18" ] || { echo "missing $WORK/c$CYC/FAACIFP18"; exit 1; }
case $FAC in
  C90)    FILE="$REPO/ZAU/C90/claude_C90_CIFP_Procedures.md";        CUT='^### KARR$'; ID=1 ;;
  BIGSKY) FILE="$REPO/ZLC/Big Sky/claude_BigSky_CIFP_Procedures.md"; CUT='^### KBOI$'; ID=1 ;;
  AZO)    FILE="$REPO/ZAU/AZO/claude_AZO_CIFP_Procedures.md";        CUT='^## KAZO$';  ID=0 ;;
  S56)    FILE="$REPO/ZLC/S56/claude_S56_CIFP_Procedures.md";        CUT='^## KSLC ';  ID=0 ;;
  *) echo "unknown facility $FAC"; exit 1 ;;
esac
OUT="$WORK/out"; mkdir -p "$OUT"
CIFP="$WORK/c$CYC/FAACIFP18"
: > "$OUT/body.md"
if [ "$ID" = 1 ]; then
  perl "$HERE/gen.pl" "$CIFP" "$CYC" "$FAC" idtable >> "$OUT/body.md"
  printf -- '---\n\n' >> "$OUT/body.md"
fi
perl "$HERE/gen.pl" "$CIFP" "$CYC" "$FAC" airports >> "$OUT/body.md"
tr -d '\r' < "$FILE" > "$OUT/existing.md"
LN=$(grep -n -m1 -E "$CUT" "$OUT/existing.md" | cut -d: -f1)
head -n $((LN-1)) "$OUT/existing.md" > "$OUT/new_$FAC.md"
cat "$OUT/body.md" >> "$OUT/new_$FAC.md"
perl -0pi -e 's/\n+\z/\n/' "$OUT/new_$FAC.md"
echo "$FAC: cut at line $LN; candidate is $OUT/new_$FAC.md ($(wc -l < "$OUT/new_$FAC.md") lines). Review it, then copy it over $FILE"
