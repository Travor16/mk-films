# M&K FILMS - Complete Setup Guide

This guide will walk you through setting up M&K FILMS from scratch. Everything is 100% free!

## 📋 Table of Contents
1. [Firebase Setup](#firebase-setup)
2. [TMDB API Setup](#tmdb-api-setup)
3. [Local Development](#local-development)
4. [Adding Video Content](#adding-video-content)
5. [Deployment](#deployment)
6. [Custom Domain (Optional)](#custom-domain)

---

## 🔥 Firebase Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `mk-films` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication
1. In Firebase Console, click "Authentication" in left sidebar
2. Click "Get started"
3. Enable **Email/Password**:
   - Click "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **Google**:
   - Click "Google"
   - Toggle "Enable"
   - Enter support email
   - Click "Save"

### Step 3: Create Firestore Database
1. Click "Firestore Database" in left sidebar
2. Click "Create database"
3. Select "Start in production mode"
4. Choose location (closest to your users)
5. Click "Enable"

### Step 4: Set Firestore Security Rules
1. In Firestore, click "Rules" tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Comments - anyone can read, authenticated users can write
    match /comments/{comment} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Custom movies - anyone can read, only authenticated users can write
    match /customMovies/{movie} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click "Publish"

### Step 5: Get Firebase Config
1. Click gear icon ⚙️ → "Project settings"
2. Scroll down to "Your apps"
3. Click web icon `</>`
4. Register app name: `M&K FILMS`
5. Copy the `firebaseConfig` object
6. Save these values for `.env` file

---

## 🎬 TMDB API Setup

### Step 1: Create TMDB Account
1. Go to [TMDB](https://www.themoviedb.org/)
2. Click "Join TMDB"
3. Fill in details and verify email

### Step 2: Request API Key
1. Login to TMDB
2. Click your profile → "Settings"
3. Click "API" in left sidebar
4. Click "Request an API Key"
5. Choose "Developer"
6. Accept terms
7. Fill in application details:
   - **Application Name**: M&K FILMS
   - **Application URL**: http://localhost:3000 (or your domain)
   - **Application Summary**: Personal movie streaming platform
8. Submit

### Step 3: Copy API Key
1. Once approved (instant), copy your **API Key (v3 auth)**
2. Save for `.env` file

---

## 💻 Local Development

### Step 1: Install Node.js
1. Download from [nodejs.org](https://nodejs.org/)
2. Install LTS version (18+)
3. Verify: `node --version`

### Step 2: Clone & Install
```bash
# Clone repository
git clone <your-repo-url>
cd mk-films

# Install dependencies
npm install
```

### Step 3: Configure Environment
```bash
# Copy example env file
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# Firebase (from Step 5 above)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=mk-films.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mk-films
VITE_FIREBASE_STORAGE_BUCKET=mk-films.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# TMDB API (from TMDB setup)
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Admin Password (choose your own)
VITE_ADMIN_PASSWORD=your_secure_password_123
```

### Step 4: Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000` 🎉

---

## 🎥 Adding Video Content

### Option 1: Use TMDB Movies (Automatic)
- Movies from TMDB are automatically available
- Trailers play from YouTube
- No setup needed!

### Option 2: Add Custom Movies with Real Videos

#### A. Upload Videos to Cloudinary (Free 25GB)

1. **Create Cloudinary Account**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for free
   - Verify email

2. **Upload Video**
   - Go to Media Library
   - Click "Upload"
   - Select your MP4 file
   - Wait for upload

3. **Get Video URL**
   - Click uploaded video
   - Copy "Secure URL"
   - Example: `https://res.cloudinary.com/your-cloud/video/upload/v123/movie.mp4`

4. **Add to Admin Panel**
   - Go to `http://localhost:3000/admin`
   - Enter admin password
   - Click "Add Movie"
   - Paste video URL in quality fields
   - Fill other details
   - Save!

#### B. Upload Videos to Backblaze B2 (Free 10GB)

1. **Create Backblaze Account**
   - Go to [backblaze.com/b2](https://www.backblaze.com/b2/cloud-storage.html)
   - Sign up for free
   - Verify email

2. **Create Bucket**
   - Go to "Buckets"
   - Click "Create a Bucket"
   - Name: `mk-films-videos`
   - Files: Public
   - Create

3. **Upload Video**
   - Click bucket name
   - Click "Upload/Download"
   - Upload your MP4 file

4. **Get Public URL**
   - Click file name
   - Copy "Friendly URL"
   - Use in admin panel

#### C. Video Quality Guidelines

For best results, encode videos in multiple qualities:

**480p (SD)**
- Resolution: 854x480
- Bitrate: 1-2 Mbps
- File size: ~500MB per hour

**720p (HD)**
- Resolution: 1280x720
- Bitrate: 3-5 Mbps
- File size: ~1.5GB per hour

**1080p (Full HD)**
- Resolution: 1920x1080
- Bitrate: 5-8 Mbps
- File size: ~3GB per hour

Use [HandBrake](https://handbrake.fr/) (free) to encode videos.

---

## 🚀 Deployment

### Option A: Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Click "Import"

3. **Add Environment Variables**
   - In Vercel dashboard, go to "Settings" → "Environment Variables"
   - Add all variables from `.env`:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_TMDB_API_KEY`
     - `VITE_ADMIN_PASSWORD`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site is live! 🎉

### Option B: Netlify

1. **Build Project**
```bash
npm run build
```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Drag `dist` folder to Netlify Drop
   - Or connect GitHub repo

3. **Add Environment Variables**
   - Go to "Site settings" → "Environment variables"
   - Add all variables from `.env`

4. **Redeploy**
   - Trigger new deploy
   - Site is live! 🚀

### Option C: Cloudflare Pages

1. **Push to GitHub** (if not done)

2. **Deploy**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect GitHub
   - Select repository

3. **Configure Build**
   - Build command: `npm run build`
   - Build output: `dist`
   - Add environment variables

4. **Deploy**
   - Click "Save and Deploy"
   - Site is live! ⚡

---

## 🌐 Custom Domain (Optional)

### Free Options:
- Use Vercel subdomain: `mk-films.vercel.app`
- Use Netlify subdomain: `mk-films.netlify.app`
- Use Cloudflare subdomain: `mk-films.pages.dev`

### Paid Domain ($10-15/year):
1. Buy domain from [Namecheap](https://www.namecheap.com) or [Cloudflare](https://www.cloudflare.com/products/registrar/)
2. In Vercel/Netlify/Cloudflare:
   - Go to "Domains"
   - Click "Add domain"
   - Enter your domain
   - Follow DNS instructions
3. Wait 24-48 hours for DNS propagation

---

## ✅ Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test Google login
- [ ] Test movie search
- [ ] Test video playback
- [ ] Test comments
- [ ] Test watchlist
- [ ] Test admin panel
- [ ] Test on mobile
- [ ] Update Firebase authorized domains
- [ ] Update TMDB application URL
- [ ] Share with friends! 🎉

---

## 🆘 Common Issues

### "Firebase: Error (auth/unauthorized-domain)"
**Solution**: Add your domain to Firebase
1. Firebase Console → Authentication → Settings
2. Scroll to "Authorized domains"
3. Click "Add domain"
4. Add your Vercel/Netlify domain

### "TMDB API returns 401"
**Solution**: Check API key
1. Verify key in `.env`
2. Check TMDB account is verified
3. Wait 10 minutes after requesting key

### Videos not playing
**Solution**: 
1. Check video URL is direct link (ends in .mp4)
2. Verify CORS is enabled on video host
3. Try different browser
4. Disable VPN

### Admin panel not accessible
**Solution**:
1. Check `VITE_ADMIN_PASSWORD` in environment variables
2. Clear browser cache
3. Try incognito mode

---

## 🎓 Next Steps

1. **Add More Movies**: Use admin panel to add custom content
2. **Customize Design**: Edit colors in `tailwind.config.js`
3. **Add Features**: Extend with your own ideas
4. **Share**: Tell friends about your platform!

---

## 📞 Need Help?

- Check [README.md](README.md) for more info
- Open GitHub issue
- Email: contact@mkfilms.com

**Happy streaming! 🎬🍿**
