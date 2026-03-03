param(
    [Parameter(Mandatory = $true)]
    [string]$PodcastFolder
)

# Ensure the paths are correct
$SlidesDir = Join-Path $PodcastFolder "slides"

if (!(Test-Path $SlidesDir)) {
    Write-Host "Error: Slides directory not found at $SlidesDir" -ForegroundColor Red
    exit 1
}

Write-Host "Processing images in $SlidesDir for 16:9 aspect ratio..." -ForegroundColor Cyan

# Find all png slides
$slides = Get-ChildItem -Path $SlidesDir -Filter "slide_*.png"

if ($slides.Count -eq 0) {
    Write-Host "No slide_*.png files found in $SlidesDir." -ForegroundColor Yellow
    exit 0
}

foreach ($slide in $slides) {
    $inFile = $slide.FullName
    $tmpFile = Join-Path $slide.DirectoryName ($slide.BaseName + "_tmp" + $slide.Extension)

    Write-Host "Cropping: $($slide.Name)"
    
    # Use ImageMagick to zoom into the image slightly to ensure we fill 1920x1080
    # A 1080x1080 image needs to be scaled up to 1920 to fill the width.
    # The command scales the width to 1920, maintaining the aspect ratio, and then crops the center 1080 height.
    # We use ^ to ensure it fills the dimensions, then extent to crop to the center.
    & magick.exe "$inFile" -resize "1920x1080^" -gravity center -extent 1920x1080 "$tmpFile"
    
    if ($LASTEXITCODE -eq 0) {
        Move-Item "$tmpFile" "$inFile" -Force
    }
    else {
        Write-Host "Failed to process $($slide.Name)" -ForegroundColor Red
        if (Test-Path "$tmpFile") { Remove-Item "$tmpFile" -Force }
    }
}

Write-Host "Finished processing slides." -ForegroundColor Green
