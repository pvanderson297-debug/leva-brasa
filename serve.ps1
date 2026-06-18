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
    @{ users = @(); drivers = @(); trips = @() } | ConvertTo-Json -Depth 12 | Set-Content -Path $DbFile -Encoding UTF8
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

function Send-Text($Response, [int]$Status, [string]$Text, [string]$ContentType) {
  $Bytes = [Text.Encoding]::UTF8.GetBytes($Text)
  $Response.StatusCode = $Status
  $Response.ContentType = $ContentType
  $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
  $Response.Close()
}

function Send-Json($Response, [int]$Status, $Payload) {
  Send-Text $Response $Status ($Payload | ConvertTo-Json -Depth 20) "application/json; charset=utf-8"
}

function Get-BodyJson($Request) {
  $Reader = New-Object IO.StreamReader($Request.InputStream, $Request.ContentEncoding)
  $Body = $Reader.ReadToEnd()
  $Reader.Close()
  if ([string]::IsNullOrWhiteSpace($Body)) { return @{} }
  return $Body | ConvertFrom-Json
}

function Get-ContentType([string]$Path) {
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

Ensure-Db
$Listener = [Net.HttpListener]::new()
$Listener.Prefixes.Add("http://localhost:$Port/")
$Listener.Prefixes.Add("http://127.0.0.1:$Port/")
$Listener.Start()

Write-Host "Leva Brasa rodando em http://localhost:$Port"
Write-Host "Deixe esta janela aberta enquanto usa o app."

while ($Listener.IsListening) {
  $Context = $Listener.GetContext()
  $Request = $Context.Request
  $Response = $Context.Response
  $CleanUrl = [Uri]::UnescapeDataString($Request.Url.AbsolutePath)

  try {
    if ($Request.HttpMethod -eq "GET" -and $CleanUrl -eq "/api/state") {
      Send-Json $Response 200 (Read-Db)
      continue
    }

    if ($Request.HttpMethod -eq "POST" -and $CleanUrl -match "^/api/(users|drivers|trips)$") {
      $Collection = $Matches[1]
      $Body = Get-BodyJson $Request
      $Db = Read-Db
      $Db | Add-Member -NotePropertyName $Collection -NotePropertyValue @($Body.items) -Force
      Write-Db $Db
      Send-Json $Response 200 @{ ok = $true }
      continue
    }

    if ($CleanUrl.StartsWith("/api/")) {
      Send-Json $Response 404 @{ error = "API route not found" }
      continue
    }

    $Relative = if ($CleanUrl -eq "/") { "index.html" } else { $CleanUrl.TrimStart("/") }
    $File = Join-Path $Root $Relative
    $ResolvedRoot = (Resolve-Path $Root).Path

    if ((Test-Path $File) -and (Resolve-Path $File).Path.StartsWith($ResolvedRoot)) {
      $Bytes = [IO.File]::ReadAllBytes((Resolve-Path $File).Path)
      $Response.StatusCode = 200
      $Response.ContentType = Get-ContentType $File
      $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
      $Response.Close()
    } else {
      Send-Text $Response 404 "Not found" "text/plain; charset=utf-8"
    }
  } catch {
    Send-Json $Response 500 @{ error = "Server error" }
  }
}
