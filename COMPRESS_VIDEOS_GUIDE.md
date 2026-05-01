# Video Compression Guide for MK Films

Your videos are too large for Cloudinary's free tier (100MB limit). Let's compress them!

## 🎯 Goal
- Compress videos to under 100MB
- Maintain good quality
- Create multiple quality versions (480p, 720p, 1080p)

---

## Method 1: Using HandBrake (Easiest - Windows)

### Download HandBrake
1. Go to: https://handbrake.fr/downloads.php
2. Download Windows version
3. Install it

### Compress Your Videos

**For 480p (Small file, ~50MB):**
1. Open HandBrake
2. Click "Open Source" → Select your movie
3. Preset: Select "Fast 480p30"
4. Destination: Save as `movie-name-480p.mp4`
5. Click "Start Encode"

**For 720p (Medium file, ~100MB):**
1. Preset: Select "Fast 720p30"
2. Destination: Save as `movie-name-720p.mp4`
3. Click "Start Encode"

**For 1080p (Large file, ~200MB):**
1. Preset: Select "Fast 1080p30"
2. Video tab → Quality: Set to 24 (smaller file)
3. Destination: Save as `movie-name-1080p.mp4`
4. Click "Start Encode"

---

## Method 2: Using FFmpeg (Advanced - Command Line)

### Install FFmpeg
1. Download: https://www.gyan.dev/ffmpeg/builds/
2. Extract to `C:\ffmpeg`
3. Add to PATH

### Compress Commands

**480p (Small):**
```bash
ffmpeg -i input.mp4 -vf scale=854:480 -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k output-480p.mp4
```

**720p (Medium):**
```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 26 -preset medium -c:a aac -b:a 128k output-720p.mp4
```

**1080p (Large but compressed):**
```bash
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -crf 24 -preset medium -c:a aac -b:a 128k output-1080p.mp4
```

---

## Method 3: Online Compressor (No Installation)

### CloudConvert (Free)
1. Go to: https://cloudconvert.com/mp4-converter
2. Upload your video
3. Select output format: MP4
4. Click "Settings" → Adjust quality
5. Download compressed video

### FreeConvert (Free)
1. Go to: https://www.freeconvert.com/video-compressor
2. Upload video
3. Choose compression level
4. Download result

---

## Recommended Settings for Your Movies

Based on your files, here's what I recommend:

### Captain America (1.67 GB original)
- **480p:** Target 40-50MB (good for mobile)
- **720p:** Target 80-100MB (good for most users)
- **1080p:** Target 150-200MB (premium quality)

### The Witcher
- Same settings as above

### Brothers Under Fire
- Same settings as above

---

## Quick Batch Compression Script

Save this as `compress-all.bat` in your Downloads folder:

```batch
@echo off
echo Compressing all movies to 480p, 720p, 1080p...

for %%f in (*.mp4 *.mkv *.avi) do (
    echo Processing: %%f
    
    REM 480p
    ffmpeg -i "%%f" -vf scale=854:480 -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k "%%~nf-480p.mp4"
    
    REM 720p
    ffmpeg -i "%%f" -vf scale=1280:720 -c:v libx264 -crf 26 -preset medium -c:a aac -b:a 128k "%%~nf-720p.mp4"
    
    REM 1080p
    ffmpeg -i "%%f" -vf scale=1920:1080 -c:v libx264 -crf 24 -preset medium -c:a aac -b:a 128k "%%~nf-1080p.mp4"
)

echo Done! Check your folder for compressed videos.
pause
```

---

## After Compression

1. **Check file sizes** - Should be under 100MB for 720p
2. **Test playback** - Make sure video plays smoothly
3. **Upload to Cloudinary** - Now they'll fit!
4. **Add to admin panel** - Use the Cloudinary URLs

---

## Alternative: Use Google Drive Instead

If compression is too much work:
1. Upload original files to Google Drive
2. Get shareable links
3. Convert to direct URLs
4. Use in your admin panel

**No compression needed!**
