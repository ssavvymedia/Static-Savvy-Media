# Regenerates public/favicon.ico, public/favicon.png and public/favicon.svg
# from the real SSM logo at src/assets/images/logo/favi.png.
#
# Run once from the project root:
#   powershell -ExecutionPolicy Bypass -File apply-favicon-from-logo.ps1
#
# Then fully stop and restart `npm run dev`, and hard-refresh / open an
# Incognito window (favicons are cached very aggressively by the browser).

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

$sourcePath = Join-Path $PSScriptRoot 'src\assets\images\logo\favi.png'
$icoPath    = Join-Path $PSScriptRoot 'public\favicon.ico'
$pngPath    = Join-Path $PSScriptRoot 'public\favicon.png'
$svgPath    = Join-Path $PSScriptRoot 'public\favicon.svg'

if (-not (Test-Path $sourcePath)) {
    Write-Error "Source logo not found at $sourcePath"
    exit 1
}

$original = [System.Drawing.Image]::FromFile($sourcePath)

function New-ResizedPngBytes {
    param([System.Drawing.Image]$Source, [int]$Size)

    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $bmp.SetResolution($Source.HorizontalResolution, $Source.VerticalResolution)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'AntiAlias'
    $g.InterpolationMode = 'HighQualityBicubic'
    $g.PixelOffsetMode = 'HighQuality'
    $g.CompositingQuality = 'HighQuality'
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($Source, 0, 0, $Size, $Size)
    $g.Dispose()

    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    return $ms.ToArray()
}

# ---- 1. Build a proper multi-resolution favicon.ico (PNG-in-ICO, supported
#         since Windows Vista and by every modern browser) ----
$sizes = @(16, 32, 48, 64, 128, 256)
$images = $sizes | ForEach-Object { New-ResizedPngBytes -Source $original -Size $_ }

$icoStream = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter $icoStream

# ICONDIR header
$bw.Write([UInt16]0)              # reserved
$bw.Write([UInt16]1)              # type = icon
$bw.Write([UInt16]$sizes.Count)   # image count

$headerSize = 6 + (16 * $sizes.Count)
$offset = $headerSize

for ($i = 0; $i -lt $sizes.Count; $i++) {
    $size = $sizes[$i]
    $bytes = $images[$i]
    $dim = if ($size -ge 256) { 0 } else { $size }  # 0 means 256 in ICO format
    $bw.Write([Byte]$dim)          # width
    $bw.Write([Byte]$dim)          # height
    $bw.Write([Byte]0)             # color count (0 = no palette)
    $bw.Write([Byte]0)             # reserved
    $bw.Write([UInt16]1)           # color planes
    $bw.Write([UInt16]32)          # bits per pixel
    $bw.Write([UInt32]$bytes.Length)
    $bw.Write([UInt32]$offset)
    $offset += $bytes.Length
}

foreach ($bytes in $images) {
    $bw.Write($bytes)
}

$bw.Flush()
[IO.File]::WriteAllBytes($icoPath, $icoStream.ToArray())
$bw.Dispose()
$icoStream.Dispose()
Write-Host "Wrote public/favicon.ico ($($sizes -join ', ') px)"

# ---- 2. favicon.png: a clean 512x512 copy for general use ----
$pngBytes = New-ResizedPngBytes -Source $original -Size 512
[IO.File]::WriteAllBytes($pngPath, $pngBytes)
Write-Host "Wrote public/favicon.png (512x512)"

# ---- 3. favicon.svg: SVG wrapper embedding the logo as a base64 PNG, so the
#         <link type="image/svg+xml"> tag also resolves to the real logo ----
$svgPngBytes = New-ResizedPngBytes -Source $original -Size 256
$base64 = [Convert]::ToBase64String($svgPngBytes)
$svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <image href="data:image/png;base64,$base64" width="256" height="256" />
</svg>
"@
[IO.File]::WriteAllText($svgPath, $svgContent)
Write-Host "Wrote public/favicon.svg (wraps the same logo)"

$original.Dispose()

Write-Host ""
Write-Host "Done. Now:"
Write-Host "  1. Fully stop and restart 'npm run dev' (Vite caches public/ on start)."
Write-Host "  2. Hard-refresh the browser tab, or open an Incognito window."
