# M&K FILMS - Premium Movie Hub Specification

## Project Overview
A luxurious, cinematic movie streaming platform with zero-cost infrastructure. Netflix-quality UI using only free, open-source technologies.

## Brand Identity

### Colors
- **Base Black**: `#0A0A0A` - Deep, rich background
- **Primary Red**: `#C1121F` - Accent and CTAs
- **Luxury Gold**: `#D4AF37` - Premium highlights

### Typography
- **Titles**: Cormoant Garamond (Google Fonts)
- **UI/Body**: Inter (Google Fonts)

### Visual Style
- Glassmorphism effects
- Subtle red glow on hover states
- Smooth Framer Motion animations
- Netflix meets private cinema aesthetic

## Technical Architecture

### Frontend Stack (100% Free)
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS
- **State**: Zustand
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Search**: Fuse.js
- **Carousel**: SwiperJS

### Backend (Free Tier Options)
**Option A: Firebase (Spark Plan)**
- Auth: Firebase Authentication
- Database: Firestore
- Storage: Firebase Storage (5GB)

**Option B: Supabase (Free Tier)**
- Auth: Supabase Auth
- Database: PostgreSQL
- Storage: Supabase Storage (1GB)

### Hosting (Free Tier)
- Vercel / Netlify / Cloudflare Pages
- Static site deployment
- Automatic HTTPS

### Media Sources (Free)
- **Movie Data**: TMDB API (The Movie Database) - 100% free, no credit card
- **Trailers**: YouTube embeds from TMDB
- **Streaming**: Integration with free streaming sources or admin-uploaded links
- **Images**: TMDB provides all posters/backdrops for free
- **Subtitles**: OpenSubtitles API (free tier) or admin-uploaded .vtt files

## Core Features

### 1. Hero Section
- Autoplay muted YouTube trailer embed
- "Watch Now" + "Download" CTAs
- Glassmorphic overlay with movie info

### 2. Video Player
- HTML5 video with custom controls
- Quality selector: 480p / 720p / 1080p
- Subtitle support (.vtt files)
- 10-second skip forward/backward
- VPN warning message

### 3. Download Center
- Direct MP4 download links
- File size display
- Quality gating (1080p requires login)

### 4. Authentication
- Google OAuth + Email/Password
- Free tier Firebase/Supabase
- "Sign in to unlock HD" gates

### 5. Comments System
- Threaded comments
- Like/reply functionality
- Spoiler blur toggle
- Stored in Firestore/Supabase

### 6. Movie Catalog
- Grid layout with hover effects
- YouTube trailer preview on hover
- Filters: Genre, Year, Rating, VJ Name
- Client-side fuzzy search

### 7. Movie Detail Page
- Backdrop + poster layout
- Plot, cast, runtime, rating
- "Add to Watchlist" button
- Web Share API integration
- Multiple audio tracks selector

### 8. VJ/Dubbing Support
- VJ name field per movie
- Filter by VJ (e.g., "VJ Junior")
- Multiple audio track support

### 9. Collections
- Curated lists: "Red Carpet Noir", "Midnight Thrillers"
- Array-based movie grouping

### 10. User Profiles
- Watch history tracking
- Watchlist management
- localStorage for guests
- Firestore/Supabase for authenticated users

### 11. Admin Panel
- Password-protected `/admin` route
- Add/edit/delete movies
- Image upload via Cloudinary free tier
- Firestore/Supabase data management

### 12. Responsive Design
- Mobile bottom navigation
- Swipeable carousels
- Tap-to-expand video player
- Touch-optimized controls

## File Structure
```
mk-films/
├── public/
│   └── mock-videos/
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieGrid.jsx
│   │   ├── VideoPlayer.jsx
│   │   ├── Comments.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   └── Admin.jsx
│   ├── store/
│   │   └── useStore.js
│   ├── lib/
│   │   ├── firebase.js
│   │   └── supabase.js
│   ├── data/
│   │   └── mockMovies.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Data Model

### Movie Object
```javascript
{
  id: string,
  title: string,
  year: number,
  genre: string[],
  rating: number,
  runtime: number,
  plot: string,
  cast: string[],
  director: string,
  poster: string,
  backdrop: string,
  trailerUrl: string (YouTube),
  videoUrls: {
    "480p": string,
    "720p": string,
    "1080p": string
  },
  audioTracks: [{
    label: string,
    url: string
  }],
  vjName: string,
  subtitles: [{
    language: string,
    url: string (.vtt)
  }],
  collections: string[]
}
```

## Deployment Steps
1. Clone repository
2. `npm install`
3. Copy `.env.example` to `.env`
4. Add Firebase/Supabase credentials
5. `npm run dev` for local development
6. `npm run build` for production
7. Deploy to Vercel/Netlify (one-click)

## Cost Breakdown
- **Total Monthly Cost**: $0.00
- **Total Setup Cost**: $0.00
- All services remain free within tier limits
