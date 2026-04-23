# M&K FILMS - Project Structure

Complete file structure and organization of the M&K FILMS platform.

## 📁 Directory Tree

```
mk-films/
│
├── 📄 Configuration Files
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Git ignore rules
│   ├── package.json              # Dependencies and scripts
│   ├── vite.config.js            # Vite build configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── vercel.json               # Vercel deployment config
│   └── netlify.toml              # Netlify deployment config
│
├── 📚 Documentation
│   ├── README.md                 # Main documentation (START HERE)
│   ├── GETTING_STARTED.md        # Getting started guide
│   ├── QUICK_START.md            # 5-minute quick start
│   ├── SETUP_GUIDE.md            # Detailed setup instructions
│   ├── FEATURES.md               # Complete feature list
│   ├── PROJECT_SUMMARY.md        # Project overview
│   ├── API_REFERENCE.md          # Developer API documentation
│   ├── CHECKLIST.md              # Setup checklist
│   ├── SPEC.md                   # Technical specification
│   └── PROJECT_STRUCTURE.md      # This file
│
├── 🌐 Public Assets
│   └── index.html                # HTML entry point
│
└── 💻 Source Code (src/)
    │
    ├── 🎨 Components (src/components/)
    │   ├── Hero.jsx              # Homepage hero section
    │   ├── MovieCard.jsx         # Individual movie card
    │   ├── MovieRow.jsx          # Horizontal movie carousel
    │   ├── MovieGrid.jsx         # Grid layout for movies
    │   ├── VideoPlayer.jsx       # Custom video player
    │   ├── Comments.jsx          # Comments system
    │   ├── Navbar.jsx            # Navigation bar
    │   └── Footer.jsx            # Footer component
    │
    ├── 📄 Pages (src/pages/)
    │   ├── Home.jsx              # Homepage with hero + rows
    │   ├── MovieDetail.jsx       # Movie detail page
    │   ├── Login.jsx             # Authentication page
    │   ├── Profile.jsx           # User profile page
    │   └── Admin.jsx             # Admin panel
    │
    ├── 🔧 Utilities (src/lib/)
    │   ├── firebase.js           # Firebase configuration
    │   └── tmdb.js               # TMDB API wrapper
    │
    ├── 🗄️ State Management (src/store/)
    │   └── useStore.js           # Zustand store
    │
    ├── 🎯 Core Files
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # Entry point
    │   └── index.css             # Global styles
    │
    └── [Build Output]
        └── dist/                 # Production build (generated)
```

## 📊 File Statistics

### By Category
- **Documentation**: 10 files
- **Configuration**: 8 files
- **Components**: 8 files
- **Pages**: 5 files
- **Utilities**: 2 files
- **State**: 1 file
- **Core**: 3 files

**Total**: 37 files

### By Type
- **JavaScript/JSX**: 19 files
- **Markdown**: 10 files
- **Config**: 7 files
- **HTML**: 1 file

### Lines of Code (Approximate)
- **Components**: ~1,500 lines
- **Pages**: ~1,200 lines
- **Utilities**: ~300 lines
- **State**: ~100 lines
- **Styles**: ~100 lines
- **Config**: ~200 lines

**Total**: ~3,400 lines of code

## 🎯 Key Files Explained

### Configuration Files

#### `.env.example`
Template for environment variables. Copy to `.env` and fill in your API keys.

#### `package.json`
Defines project dependencies and npm scripts:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### `vite.config.js`
Vite configuration for fast development and optimized builds.

#### `tailwind.config.js`
Custom Tailwind configuration with luxury colors and fonts.

#### `vercel.json` / `netlify.toml`
Deployment configurations for Vercel and Netlify hosting.

### Documentation Files

#### `README.md` ⭐
**START HERE** - Main documentation with overview, features, and setup.

#### `GETTING_STARTED.md`
Guide to help you choose the right path (quick start vs complete setup).

#### `QUICK_START.md`
Get running in 5 minutes with minimal setup.

#### `SETUP_GUIDE.md`
Detailed step-by-step setup instructions for production deployment.

#### `FEATURES.md`
Complete list of 150+ features with checkmarks.

#### `API_REFERENCE.md`
Developer documentation for extending the platform.

#### `CHECKLIST.md`
200+ item checklist to ensure proper setup.

### Source Files

#### `src/App.jsx`
Main application component with routing setup.

#### `src/main.jsx`
Entry point that renders the React app.

#### `src/index.css`
Global styles including custom scrollbar and utility classes.

### Components

#### `Hero.jsx`
Cinematic hero section with:
- Autoplay trailer background
- Movie title and info
- Action buttons (Watch, Download, Add to List)
- VPN warning

#### `MovieCard.jsx`
Individual movie card with:
- Poster image
- Rating badge
- Hover effects
- Trailer preview on hover
- Quick actions

#### `MovieRow.jsx`
Horizontal scrolling carousel with:
- Arrow navigation
- Smooth scrolling
- Responsive design
- Loading states

#### `MovieGrid.jsx`
Grid layout for movie browsing with:
- Infinite scroll
- Load more button
- Responsive columns
- Search integration

