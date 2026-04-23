# M&K FILMS - Quick Start (5 Minutes)

Get your movie streaming platform running in 5 minutes!

## ⚡ Super Quick Setup

### 1. Install Dependencies (1 min)
```bash
npm install
```

### 2. Get Free API Keys (2 min)

**Firebase** (30 seconds):
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create project → Enable Auth + Firestore
3. Copy config from Project Settings

**TMDB** (30 seconds):
1. Go to [themoviedb.org](https://www.themoviedb.org)
2. Sign up → Settings → API → Request Key
3. Copy API key

### 3. Configure (30 seconds)
```bash
cp .env.example .env
# Edit .env with your keys
```

### 4. Run (30 seconds)
```bash
npm run dev
```

Visit: `http://localhost:3000` 🎉

## 🚀 Deploy to Vercel (2 min)

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# Deploy
# Go to vercel.com → Import → Add env vars → Deploy
```

Done! Your site is live! 🎬

## 📝 Quick Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
git push            # Auto-deploy (if connected to Vercel/Netlify)
```

## 🎯 Quick Links

- **Homepage**: `/`
- **Movie Detail**: `/movie/:id`
- **Login**: `/login`
- **Profile**: `/profile`
- **Admin**: `/admin` (password: from .env)

## 🔑 Default Admin Password

Change in `.env`:
```env
VITE_ADMIN_PASSWORD=mkfilms2024
```

## 📚 Need More Help?

- Full guide: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Features: [FEATURES.md](FEATURES.md)
- README: [README.md](README.md)

## 🎬 That's It!

You now have a fully functional movie streaming platform!

**Cost: $0 forever** 💰
**Time to setup: 5 minutes** ⏱️
**Features: 150+** ✨

Happy streaming! 🍿
