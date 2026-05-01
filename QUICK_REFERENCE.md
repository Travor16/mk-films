# 🚀 Quick Reference Card

## Add a Movie (30 seconds)

1. Open: `src/data/movies-database.json`
2. Add this:
```json
{
  "id": "YOUR_ID",
  "title": "Movie Title",
  "year": "2025",
  "description": "Movie description",
  "poster_url": "https://poster-url.jpg",
  "video_url": "https://your-video-url.mp4",
  "category": "Translated",
  "quality": "HD"
}
```
3. Save
4. Restart: `npm run dev`
5. Test: `http://localhost:5173/movie/YOUR_ID`

## Commands

```bash
# Start dev server
npm run dev

# Add movie via CLI
node add-movie-to-database.js

# Generate from local files
python scrape-movies.py

# Verify Cloudinary setup
node verify-cloudinary.js
```

## File Locations

- **Database:** `src/data/movies-database.json`
- **Video Logic:** `src/lib/videoStorage.js`
- **Admin Panel:** `http://localhost:5173/admin`

## Video URL Sources

- ✅ Contabo: `https://usc1.contabostorage.com/.../movie.mp4`
- ✅ Cloudinary: `https://res.cloudinary.com/dfd0qyo6j/video/upload/...`
- ✅ Internet Archive: `https://archive.org/download/.../movie.mp4`
- ✅ Your server: `https://yoursite.com/videos/movie.mp4`

## Get Posters

- TMDB: `https://image.tmdb.org/t/p/w500/POSTER_PATH.jpg`
- Placeholder: `https://via.placeholder.com/500x750?text=Movie`

## Test Movie

Your test movie is ready:
- ID: `2640`
- URL: `http://localhost:5173/movie/2640`
- Video: The Gates (2026)

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Video won't play | Check video_url is direct .mp4 link |
| Movie not found | Check ID matches JSON, restart server |
| Download fails | Ensure user is signed in |
| JSON error | Validate at JSONLint.com |

## Need Help?

- Full guide: `FINAL_SETUP_SUMMARY.md`
- JSON guide: `JSON_DATABASE_GUIDE.md`
- Cloudinary: `CLOUDINARY_UPLOAD_GUIDE.md`