#### `VideoPlayer.jsx`
Custom video player with:
- Quality selector (480p, 720p, 1080p)
- Audio track selector
- Subtitle support
- Custom controls
- YouTube integration

#### `Comments.jsx`
Comments system with:
- Post comments
- Like comments
- Spoiler tags
- Real-time updates
- User avatars

#### `Navbar.jsx`
Navigation bar with:
- Logo and branding
- Search functionality
- User menu
- Mobile menu
- Scroll effects

#### `Footer.jsx`
Footer with:
- Brand information
- Quick links
- Contact info
- Copyright

### Pages

#### `Home.jsx`
Homepage featuring:
- Hero section
- Multiple movie rows
- Search results
- Filter views

#### `MovieDetail.jsx`
Movie detail page with:
- Full movie information
- Video player
- Comments section
- Similar movies
- Action buttons

#### `Login.jsx`
Authentication page with:
- Email/password sign in
- Google OAuth
- Sign up form
- Password reset

#### `Profile.jsx`
User profile with:
- User information
- Watchlist tab
- History tab
- Statistics

#### `Admin.jsx`
Admin panel with:
- Password protection
- Add/edit/delete movies
- Movie list
- Form validation

### Utilities

#### `lib/firebase.js`
Firebase configuration and exports:
- Authentication
- Firestore database
- Storage

#### `lib/tmdb.js`
TMDB API wrapper with methods:
- Get trending movies
- Get popular movies
- Search movies
- Get movie details
- Get genres
- Helper functions

### State Management

#### `store/useStore.js`
Zustand store managing:
- User state
- Watchlist
- Watch history
- Search query
- Filters

## 🔄 Data Flow

```
User Action
    ↓
Component
    ↓
Zustand Store (if needed)
    ↓
API Call (TMDB or Firebase)
    ↓
Update State
    ↓
Re-render Component
    ↓
Display to User
```

## 🎨 Styling Architecture

### Global Styles (`src/index.css`)
- CSS reset
- Custom scrollbar
- Utility classes (glass, glow-red, glow-gold)
- Font imports

### Tailwind Classes
- Utility-first styling
- Responsive breakpoints
- Custom colors and fonts
- Component-specific styles

### Framer Motion
- Page transitions
- Card animations
- Hover effects
- Loading animations

## 🔐 Security Architecture

### Environment Variables
- API keys stored in `.env`
- Not committed to git
- Loaded via Vite

### Firebase Security
- Authentication required for certain actions
- Firestore security rules
- User data isolation

### Admin Protection
- Password-protected admin panel
- Environment variable for password
- Server-side validation

## 📦 Build Process

### Development
```bash
npm run dev
```
1. Vite starts dev server
2. Hot module replacement enabled
3. Fast refresh for React
4. Runs on http://localhost:3000

### Production
```bash
npm run build
```
1. Vite builds optimized bundle
2. Code splitting
3. Minification
4. Asset optimization
5. Output to `dist/` folder

### Preview
```bash
npm run preview
```
1. Serves production build locally
2. Test before deployment

## 🚀 Deployment Flow

```
Local Development
    ↓
Git Commit
    ↓
Push to GitHub
    ↓
Vercel/Netlify Detects Push
    ↓
Automatic Build
    ↓
Deploy to CDN
    ↓
Live Site
```

## 📈 Scalability

### Current Architecture
- Serverless (Firebase)
- Static site (Vercel/Netlify)
- CDN distribution
- API-based data

### Scaling Considerations
- Firebase free tier: 10K users
- TMDB free tier: 1M requests/month
- Vercel: Unlimited bandwidth
- Can upgrade as needed

## 🎯 Best Practices

### Code Organization
✅ Components in separate files
✅ Reusable components
✅ Clear file naming
✅ Logical folder structure

### State Management
✅ Centralized store
✅ Local storage for persistence
✅ Firebase for sync

### Performance
✅ Lazy loading images
✅ Code splitting
✅ Optimized builds
✅ Cached API responses

### Security
✅ Environment variables
✅ Firebase security rules
✅ Input validation
✅ HTTPS only

## 🔍 Finding Files

### Need to modify...

**Colors/Fonts?**
→ `tailwind.config.js`

**API Keys?**
→ `.env`

**Movie Data?**
→ `src/lib/tmdb.js`

**User Auth?**
→ `src/lib/firebase.js`

**Homepage?**
→ `src/pages/Home.jsx`

**Movie Card Design?**
→ `src/components/MovieCard.jsx`

**Navigation?**
→ `src/components/Navbar.jsx`

**Video Player?**
→ `src/components/VideoPlayer.jsx`

**Admin Panel?**
→ `src/pages/Admin.jsx`

**Global Styles?**
→ `src/index.css`

**State Management?**
→ `src/store/useStore.js`

## 📚 Related Documentation

- **Setup**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Features**: [FEATURES.md](FEATURES.md)
- **API**: [API_REFERENCE.md](API_REFERENCE.md)
- **Checklist**: [CHECKLIST.md](CHECKLIST.md)

---

**Now you know where everything is! Happy coding! 🚀**
