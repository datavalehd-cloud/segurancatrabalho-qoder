Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$src = Join-Path $root 'vibe_images\*.png'
$dst = Join-Path $root 'web\assets\scenes'
New-Item -ItemType Directory -Force -Path $dst | Out-Null
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)
Get-ChildItem $src | ForEach-Object {
  $id = ($_.Name -split '_')[0]
  $img = [System.Drawing.Image]::FromFile($_.FullName)
  $w = 1200
  $h = [int]($img.Height * $w / $img.Width)
  $bmp = New-Object System.Drawing.Bitmap($w, $h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $w, $h)
  $img.Dispose()
  $g.Dispose()
  $bmp.Save((Join-Path $dst "$id.jpg"), $enc, $ep)
  $bmp.Dispose()
  Write-Output "$id.jpg"
}
