# 📤 Cloudinary Upload Guide

## Quick Setup Checklist

- [ ] Created Cloudinary account
- [ ] Got Cloud Name from dashboard
- [ ] Added Cloud Name to .env file
- [ ] Uploaded test video
- [ ] Tested playback

---

## Step 1: Add Your Cloud Name to .env

After signing up for Cloudinary, add this to your `.env` file:

```bash
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
```

**Example:**
```bash
VITE_CLOUDINARY_CLOUD_NAME=dxyz123abc
```

---

## Step 2: Organize Your Video Files

Before uploading, organize your videos like this:

```
📁 Your Computer
  📁 movies/
    📁 1771/              ← Movie ID from TMDB
      📄 480p.mp4        ← Low quality (smaller file)
      📄 720p.mp4        ← Medium quality
      📄 1080p.mp4       ← High quality
    📁 550/
      📄 480p.mp4
      📄 720p.mp4
      📄 1080p.mp4
```

**How to get Movie IDs:**
- Go to your movie detail page
- Look at the URL: `mk-films.vercel.app/movie/1771`
- The number `1771` is the movie ID

---

## Step 3: Upload Videos to Cloudinary

### Method A: Using Cloudinary Dashboard (Easiest)

1. **Go to Cloudinary Console**
   - Visit: https://cloudinary.com/console/media_library
   - Click "Upload" button (top right)

2. **Create Folder Structure**
   - Click "Create Folder" 
   - Name it: `movies`
   - Inside `movies`, create folder: `1771` (your movie ID)

3. **Upload Video**
   - Go into the `1771` folder
   - Click "Upload"
   - Select your video file (e.g., `1080p.mp4`)
   - Wait for upload to complete
   - **Important:** Make sure the file is named exactly `1080p.mp4`, `720p.mp4`, or `480p.mp4`

4. **Verify Upload**
   - After upload, click on the video
   - Copy the URL - it should look like:
     ```
     https://res.cloudinary.com/your-cloud-name/video/upload/v1234567890/movies/1771/1080p.mp4
     ```

### Method B: Using Cloudinary CLI (Advanced)

1. **Install Cloudinary CLI**
   ```bash
   npm install -g cloudinary-cli
   ```

2. **Configure CLI**
   ```bash
   cloudinary config
   ```
   Enter your Cloud Name, API Key, and API Secret

3. **Upload Videos**
   ```bash
   cloudinary upload movies/1771/1080p.mp4 --folder movies/1771 --resource_type video
   cloudinary upload movies/1771/720p.mp4 --folder movies/1771 --resource_type video
   cloudinary upload movies/1771/480p.mp4 --folder movies/1771 --resource_type video
   ```

---

## Step 4: Test Your Setup

1. **Restart your dev server**
   ```bash
   npm run dev
   ```

2. **Go to the movie page**
   - Navigate to: `http://localhost:5173/movie/1771`
   - (Replace 1771 with your movie ID)

3. **Click "Watch Now"**
   - Video should load and play
   - If it doesn't, check browser console for errors

4. **Test Download**
   - Click "Download" button
   - File should start downloading

---

## Video File Requirements

### Recommended Format:
- **Container:** MP4
- **Video Codec:** H.264
- **Audio Codec:** AAC
- **Resolution:** 1920x1080 (1080p), 1280x720 (720p), 854x480 (480p)

### Convert Videos with FFmpeg:

**Convert to 1080p:**
```bash
ffmpeg -i input.mkv -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -vf scale=1920:1080 1080p.mp4
```

**Convert to 720p:**
```bash
ffmpeg -i input.mkv -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k -vf scale=1280:720 720p.mp4
```

**Convert to 480p:**
```bash
ffmpeg -i input.mkv -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 96k -vf scale=854:480 480p.mp4
```

---

## Folder Structure in Cloudinary

Your Cloudinary should look like this:

```
📁 Cloudinary Media Library
  📁 movies/
    📁 1771/
      📄 480p.mp4
      📄 720p.mp4
      📄 1080p.mp4
    📁 550/
      📄 480p.mp4
      📄 720p.mp4
      📄 1080p.mp4
    📁 299536/
      📄 480p.mp4
      📄 720p.mp4
      📄 1080p.mp4
```

---

## Adding Subtitles (Optional)

1. **Create subtitles folder**
   - In Cloudinary, create folder: `subtitles`
   - Inside, create folder with movie ID: `1771`

2. **Upload subtitle files**
   - Format: WebVTT (.vtt)
   - Names: `en.vtt`, `es.vtt`, `fr.vtt`

3. **Subtitle file example (en.vtt):**
   ```
   WEBVTT

   00:00:01.000 --> 00:00:04.000
   Welcome to the movie

   00:00:05.000 --> 00:00:08.000
   Enjoy watching!
   ```

---

## Troubleshooting

### Video Not Playing

**Problem:** Video shows loading spinner forever

**Solutions:**
1. Check browser console for errors
2. Verify Cloud Name in .env is correct
3. Check video URL in Network tab
4. Ensure video file is named correctly (480p.mp4, 720p.mp4, 1080p.mp4)
5. Verify folder structure: `movies/{movieId}/{quality}.mp4`

### Video URL Not Found (404)

**Problem:** Browser shows 404 error for video

**Solutions:**
1. Check folder structure in Cloudinary
2. Ensure video is in: `movies/1771/1080p.mp4` (not `movies/1771/v1234567890/1080p.mp4`)
3. Remove version number from folder if present
4. Re-upload with correct folder structure

### Download Not Working

**Problem:** Download button doesn't work

**Solutions:**
1. Ensure user is signed in
2. Check browser console for errors
3. Verify video exists in Cloudinary
4. Test video URL directly in browser

---

## Free Tier Limits

**Cloudinary Free Plan:**
- ✅ 25GB storage
- ✅ 25GB bandwidth per month
- ✅ Unlimited transformations
- ✅ Video optimization included

**Estimated capacity:**
- ~10-15 full movies (1080p, ~2GB each)
- ~50-100 movies (720p, ~500MB each)

**When you need more:**
- Upgrade to paid plan ($99/month for 250GB)
- Or use multiple Cloudinary accounts
- Or switch to Backblaze B2 (cheaper for large libraries)

---

## Next Steps

1. ✅ Upload your first test video
2. ✅ Test playback on your site
3. ✅ Upload more movies
4. ✅ Add subtitles (optional)
5. ✅ Share your site with users!

---

## Need Help?

- **Cloudinary Docs:** https://cloudinary.com/documentation
- **Video Upload Guide:** https://cloudinary.com/documentation/video_upload
- **FFmpeg Guide:** https://ffmpeg.org/documentation.html

If you run into issues, check the browser console and Cloudinary dashboard for error messages.
