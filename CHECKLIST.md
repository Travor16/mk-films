# M&K FILMS - Setup Checklist

Use this checklist to ensure your M&K FILMS platform is properly configured and ready to launch!

## ✅ Pre-Setup Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Git installed (for deployment)
- [ ] Code editor ready (VS Code recommended)
- [ ] GitHub account (for deployment)

## ✅ Firebase Setup Checklist

### Project Creation
- [ ] Created Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- [ ] Project name chosen (e.g., "mk-films")
- [ ] Google Analytics disabled (optional)

### Authentication
- [ ] Enabled Email/Password authentication
- [ ] Enabled Google authentication
- [ ] Added support email for Google auth
- [ ] Tested sign-up flow
- [ ] Tested sign-in flow
- [ ] Tested Google OAuth flow

### Firestore Database
- [ ] Created Firestore database
- [ ] Selected database location
- [ ] Set security rules (from SETUP_GUIDE.md)
- [ ] Published security rules
- [ ] Created `comments` collection (auto-created on first comment)
- [ ] Created `customMovies` collection (auto-created on first movie)

### Firebase Config
- [ ] Copied Firebase config from Project Settings
- [ ] Saved API key
- [ ] Saved Auth domain
- [ ] Saved Project ID
- [ ] Saved Storage bucket
- [ ] Saved Messaging sender ID
- [ ] Saved App ID

### Authorized Domains (After Deployment)
- [ ] Added localhost:3000 (auto-added)
- [ ] Added production domain (e.g., mk-films.vercel.app)
- [ ] Tested authentication on production

## ✅ TMDB API Setup Checklist

