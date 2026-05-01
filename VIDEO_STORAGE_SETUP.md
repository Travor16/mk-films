# Video Storage Setup Guide

This guide explains how to set up video storage for your MK Films streaming platform so movies can actually play and be downloaded.

## Current Status

⚠️ **The app is currently in demo mode** - it only shows YouTube trailers, not full movies.

To enable full movie playback and downloads, you need to:
1. Upload movie files to a video storage service
2. Create a backend API to serve video URLs
3. Configure the `VITE_VIDEO_API_URL` environment variable

---

## Option 1: Cloudinary (Recommended for Beginners)

**Pros:** Easy setup, free tier available, built-in video optimization
**Cons:** Limited storage on free tier (25GB)

### Setup Steps:

1. **Create Account**
   - Go to https://cloudinary.com
   - Sign up for free account
   - Note your Cloud Name, API Key, and API Secret

2. **Upload Videos**
   - Upload your movie files to Cloudinary
   - Organize by movie ID (e.g., `/movies/1771/1080p.mp4`)
   - Upload different quality versions (480p, 720p, 1080p)

3. **Configure Environment**
   ```bash
   VITE_VIDEO_API_URL=https://res.cloudinary.com/your-cloud-name
   ```

4. **Update videoStorage.js**
   - Modify `src/lib/videoStorage.js` to use Cloudinary URLs
   - Example: `https://res.cloudinary.com/your-cloud-name/video/upload/movies/1771/1080p.mp4`

---

## Option 2: Backblaze B2 (Best for Large Libraries)

**Pros:** Very cheap ($5/TB/month), unlimited bandwidth with Cloudflare
**Cons:** Requires more technical setup

### Setup Steps:

1. **Create Account**
   - Go to https://www.backblaze.com/b2
   - Sign up and create a bucket
   - Note your bucket name and endpoint

2. **Upload Videos**
   - Use Backblaze CLI or web interface
   - Structure: `/movies/{movieId}/{quality}.mp4`
   - Example: `/movies/1771/1080p.mp4`

3. **Set Up Cloudflare (Free CDN)**
   - Add your domain to Cloudflare
   - Configure B2 as origin server
   - Enable caching for video files

4. **Configure Environment**
   ```bash
   VITE_VIDEO_API_URL=https://your-bucket.s3.us-west-002.backblazeb2.com
   ```

---

## Option 3: AWS S3 + CloudFront

**Pros:** Highly scalable, reliable, industry standard
**Cons:** More expensive, complex pricing

### Setup Steps:

1. **Create S3 Bucket**
   - Go to AWS Console → S3
   - Create bucket with public read access
   - Enable CORS for video streaming

2. **Upload Videos**
   - Upload movies to S3
   - Structure: `/movies/{movieId}/{quality}.mp4`

3. **Set Up CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure caching policies

4. **Configure Environment**
   ```bash
   VITE_VIDEO_API_URL=https://your-distribution.cloudfront.net
   ```

---

## Option 4: Self-Hosted Backend (Full Control)

**Pros:** Complete control, no storage limits
**Cons:** Requires server management, bandwidth costs

### Setup Steps:

1. **Set Up Server**
   - Use Node.js/Express, Python/Flask, or any backend
   - Install on VPS (DigitalOcean, Linode, etc.)

2. **Create API Endpoints**
   ```javascript
   // Example Express.js backend
   app.get('/videos/:movieId', async (req, res) => {
     const { movieId } = req.params
     const { quality } = req.query
     
     // Return video URL (can be from local storage or CDN)
     res.json({
       url: `https://your-cdn.com/movies/${movieId}/${quality}.mp4`,
       subtitles: [...],
       audioTracks: [...]
     })
   })
   
   app.get('/download/:movieId', async (req, res) => {
     const { movieId } = req.params
     const { quality } = req.query
     
     // Generate signed download URL
     res.json({
       downloadUrl: `https://your-cdn.com/download/${movieId}/${quality}.mp4`
     })
   })
   
   app.get('/check/:movieId', async (req, res) => {
     const { movieId } = req.params
     
     // Check if video exists
     res.json({
       available: true,
       qualities: ['480p', '720p', '1080p']
     })
   })
   ```

3. **Configure Environment**
   ```bash
   VITE_VIDEO_API_URL=https://api.yoursite.com
   ```

---

## Required API Endpoints

Your backend must implement these endpoints:

### 1. Get Video URL
```
GET /videos/:movieId?quality=1080p

