# =============================================================================
# publish-site.ps1 - push the staged tools to the public site repository
#
#   powershell -ExecutionPolicy Bypass -File publish-site.ps1
#
# THE SPLIT, AND WHY IT EXISTS
#
# This repository is private and stays private: it holds the facility PDFs, the
# transcribed reference markdown, the gap analyses and the OJT session notes.
# GitHub Pages cannot serve a private repository on a free account, and a Pages
# site cannot be put behind a login on any account short of Enterprise Cloud.
#
# So the tools live in a second, public repository that contains NOTHING else -
# seven self-contained HTML files and a landing page, about 656 KB. The site is
# unlisted (noindex, robots.txt, nothing links to it) rather than secret, which
# is fine precisely because nothing personal is ever staged into it. Your notes
# live in this repository and in your browser's local storage, never there.
#
# build-site.sh fails the build if anything but the tools reaches _site/, so
# that boundary is enforced rather than remembered.
#
# ONE-TIME SETUP
#   1. Create an EMPTY public repository named  vatsim-training-tools-site
#      (no README, no .gitignore, no licence - this script writes the tree).
#   2. Run this script.
#   3. In the new repository: Settings > Pages > Source: Deploy from a branch,
#      Branch: main, folder: / (root). One setting, no Actions workflow.
#
# AFTER THAT, publishing a change is: run this script.
# =============================================================================

param(
  [string]$Repo   = "Ml0130-Code-Base/vatsim-training-tools-site",
  [string]$Work   = ".site-publish",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Fail($msg) { Write-Host $msg -ForegroundColor Red; exit 1 }

if (-not (Test-Path "site/index.html")) { Fail "Run me from the repository root." }

# --- 1. stage -----------------------------------------------------------------
Write-Host "`nStaging the site..." -ForegroundColor Cyan
& sh build-site.sh
if ($LASTEXITCODE -ne 0) { Fail "build-site.sh failed - nothing published." }

$remote = "https://github.com/$Repo.git"

# --- 2. working clone of the public repository --------------------------------
if (-not (Test-Path $Work)) {
  Write-Host "`nCloning $Repo ..." -ForegroundColor Cyan
  git clone $remote $Work 2>&1 | Write-Host
  if (-not (Test-Path $Work)) {
    Fail "Could not clone $remote. Create the empty public repository first - see the header of this file."
  }
} else {
  Write-Host "`nUpdating the working clone..." -ForegroundColor Cyan
  git -C $Work fetch origin 2>&1 | Write-Host
  git -C $Work reset --hard origin/main 2>&1 | Out-Null
}

# --- 3. mirror _site/ into it -------------------------------------------------
# Delete first, so a tool removed from the manifest actually leaves the site
# instead of lingering at its old URL forever.
Get-ChildItem -Path $Work -Force |
  Where-Object { $_.Name -ne ".git" } |
  Remove-Item -Recurse -Force

Copy-Item -Path "_site/*" -Destination $Work -Recurse -Force

# .nojekyll and robots.txt are dotfile-adjacent; make sure they came across.
foreach ($f in @(".nojekyll", "robots.txt")) {
  $src = Join-Path "_site" $f
  if ((Test-Path $src) -and -not (Test-Path (Join-Path $Work $f))) {
    Copy-Item $src (Join-Path $Work $f) -Force
  }
}

# --- 4. guard: the public repository holds the tools and nothing else ---------
$strays = Get-ChildItem -Path $Work -Recurse -File -Force |
  Where-Object { $_.FullName -notmatch '\\\.git\\' } |
  Where-Object { $_.Name -notin @("index.html", ".nojekyll", "robots.txt") }

if ($strays) {
  Write-Host "`nRefusing to publish - unexpected files in the tree:" -ForegroundColor Red
  $strays | ForEach-Object { Write-Host "  $($_.FullName)" -ForegroundColor Red }
  exit 1
}

# --- 5. commit and push -------------------------------------------------------
$sha  = (git rev-parse --short HEAD).Trim()
$when = Get-Date -Format "yyyy-MM-dd"

Push-Location $Work
try {
  git add -A | Out-Null

  $pending = git status --porcelain
  if (-not $pending) {
    Write-Host "`nNothing changed since the last publish." -ForegroundColor DarkGray
    return
  }

  Write-Host "`nChanges to publish:" -ForegroundColor Cyan
  git status --short | Write-Host

  if ($DryRun) {
    Write-Host "`n-DryRun: staged but not pushed." -ForegroundColor Yellow
    return
  }

  git commit -q -m "Publish tools from Vatsim-Training-Tools@$sha ($when)"

  # An empty new repository has no main branch yet.
  git branch -M main
  git push -u origin main 2>&1 | Write-Host

  $owner = $Repo.Split('/')[0].ToLower()
  $name  = $Repo.Split('/')[1]
  Write-Host "`n  Published: https://$owner.github.io/$name/" -ForegroundColor Green
  Write-Host "  Pages can take a minute on the first deploy." -ForegroundColor DarkGray
}
finally {
  Pop-Location
}
