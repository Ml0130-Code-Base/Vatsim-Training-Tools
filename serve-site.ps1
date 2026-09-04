# =============================================================================
# serve-site.ps1 - preview the staged site over local HTTP
#
#   sh build-site.sh
#   powershell -ExecutionPolicy Bypass -File serve-site.ps1
#
# There is no node and no working python on this machine, and the editor's
# preview pane renders file:// as a static snapshot - a page opened that way
# cannot be driven or clicked through. A System.Net.HttpListener is what has
# actually worked here before, so it is what this uses.
#
# Serving over http:// is also the only way to see what the published site will
# really do: the landing page routes to /m98/ style paths under http and falls
# back to the repository paths under file://, and only one of those is what a
# visitor gets.
#
# Ctrl+C to stop.
# =============================================================================

param(
  [int]$Port = 8080,
  [string]$Root = "_site"
)

$ErrorActionPreference = "Stop"

$rootPath = Join-Path (Get-Location) $Root
if (-not (Test-Path $rootPath)) {
  Write-Host "No $Root/ directory. Run 'sh build-site.sh' first." -ForegroundColor Red
  exit 1
}
$rootPath = (Resolve-Path $rootPath).Path

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Host ""
Write-Host "  Serving $Root/ at http://localhost:$Port/" -ForegroundColor Green
Write-Host "  Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

$types = @{
  ".html" = "text/html; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".svg"  = "image/svg+xml"
}

try {
  while ($listener.IsListening) {
    $context  = $listener.GetContext()
    $request  = $context.Request
    $response = $context.Response

    $rel = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath).TrimStart('/')
    if ($rel -eq "") { $rel = "index.html" }

    $file = Join-Path $rootPath $rel

    # A directory request is the published shape: /m98/ serves /m98/index.html.
    if ((Test-Path $file) -and ((Get-Item $file) -is [System.IO.DirectoryInfo])) {
      $file = Join-Path $file "index.html"
    }

    # Never serve anything outside the staged root.
    $inRoot = $false
    try {
      $full = [System.IO.Path]::GetFullPath($file)
      $inRoot = $full.StartsWith($rootPath, [StringComparison]::OrdinalIgnoreCase)
    } catch { $inRoot = $false }

    if ($inRoot -and (Test-Path $file -PathType Leaf)) {
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $ext   = [System.IO.Path]::GetExtension($file).ToLower()
      $response.ContentType = $(if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" })
      $response.StatusCode  = 200
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
      Write-Host ("  200  /{0}" -f $rel) -ForegroundColor DarkGray
    } else {
      $body = [System.Text.Encoding]::UTF8.GetBytes("404 - not staged: /$rel")
      $response.StatusCode  = 404
      $response.ContentType = "text/plain; charset=utf-8"
      $response.ContentLength64 = $body.Length
      $response.OutputStream.Write($body, 0, $body.Length)
      Write-Host ("  404  /{0}" -f $rel) -ForegroundColor Yellow
    }

    $response.OutputStream.Close()
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
