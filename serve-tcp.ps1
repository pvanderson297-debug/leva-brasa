$ErrorActionPreference = "Stop"

$Port = 3000
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$DataDir = Join-Path $Root "data"
$DbFile = Join-Path $DataDir "db.json"

function Ensure-Db {
  if (-not (Test-Path $DataDir)) {
    New-Item -ItemType Directory -Path $DataDir | Out-Null
  }

  if (-not (Test-Path $DbFile)) {
    @{ users = @(); drivers = @(); trips = @() } | ConvertTo-Json -Depth 20 | Set-Content -Path $DbFile -Encoding UTF8
  }
}

function Read-Db {
  Ensure-Db
  try {
    return Get-Content -Raw -Path $DbFile | ConvertFrom-Json
  } catch {
    return @{ users = @(); drivers = @(); trips = @() }
  }
}

function Write-Db($Db) {
  Ensure-Db
  $Db | ConvertTo-Json -Depth 20 | Set-Content -Path $DbFile -Encoding UTF8
}

function Content-Type([string]$Path) {
  switch ([IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "application/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".webmanifest" { "application/manifest+json; charset=utf-8" }
    ".svg" { "image/svg+xml" }
    default { "application/octet-stream" }
  }
}

function Send-Response($Stream, [int]$Status, [string]$ContentType, [byte[]]$Body) {
  $Reason = if ($Status -eq 200) { "OK" } elseif ($Status -eq 404) { "Not Found" } else { "Error" }
  $Header = "HTTP/1.1 $Status $Reason`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
  $HeaderBytes = [Text.Encoding]::UTF8.GetBytes($Header)
  $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
}

function Send-Json($Stream, [int]$Status, $Payload) {
  $Body = [Text.Encoding]::UTF8.GetBytes(($Payload | ConvertTo-Json -Depth 20))
  Send-Response $Stream $Status "application/json; charset=utf-8" $Body
}

function Read-Request($Stream) {
  $Buffer = New-Object byte[] 1048576
  $Count = $Stream.Read($Buffer, 0, $Buffer.Length)
  if ($Count -le 0) { return $null }
  $Text = [Text.Encoding]::UTF8.GetString($Buffer, 0, $Count)
  $Parts = $Text -split "`r`n`r`n", 2
  $Header = $Parts[0]
  $Body = if ($Parts.Length -gt 1) { $Parts[1] } else { "" }
  $First = ($Header -split "`r`n")[0] -split " "
  return @{ method = $First[0]; path = $First[1]; body = $Body }
}

Ensure-Db
$Listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Parse("127.0.0.1"), $Port)
$Listener.Start()

Write-Host ""
Write-Host "Leva Brasa rodando em http://127.0.0.1:$Port"
Write-Host "Deixe esta janela aberta. Para parar, feche esta janela."
Write-Host ""

while ($true) {
  $Client = $Listener.AcceptTcpClient()
  try {
    $Stream = $Client.GetStream()
    $Request = Read-Request $Stream
    if ($null -eq $Request) { continue }

    $CleanPath = [Uri]::UnescapeDataString(($Request.path -split "\?")[0])

    if ($Request.method -eq "GET" -and $CleanPath -eq "/api/state") {
      Send-Json $Stream 200 (Read-Db)
      continue
    }

    if ($Request.method -eq "POST" -and $CleanPath -match "^/api/(users|drivers|trips)$") {
      $Collection = $Matches[1]
      $Db = Read-Db
      $Payload = if ([string]::IsNullOrWhiteSpace($Request.body)) { @{} } else { $Request.body | ConvertFrom-Json }
      $Db | Add-Member -NotePropertyName $Collection -NotePropertyValue @($Payload.items) -Force
      Write-Db $Db
      Send-Json $Stream 200 @{ ok = $true }
      continue
    }

    $Relative = if ($CleanPath -eq "/") { "index.html" } else { $CleanPath.TrimStart("/") }
    $File = Join-Path $Root $Relative
    $ResolvedRoot = (Resolve-Path $Root).Path

    if ((Test-Path $File) -and (Resolve-Path $File).Path.StartsWith($ResolvedRoot)) {
      $Bytes = [IO.File]::ReadAllBytes((Resolve-Path $File).Path)
      Send-Response $Stream 200 (Content-Type $File) $Bytes
    } else {
      Send-Response $Stream 404 "text/plain; charset=utf-8" ([Text.Encoding]::UTF8.GetBytes("Not found"))
    }
  } catch {
    try {
      Send-Json $Stream 500 @{ error = "Server error" }
    } catch {}
  } finally {
    $Client.Close()
  }
}