Response:
{
  "url": "https://cdn.example.com/movie.mp4",
  "quality": "1080p",
  "subtitles": [
    { "language": "en", "label": "English", "url": "..." }
  ],
  "audioTracks": [
    { "id": "original", "label": "Original Audio" }
  ]
}
```

### 2. Get Download URL
```
GET /download/:movieId?quality=1080p

Response:
{
  "downloadUrl": "https://cdn.example.com/download/movie.mp4"
}
```

### 3. Check Availability
```
GET /check/:movieId

Response:
{
  "available": true,
  "qualities": ["480p", "720p", "1080p"]
}
```

---

## Video File Organization

Organize your video files like this:

```
/movies/
  /1771/                    # Movie ID from TMDB
    /480p.mp4              # Low quality
    /720p.mp4              # Medium quality
    /1080p.mp4             # High quality
  /550/
    /480p.mp4
    /720p.mp4
    /1080p.mp4
  ...

/subtitles/
  /1771/
    /en.vtt               # English subtitles
    /es.vtt               # Spanish subtitles
  ...
```

---

## Testing Your Setup

1. **Add Video URL to .env**
   ```bash
   VITE_VIDEO_API_URL=https://your-video-api.com
   ```

2. **Restart Development Server**
   ```bash
   npm run dev
   ```

3. **Test a Movie**
   - Navigate to any movie detail page
   - Click "Watch Now"
   - Video should load and play

4. **Test Download**
   - Click "Download" button
   - File should start downloading

---

## Troubleshooting

### Videos Not Playing

1. **Check CORS Settings**
   - Your video storage must allow CORS from your domain
   - Add these headers:
     ```
     Access-Control-Allow-Origin: *
     Access-Control-Allow-Methods: GET, HEAD
     ```

2. **Check Video Format**
   - Use MP4 with H.264 codec
   - Convert videos: `ffmpeg -i input.mkv -c:v libx264 -c:a aac output.mp4`

3. **Check Network Tab**
   - Open browser DevTools → Network
   - Look for failed video requests
   - Check response status codes

### Downloads Not Working

1. **Check Authentication**
   - Ensure user is signed in
   - Verify download permissions

2. **Check URL Generation**
   - Console log the download URL
   - Test URL directly in browser

3. **Check File Permissions**
   - Ensure files are publicly readable
   - Or implement signed URLs for security

---

## Security Considerations

### For Production:

1. **Use Signed URLs**
   - Generate temporary URLs that expire
   - Prevent unauthorized access

2. **Implement Rate Limiting**
   - Prevent abuse and bandwidth theft
   - Use services like Cloudflare

3. **Add Authentication**
   - Verify user is logged in
   - Check subscription status

4. **Enable DRM (Optional)**
   - For premium content protection
   - Use services like Widevine or FairPlay

---

## Cost Estimates

### Cloudinary
- Free: 25GB storage, 25GB bandwidth/month
- Paid: $99/month for 250GB storage

### Backblaze B2 + Cloudflare
- Storage: $5/TB/month
- Bandwidth: Free with Cloudflare
- **Best value for large libraries**

### AWS S3 + CloudFront
- Storage: $23/TB/month
- Bandwidth: $85/TB (first 10TB)
- More expensive but very reliable

### Self-Hosted
- VPS: $5-20/month (DigitalOcean, Linode)
- Bandwidth: Usually 1-5TB included
- Good for small to medium libraries

---

## Next Steps

1. Choose a storage provider
2. Upload a test movie
3. Configure `VITE_VIDEO_API_URL`
4. Test playback and downloads
5. Scale up with more content

For questions or issues, check the main README.md or create an issue on GitHub.
