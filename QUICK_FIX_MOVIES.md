# Quick Fix: Enable Movie Playback & Downloads

## The Problem

Movies are not playing and downloads are not working because:
- The app is in **demo mode** (only shows YouTube trailers)
- No video storage is configured
- `VITE_VIDEO_API_URL` is not set in `.env`

## Quick Solution (5 Minutes)

### Option A: Use Cloudinary (Easiest)

1. **Sign up for Cloudinary** (free)
   - Go to: https://cloudinary.com/users/register/free
   - Get your Cloud Name from dashboard

2. **Upload a test movie**
   - Upload a movie file to Cloudinary
   - Note the URL (e.g., `https://res.cloudinary.com/your-cloud-name/video/upload/v1234567890/test-movie.mp4`)

3. **Update .env file**
   ```bash
   VITE_VIDEO_API_URL=https://res.cloudinary.com/your-cloud-name
   ```

4. **Restart your dev server**
   ```bash
   npm run dev
   ```

### Option B: Use Direct Video URLs (Testing Only)

For quick testing, you can modify `src/lib/videoStorage.js` to return direct video URLs:

```javascript
// In src/lib/videoStorage.js, update checkAvailability:
checkAvailability: async (movieId) => {
  return {
    available: true,  // Change to true
    qualities: ['480p', '720p', '1080p']
  }
},

// Update getVideoUrl:
getVideoUrl: async (movieId, quality = '1080p') => {
  return {
    url: 'https://your-direct-video-url.mp4',  // Your video URL
    quality,
    subtitles: [],
    audioTracks: [
      { id: 'original', label: 'Original Audio' }
    ]
  }
}
```

## What Was Fixed

✅ Created `src/lib/videoStorage.js` - handles video URL fetching
✅ Updated `src/components/VideoPlayer.jsx` - now supports real video playback
✅ Updated `src/pages/MovieDetail.jsx` - proper download handling
✅ Updated `src/lib/tmdb.js` - added video availability checks
✅ Updated `.env.example` - added `VITE_VIDEO_API_URL` configuration

## How It Works Now

1. **When user clicks "Watch Now":**
   - App checks if video is available via `videoStorage.checkAvailability()`
   - If available, fetches video URL via `videoStorage.getVideoUrl()`
   - Plays video in HTML5 player with controls
   - If not available, shows YouTube trailer as fallback

2. **When user clicks "Download":**
   - App checks if video is available
   - Generates download URL via `videoStorage.getDownloadUrl()`
   - Triggers browser download
   - If not available, shows setup instructions

## Current Behavior

**Without VITE_VIDEO_API_URL configured:**
- Shows YouTube trailers only
- Download button shows setup instructions
- Clear warning messages to users

**With VITE_VIDEO_API_URL configured:**
- Plays full movies from your storage
- Downloads work properly
- Full video player controls

## Next Steps

1. **Immediate:** Set up video storage (see VIDEO_STORAGE_SETUP.md)
2. **Short-term:** Upload your movie library
3. **Long-term:** Implement backend API for security and analytics

## Testing

Test with a movie that has a trailer (like Captain America):
1. Go to movie detail page
2. Click "Watch Now"
3. Should see either:
   - Full movie player (if configured)
   - Trailer with clear warning (if not configured)

## Need Help?

- Full setup guide: `VIDEO_STORAGE_SETUP.md`
- Check `.env.example` for configuration
- Verify `VITE_VIDEO_API_URL` is set correctly
