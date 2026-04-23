# M&K FILMS - Premium Movie Streaming Platform

A luxurious, cinematic movie streaming platform built with React, featuring real movie data from TMDB API, Firebase authentication, and a Netflix-quality UI. **100% free to run forever** - no credit card required.

![M&K FILMS](https://img.shields.io/badge/Cost-$0%20Forever-success)
![React](https://img.shields.io/badge/React-18-blue)
![Firebase](https://img.shields.io/badge/Firebase-Free%20Tier-orange)
![TMDB](https://img.shields.io/badge/TMDB-API-green)

## ✨ Features

### Core Functionality
- 🎬 **Real Movie Data** - Powered by TMDB API (100% free)
- 🎥 **HD Video Streaming** - 480p, 720p, 1080p quality options
- 📥 **Download Center** - Direct download links with quality selection
- 🔐 **User Authentication** - Google OAuth + Email/Password via Firebase
- 💬 **Comments System** - Threaded comments with likes and spoiler tags
- ⭐ **Watchlist & History** - Track your favorite movies
- 🎭 **VJ/Dubbing Support** - Multiple audio tracks and VJ names
- 🔍 **Advanced Search** - Real-time search with filters
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized

### Premium UI/UX
- 🎨 Glassmorphism effects
- ✨ Smooth Framer Motion animations
- 🎯 Red glow hover effects
- 🎪 YouTube trailer autoplay on hover
- 🌟 Cinematic hero section
- 🎬 Custom video player with controls

### Admin Features
- 🛡️ Password-protected admin panel
- ➕ Add custom movies with video links
- ✏️ Edit and delete movies
- 📊 Manage movie database

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Firebase account (free tier)
- TMDB API key (free)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd mk-films
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase (Free Tier)**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Google + Email/Password)
   - Enable Firestore Database
   - Copy your Firebase config

4. **Get TMDB API Key (Free)**
   - Go to [TMDB](https://www.themoviedb.org/)
   - Create a free account
   - Go to Settings → API → Request API Key
   - Choose "Developer" option (free)
   - Copy your API key

5. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# TMDB API (Get from https://www.themoviedb.org/settings/api)
VITE_TMDB_API_KEY=your_tmdb_api_key

# Admin Password (Change this!)
VITE_ADMIN_PASSWORD=your_secure_password
```

6. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` 🎉

## 📦 Deployment (Free)

### Deploy to Vercel (Recommended)
```bash
npm run build
```

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy! ✨

### Deploy to Netlify
```bash
npm run build
```

1. Drag `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo
3. Add environment variables
4. Deploy! 🚀

### Deploy to Cloudflare Pages
```bash
npm run build
```

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Connect your GitHub repo
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables
6. Deploy! ⚡

## 🎯 Usage

### For Users
1. **Browse Movies** - Explore trending, popular, and top-rated movies
2. **Search** - Find movies by title, genre, or year
3. **Watch** - Click "Watch Now" to stream movies
4. **Download** - Select quality and download movies
5. **Sign In** - Create account to unlock HD and save watchlist
6. **Comment** - Share your thoughts and mark spoilers

### For Admins
1. Navigate to `/admin`
2. Enter admin password (from `.env`)
3. Add custom movies with:
   - Movie details (title, year, genre, etc.)
   - Poster and backdrop images
   - YouTube trailer URL
   - Video URLs for 480p, 720p, 1080p
   - VJ name (optional)
   - Cast and crew info

## 🎬 Adding Movies

### Option 1: TMDB Movies (Automatic)
Movies from TMDB are automatically available. Just browse and enjoy!

### Option 2: Custom Movies (Admin Panel)
1. Go to `/admin`
2. Click "Add Movie"
3. Fill in movie details
4. For video URLs, upload your MP4 files to:
   - **Cloudinary** (25GB free) - [cloudinary.com](https://cloudinary.com)
   - **Backblaze B2** (10GB free) - [backblaze.com](https://www.backblaze.com/b2/cloud-storage.html)
   - Or any free CDN
5. Paste the direct video URLs
6. Save!

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  'luxury-black': '#0A0A0A',
  'luxury-red': '#C1121F',
  'luxury-gold': '#D4AF37',
}
```

### Fonts
Edit `index.html` Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

### Admin Password
Change in `.env`:
```env
VITE_ADMIN_PASSWORD=your_new_password
```

## 📊 Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| **Vercel Hosting** | Unlimited | $0 |
| **Firebase Auth** | 10K users/month | $0 |
| **Firestore** | 1GB storage, 50K reads/day | $0 |
| **TMDB API** | 1M requests/month | $0 |
| **Cloudinary** | 25GB storage, 25GB bandwidth | $0 |
| **Domain** | Use Vercel subdomain | $0 |
| **TOTAL** | | **$0/month** |

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS + Custom CSS
- **State**: Zustand
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth**: Firebase Authentication
- **Database**: Firebase Firestore
- **Movie Data**: TMDB API
- **Video**: YouTube embeds + Custom player
- **Hosting**: Vercel/Netlify/Cloudflare Pages

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🔒 Security

- Firebase security rules configured
- Admin panel password protected
- Environment variables for sensitive data
- HTTPS enforced on deployment
- XSS protection enabled

## 🐛 Troubleshooting

### Movies not loading?
- Check TMDB API key in `.env`
- Verify Firebase configuration
- Check browser console for errors

### Videos not playing?
- Disable VPN
- Check video URL is direct link
- Verify CORS settings on video host
- Try different browser

### Can't login?
- Check Firebase Authentication is enabled
- Verify Google OAuth is configured
- Check email/password provider is enabled

### Admin panel not working?
- Verify admin password in `.env`
- Check Firestore is enabled
- Verify security rules allow writes

## 📄 License

MIT License - feel free to use for personal or commercial projects!

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📧 Support

For issues or questions, open a GitHub issue or contact: contact@mkfilms.com

## 🌟 Acknowledgments

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

**Built with ❤️ for movie lovers everywhere**

*This product uses the TMDB API but is not endorsed or certified by TMDB.*
