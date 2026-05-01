# 📊 JSON Database System - Complete Guide

Your site now uses a JSON database system - no need for complex backends!

## 🎯 How It Works

1. **Movies stored in JSON file:** `src/data/movies-database.json`
2. **Video files hosted externally:** Contabo, Cloudinary, or your storage
3. **App reads JSON and plays videos:** Simple and fast!

---

## 🚀 Quick Start

### Method 1: Add Movies Manually (Easiest)

1. **Open:** `src/data/movies-database.json`

2. **Add your movie:**
```json
{
  "movies": [
    {
      "id": "2640",
      "title": "The Gates",
      "year": "2026",
      "description": "The Gates (2026) follows friends trapped in a deadly gated community after witnessing a murder.",
      "poster_url": "https://image.tmdb.org/t/p/w500/poster.jpg",
      "video_url": "https://usc1.contabostorage.com/1d8a2252f28184ed5bba83bce6f3d1e90:films/THE_GATES_JR.mp4",
      "category": "Translated",
      "quality": "HD"
    },
    {
      "id": "2641",
      "title": "Your Next Movie",
      "year": "2025",
      "description": "Movie description here",
      "poster_url": "https://your-poster-url.jpg",
      "video_url": "https://your-video-url.mp4",
      "category": "Translated",
      "quality": "HD"
    }
  ]
}
```

3. **Save the file**

4. **Restart dev server:**
```bash
npm run dev
```

5. **Done!** Your movies are live!

---

### Method 2: Use CLI Tool

```bash
node add-movie-to-database.js
```

Follow the prompts to add movies interactively.

---

### Method 3: Use Python Script

```bash
python scrape-movies.py
```

This will:
- Scan your Downloads folder
- Extract movie info from filenames
- Generate JSON database automatically

---

## 📁 Where to Host Your Videos

### Option 1: Use Existing URLs (What You Have)
If you already have video URLs (like from Contabo storage), just paste them in the JSON!

```json
"video_url": "https://usc1.contabostorage.com/1d8a2252f28184ed5bba83bce6f3d1e90:films/MOVIE_NAME.mp4"
```

### Option 2: Upload to Cloudinary
1. Upload video to Cloudinary
2. Get the URL
3. Add to JSON

### Option 3: Use Your Own Server
1. Upload videos to your server
2. Get direct URL
3. Add to JSON

---

## 🎬 Getting Movie Posters

### From TMDB (Free):
1. Go to: https://www.themoviedb.org
2. Search for your movie
3. Right-click poster → Copy image address
4. Use URL like: `https://image.tmdb.org/t/p/w500/POSTER_PATH.jpg`

### Or use placeholder:
```json
"poster_url": "https://via.placeholder.com/500x750?text=Movie+Poster"
```

---

## 📝 JSON Structure Explained

```json
{
  "id": "unique-id",           // Unique identifier (can be anything)
  "title": "Movie Title",      // Movie name
  "year": "2026",              // Release year
  "description": "Plot...",    // Movie description
  "poster_url": "https://...", // Poster image URL
  "video_url": "https://...",  // Direct video file URL
  "category": "Translated",    // Category (Translated, Action, etc.)
  "quality": "HD"              // Video quality (HD, 1080p, etc.)
}
```

---

## 🔄 Bulk Import from Your Downloads

If you have many movies in your Downloads folder:

1. **Edit `scrape-movies.py`:**
```python
# Uncomment this line and update the path:
parse_local_movies("C:\\Users\\J0SC0M\\Downloads")
```

2. **Run the script:**
```bash
python scrape-movies.py
```

3. **It will generate JSON with all your movies!**

4. **Then upload videos to storage and update URLs**

---

## 🎯 Workflow for Adding 100+ Movies

### Step 1: Organize Your Files
```
Downloads/
  ├── CAPTAIN_AMERICA_JR.mp4
  ├── THE_WITCHER_S01E03_JUNIOR.mkv
  ├── BROTHERS_UNDER_FIRE_JR.mp4
  └── ...
```

### Step 2: Upload to Storage
- Upload all to Cloudinary, Contabo, or your server
- Note the base URL pattern

### Step 3: Generate JSON
```bash
python scrape-movies.py
```

### Step 4: Update Video URLs
If your videos follow a pattern:
```
https://storage.com/films/CAPTAIN_AMERICA_JR.mp4
https://storage.com/films/THE_WITCHER_S01E03_JUNIOR.mp4
```

You can use find-replace in the JSON file!

### Step 5: Test
```bash
npm run dev
```

---

## 🧪 Testing Your Setup

1. **Add one test movie to JSON**
2. **Restart server:** `npm run dev`
3. **Go to:** `http://localhost:5173/movie/2640` (use your movie ID)
4. **Click "Watch Now"**
5. **Video should play!**

---

## 🔍 Troubleshooting

### Video Not Playing

**Check:**
1. Is the video_url correct?
2. Is it a direct video file URL (.mp4, .mkv)?
3. Does the URL work when pasted in browser?
4. Check browser console for errors (F12)

**Common Issues:**
- ❌ Webpage URL instead of video file URL
- ❌ URL requires authentication
- ❌ CORS issues (video host blocks your domain)

**Solutions:**
- Use direct video file URLs
- Host videos on CORS-friendly storage
- Use Cloudinary (handles CORS automatically)

### Movie Not Showing

**Check:**
1. Is the movie in `movies-database.json`?
2. Did you restart the dev server?
3. Is the JSON valid? (use JSONLint.com to check)

---

## 💡 Pro Tips

### Tip 1: Use Consistent IDs
```json
"id": "2640"  // Use TMDB ID if possible
```

### Tip 2: Batch Update URLs
If all videos are on same storage:
```bash
# Find: "video_url": ""
# Replace: "video_url": "https://storage.com/films/FILENAME.mp4"
```

### Tip 3: Add Multiple Qualities
```json
{
  "id": "2640",
  "title": "The Gates",
  "videos": {
    "480p": "https://storage.com/gates-480p.mp4",
    "720p": "https://storage.com/gates-720p.mp4",
    "1080p": "https://storage.com/gates-1080p.mp4"
  }
}
```

### Tip 4: Organize by Category
```json
{
  "movies": [
    // Action movies
    {...},
    {...},
    
    // Horror movies
    {...},
    {...}
  ]
}
```

---

## 🎉 You're All Set!

Your JSON database system is:
- ✅ Simple to manage
- ✅ No backend needed
- ✅ Fast and efficient
- ✅ Easy to update

Just add movies to the JSON file and they appear on your site instantly!

---

## 📚 Next Steps

1. Add your first 10 movies to test
2. Upload videos to storage
3. Update JSON with video URLs
4. Test everything works
5. Add more movies!
6. Deploy to production

Need help? Check the other guides or ask me! 🚀
