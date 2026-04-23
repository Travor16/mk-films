# 🎬 Getting Started with M&K FILMS

Welcome! This guide will help you get M&K FILMS up and running in minutes.

## 🎯 What You're Building

A **premium movie streaming platform** with:
- Real movie data from TMDB (100,000+ movies)
- User authentication (Google + Email)
- Video streaming with quality selection
- Comments and social features
- Admin panel to add custom movies
- **100% free to run forever**

## 🚀 Three Ways to Get Started

### 1️⃣ Quick Start (5 Minutes)
Perfect if you just want to see it working.

```bash
npm install
cp .env.example .env
# Add your API keys to .env
npm run dev
```

👉 [Full Quick Start Guide](QUICK_START.md)

### 2️⃣ Complete Setup (30 Minutes)
Recommended for production deployment.

1. Set up Firebase (10 min)
2. Get TMDB API key (5 min)
3. Configure locally (5 min)
4. Deploy to Vercel (10 min)

👉 [Full Setup Guide](SETUP_GUIDE.md)

### 3️⃣ Step-by-Step Checklist
Follow along and check off items as you go.

👉 [Complete Checklist](CHECKLIST.md)

## 📚 Documentation Overview

| Document | Purpose | Time |
|----------|---------|------|
| **[README.md](README.md)** | Main documentation | 10 min read |
| **[QUICK_START.md](QUICK_START.md)** | Get running fast | 5 min |
| **[SETUP_GUIDE.md](SETUP_GUIDE.md)** | Detailed setup | 30 min |
| **[FEATURES.md](FEATURES.md)** | Feature list | 5 min read |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Project overview | 10 min read |
| **[API_REFERENCE.md](API_REFERENCE.md)** | Developer API docs | Reference |
| **[CHECKLIST.md](CHECKLIST.md)** | Setup checklist | Follow along |
| **[SPEC.md](SPEC.md)** | Technical spec | Reference |

## 🎓 Learning Path

### Beginner Path
1. Read [README.md](README.md) - Understand what you're building
2. Follow [QUICK_START.md](QUICK_START.md) - Get it running locally
3. Explore the code - See how it works
4. Read [FEATURES.md](FEATURES.md) - Learn what it can do

### Intermediate Path
1. Follow [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup
2. Deploy to Vercel - Get it online
3. Add custom movies - Make it yours
4. Customize design - Change colors/fonts

### Advanced Path
1. Read [API_REFERENCE.md](API_REFERENCE.md) - Understand the APIs
2. Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Architecture overview
3. Extend features - Add your own ideas
4. Contribute back - Share improvements

## 🔑 What You Need

### Required (Free)
- **Node.js 18+** - [Download](https://nodejs.org)
- **Firebase Account** - [Sign up](https://firebase.google.com)
- **TMDB Account** - [Sign up](https://www.themoviedb.org)

### Optional (Free)
- **GitHub Account** - For deployment
- **Vercel Account** - For hosting
- **Cloudinary Account** - For video hosting

**Total Cost: $0** 💰

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 First Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mk-films
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get API keys** (5 minutes)
   - Firebase: [console.firebase.google.com](https://console.firebase.google.com)
   - TMDB: [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your keys
   ```

5. **Run locally**
   ```bash
   npm run dev
   ```

6. **Visit** http://localhost:3000 🎉

## 🎬 What to Do First

### After Setup
1. ✅ Browse movies from TMDB
2. ✅ Search for your favorite movie
3. ✅ Sign up for an account
4. ✅ Add movies to watchlist
5. ✅ Post a comment
6. ✅ Try the admin panel (`/admin`)

### Before Deployment
1. ✅ Test all features locally
2. ✅ Change admin password in `.env`
3. ✅ Customize colors (optional)
4. ✅ Add custom movies (optional)
5. ✅ Read deployment guide

### After Deployment
1. ✅ Add production domain to Firebase
2. ✅ Test on mobile device
3. ✅ Share with friends
4. ✅ Collect feedback
5. ✅ Plan improvements

## 🆘 Need Help?

### Common Issues

**Movies not loading?**
- Check TMDB API key in `.env`
- Verify internet connection
- Check browser console for errors

**Can't sign in?**
- Check Firebase configuration
- Verify Authentication is enabled
- Check authorized domains in Firebase

**Admin panel not working?**
- Verify admin password in `.env`
- Check Firestore is enabled
- Review security rules

**Build errors?**
- Delete `node_modules` and reinstall
- Clear npm cache: `npm cache clean --force`
- Check Node.js version: `node --version`

### Get Support

1. **Check documentation** - Most answers are here
2. **Review checklist** - [CHECKLIST.md](CHECKLIST.md)
3. **Read setup guide** - [SETUP_GUIDE.md](SETUP_GUIDE.md)
4. **Open GitHub issue** - For bugs
5. **Email support** - contact@mkfilms.com

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'luxury-black': '#0A0A0A',  // Your color
  'luxury-red': '#C1121F',    // Your color
  'luxury-gold': '#D4AF37',   // Your color
}
```

### Change Fonts
Edit `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

Then update `tailwind.config.js`:
```javascript
fontFamily: {
  'title': ['"Your Font"', 'serif'],
  'body': ['"Your Font"', 'sans-serif'],
}
```

### Change Site Name
1. Update `index.html` title
2. Update `Navbar.jsx` logo text
3. Update `Footer.jsx` brand name
4. Update `README.md`

## 📈 Next Steps

### Week 1
- [ ] Get it running locally
- [ ] Understand the features
- [ ] Deploy to Vercel
- [ ] Share with friends

### Week 2
- [ ] Add custom movies
- [ ] Customize design
- [ ] Set up video hosting
- [ ] Test on mobile

### Week 3
- [ ] Collect user feedback
- [ ] Fix any issues
- [ ] Add more content
- [ ] Plan new features

### Month 1
- [ ] Build user base
- [ ] Monitor usage
- [ ] Optimize performance
- [ ] Add requested features

## 🌟 Success Tips

1. **Start Simple** - Get basic version working first
2. **Test Often** - Check features as you build
3. **Read Docs** - Most answers are documented
4. **Ask Questions** - Don't hesitate to ask for help
5. **Have Fun** - Enjoy building your platform!

## 🎉 You're Ready!

You now have everything you need to build and launch M&K FILMS.

**Choose your path:**
- 🏃 **Fast**: [QUICK_START.md](QUICK_START.md)
- 📖 **Complete**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- ✅ **Guided**: [CHECKLIST.md](CHECKLIST.md)

**Let's build something amazing! 🚀**

---

## 📞 Quick Links

- **Documentation**: [README.md](README.md)
- **Setup Guide**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Features**: [FEATURES.md](FEATURES.md)
- **API Reference**: [API_REFERENCE.md](API_REFERENCE.md)
- **Checklist**: [CHECKLIST.md](CHECKLIST.md)

---

**Questions? Start with [README.md](README.md) or [SETUP_GUIDE.md](SETUP_GUIDE.md)**

**Ready to code? Run `npm install` and let's go! 🎬**