- [ ] Created TMDB account at [themoviedb.org](https://www.themoviedb.org)
- [ ] Verified email address
- [ ] Requested API key (Settings → API)
- [ ] Chose "Developer" option
- [ ] Filled application details
- [ ] Copied API key (v3 auth)
- [ ] Tested API key with sample request

## ✅ Local Development Checklist

### Installation
- [ ] Cloned repository
- [ ] Ran `npm install`
- [ ] All dependencies installed successfully
- [ ] No error messages

### Configuration
- [ ] Copied `.env.example` to `.env`
- [ ] Added Firebase API key
- [ ] Added Firebase Auth domain
- [ ] Added Firebase Project ID
- [ ] Added Firebase Storage bucket
- [ ] Added Firebase Messaging sender ID
- [ ] Added Firebase App ID
- [ ] Added TMDB API key
- [ ] Set admin password
- [ ] Saved `.env` file

### Development Server
- [ ] Ran `npm run dev`
- [ ] Server started on port 3000
- [ ] No console errors
- [ ] Opened http://localhost:3000
- [ ] Homepage loads successfully

## ✅ Feature Testing Checklist

### Homepage
- [ ] Hero section displays
- [ ] Hero trailer autoplays
- [ ] "Watch Now" button works
- [ ] "Download" button works
- [ ] Trending movies row displays
- [ ] Popular movies row displays
- [ ] Top rated movies row displays
- [ ] Genre rows display (Action, Comedy, Horror)
- [ ] Horizontal scroll works
- [ ] Arrow buttons appear on hover
- [ ] Movie cards display correctly

### Movie Cards
- [ ] Poster images load
- [ ] Rating badge shows
- [ ] Hover effect works
- [ ] Trailer preview plays on hover
- [ ] Play button appears on hover
- [ ] Add to watchlist button works
- [ ] Click navigates to movie detail

### Search
- [ ] Search icon in navbar
- [ ] Search input opens
- [ ] Can type search query
- [ ] Search results display
- [ ] Results are relevant
- [ ] Mobile search works

### Movie Detail Page
- [ ] Backdrop image displays
- [ ] Poster displays (desktop)
- [ ] Movie title shows
- [ ] Rating displays
- [ ] Year, runtime, age rating show
- [ ] Genre tags display
- [ ] Plot/overview shows
- [ ] Director name shows
- [ ] Cast list shows
- [ ] Quality selector works
- [ ] "Watch Now" button works
- [ ] "Download" button works
- [ ] "Add to Watchlist" button works
- [ ] "Share" button works
- [ ] Similar movies section shows
- [ ] Back button works

### Video Player
- [ ] Player displays when "Watch Now" clicked
- [ ] YouTube trailer plays (demo mode)
- [ ] Quality selector shows
- [ ] Audio track selector shows
- [ ] Subtitle selector shows
- [ ] VPN warning displays
- [ ] Player is responsive

### Authentication
- [ ] "Sign In" button in navbar
- [ ] Login page loads
- [ ] Can sign up with email/password
- [ ] Can sign in with email/password
- [ ] Can sign in with Google
- [ ] Password reset works
- [ ] User avatar displays after login
- [ ] User name displays after login
- [ ] Logout button works
- [ ] Redirects work correctly

### Comments
- [ ] Comments section displays
- [ ] "Sign in to comment" shows when logged out
- [ ] Can post comment when logged in
- [ ] Comment appears immediately
- [ ] Can mark comment as spoiler
- [ ] Spoiler blur works
- [ ] Can reveal spoiler
- [ ] Can like comments
- [ ] Like count updates
- [ ] User avatar shows in comments
- [ ] Timestamp displays

### Profile Page
- [ ] Profile page loads
- [ ] User info displays
- [ ] Profile picture shows
- [ ] Watchlist tab works
- [ ] History tab works
- [ ] Watchlist movies display
- [ ] History movies display
- [ ] Empty states show correctly
- [ ] Logout button works

### Admin Panel
- [ ] Admin page loads at /admin
- [ ] Password prompt shows
- [ ] Can login with admin password
- [ ] "Add Movie" button works
- [ ] Add movie form displays
- [ ] All form fields present
- [ ] Can fill in movie details
- [ ] Can save movie
- [ ] Movie appears in list
- [ ] Can edit movie
- [ ] Can delete movie
- [ ] Confirmation dialog shows

### Responsive Design
- [ ] Mobile view works (< 768px)
- [ ] Tablet view works (768px - 1024px)
- [ ] Desktop view works (> 1024px)
- [ ] Mobile menu works
- [ ] Touch gestures work
- [ ] All features accessible on mobile

## ✅ Build & Deployment Checklist

### Build
- [ ] Ran `npm run build`
- [ ] Build completed successfully
- [ ] No build errors
- [ ] `dist` folder created
- [ ] Ran `npm run preview`
- [ ] Preview works correctly

### Git Setup
- [ ] Initialized git (`git init`)
- [ ] Added all files (`git add .`)
- [ ] Committed files (`git commit -m "Initial commit"`)
- [ ] Created GitHub repository
- [ ] Added remote (`git remote add origin ...`)
- [ ] Pushed to GitHub (`git push -u origin main`)

### Vercel Deployment
- [ ] Signed up at [vercel.com](https://vercel.com)
- [ ] Connected GitHub account
- [ ] Imported repository
- [ ] Added all environment variables
- [ ] Deployed successfully
- [ ] Visited production URL
- [ ] Site loads correctly

### Post-Deployment
- [ ] Added production domain to Firebase authorized domains
- [ ] Updated TMDB application URL
- [ ] Tested authentication on production
- [ ] Tested all features on production
- [ ] Tested on mobile device
- [ ] Tested on different browsers
- [ ] Shared site with friends!

## ✅ Optional Enhancements Checklist

### Video Hosting
- [ ] Created Cloudinary account
- [ ] Uploaded test video
- [ ] Got video URL
- [ ] Added video URL in admin panel
- [ ] Tested video playback

### Custom Domain
- [ ] Purchased domain (optional)
- [ ] Added domain in Vercel
- [ ] Updated DNS records
- [ ] Waited for DNS propagation
- [ ] HTTPS certificate issued
- [ ] Site accessible via custom domain

### Content
- [ ] Added 5+ custom movies
- [ ] Added movie posters
- [ ] Added backdrop images
- [ ] Added trailer URLs
- [ ] Added video URLs
- [ ] Added VJ names (if applicable)
- [ ] Tested all custom movies

### Customization
- [ ] Changed brand colors (optional)
- [ ] Updated fonts (optional)
- [ ] Changed admin password
- [ ] Updated site title
- [ ] Updated meta tags
- [ ] Added favicon

## ✅ Performance Checklist

- [ ] Images load quickly
- [ ] No console errors
- [ ] No console warnings
- [ ] Smooth animations
- [ ] Fast page transitions
- [ ] Search is responsive
- [ ] Video loads quickly
- [ ] Mobile performance good

## ✅ Security Checklist

- [ ] Environment variables not in git
- [ ] `.env` in `.gitignore`
- [ ] Firebase security rules set
- [ ] Admin password changed from default
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] No API keys in client code
- [ ] User data protected

## ✅ Final Launch Checklist

- [ ] All features tested
- [ ] No critical bugs
- [ ] Mobile experience good
- [ ] Desktop experience good
- [ ] Authentication works
- [ ] Comments work
- [ ] Admin panel works
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Documentation read
- [ ] Ready to share!

## 🎉 Post-Launch

- [ ] Shared with friends
- [ ] Posted on social media
- [ ] Added to portfolio
- [ ] Collected feedback
- [ ] Planned improvements
- [ ] Enjoying your platform!

---

## 📊 Checklist Summary

**Total Items:** 200+

**Required for Basic Launch:** ~50 items
**Recommended for Full Launch:** ~100 items
**Optional Enhancements:** ~50 items

---

## 🆘 Troubleshooting

If any checklist item fails:

1. **Check console** for error messages
2. **Review documentation** (README, SETUP_GUIDE)
3. **Verify environment variables** are correct
4. **Check Firebase configuration** is complete
5. **Test TMDB API key** is valid
6. **Clear browser cache** and try again
7. **Try incognito mode** to rule out extensions
8. **Check network tab** for failed requests
9. **Review Firebase security rules**
10. **Open GitHub issue** if stuck

---

## ✅ Quick Verification

Run these commands to verify setup:

```bash
# Check Node version
node --version  # Should be 18+

# Check dependencies
npm list --depth=0  # Should show all packages

# Check environment
cat .env  # Should show all variables (don't share!)

# Test build
npm run build  # Should complete without errors

# Test dev server
npm run dev  # Should start on port 3000
```

---

**Once all required items are checked, you're ready to launch! 🚀**

**Questions? Check [SETUP_GUIDE.md](SETUP_GUIDE.md) or [README.md](README.md)**
