# 🧪 Test Your Video Setup

## Quick Test Checklist

Follow these steps to verify your Cloudinary setup is working:

### ✅ Step 1: Verify .env Configuration

Your `.env` file should have:
```bash
VITE_CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
```

**Check:**
- [ ] Cloud name is added to .env
- [ ] No quotes around the cloud name
- [ ] No spaces before or after

### ✅ Step 2: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### ✅ Step 3: Test with a Sample Movie

**Option A: Use Captain America (Movie ID: 1771)**
1. Go to: `http://localhost:5173/movie/1771`
2. Upload a video to Cloudinary:
   - Folder: `movies/1771/`
   - File name: `1080p.mp4`
3. Click "Watch Now"
4. Video should play!

**Option B: Use Any Movie**
1. Find a movie on your site
2. Note the movie ID from URL (e.g., `/movie/550`)
3. Upload video to: `movies/550/1080p.mp4`
4. Test playback

### ✅ Step 4: Verify Video URL

Open browser DevTools (F12) → Network tab:
- Click "Watch Now"
- Look for video request
- URL should be: `https://res.cloudinary.com/YOUR-CLOUD-NAME/video/upload/movies/1771/1080p.mp4`
- Status should be: `200 OK` (not 404)

---

## Test Video URLs

After uploading, test these URLs directly in your browser:

**Replace `YOUR-CLOUD-NAME` with your actual cloud name:**

```
https://res.cloudinary.com/YOUR-CLOUD-NAME/video/upload/movies/1771/1080p.mp4
https://res.cloudinary.com/YOUR-CLOUD-NAME/video/upload/movies/1771/720p.mp4
https://res.cloudinary.com/YOUR-CLOUD-NAME/video/upload/movies/1771/480p.mp4
```

**Expected result:** Video should play in browser

---

## Common Issues & Fixes

### Issue 1: "Cloudinary not configured" Error

**Cause:** Cloud name not in .env or server not restarted

**Fix:**
1. Check `.env` file has `VITE_CLOUDINARY_CLOUD_NAME=...`
2. Restart dev server: `npm run dev`
3. Hard refresh browser: `Ctrl+Shift+R`

### Issue 2: Video Shows 404 Error

**Cause:** Video not uploaded or wrong folder structure

**Fix:**
1. Go to Cloudinary dashboard
2. Check folder structure is: `movies/1771/1080p.mp4`
3. NOT: `movies/1771/v1234567890/1080p.mp4` (no version number in path)
4. Re-upload if needed

### Issue 3: Video Loads Forever

**Cause:** Video file too large or wrong format

**Fix:**
1. Check video file size (should be under 2GB for smooth streaming)
2. Convert to MP4 H.264 format
3. Use FFmpeg to compress:
   ```bash
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium output.mp4
   ```

### Issue 4: Download Button Shows Alert

**Cause:** Video not available or user not signed in

**Fix:**
1. Sign in to your account
2. Verify video exists in Cloudinary
3. Check browser console for specific error

---

## Sample Test Video

Don't have a video file? Use this free sample:

**Big Buck Bunny (Open Source Movie):**
- Download: https://download.blender.org/demo/movies/BBB/
- File: `bbb_sunflower_1080p_30fps_normal.mp4`
- Perfect for testing!

**Upload to Cloudinary:**
1. Download the file
2. Rename to: `1080p.mp4`
3. Upload to: `movies/1771/1080p.mp4`
4. Test on your site!

---

## Success Indicators

You'll know it's working when:

✅ Video player loads (not YouTube trailer)
✅ Video plays smoothly
✅ Quality selector works (480p, 720p, 1080p)
✅ Download button triggers download
✅ No errors in browser console
✅ Network tab shows 200 OK for video requests

---

## Next Steps After Testing

Once your test video works:

1. **Upload more movies**
   - Use the same folder structure
   - Create folders for each movie ID

2. **Add multiple qualities**
   - Upload 480p, 720p, and 1080p versions
   - Users can choose quality based on internet speed

3. **Add subtitles (optional)**
   - Upload .vtt files to `subtitles/{movieId}/en.vtt`

4. **Monitor usage**
   - Check Cloudinary dashboard for bandwidth usage
   - Free tier: 25GB/month

5. **Deploy to production**
   - Add `VITE_CLOUDINARY_CLOUD_NAME` to Vercel/Netlify env vars
   - Test on live site

---

## Still Having Issues?

1. **Check browser console** (F12 → Console tab)
2. **Check network tab** (F12 → Network tab)
3. **Verify Cloudinary dashboard** - is video uploaded?
4. **Test video URL directly** - paste in browser address bar
5. **Check .env file** - is cloud name correct?

If all else fails, share the error message and I'll help debug! 🚀
