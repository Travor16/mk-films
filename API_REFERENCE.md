# M&K FILMS - API Reference

Complete API documentation for developers extending the platform.

## 📚 Table of Contents
1. [TMDB API Integration](#tmdb-api-integration)
2. [Firebase Services](#firebase-services)
3. [State Management](#state-management)
4. [Component APIs](#component-apis)
5. [Utility Functions](#utility-functions)

---

## 🎬 TMDB API Integration

Location: `src/lib/tmdb.js`

### Configuration
```javascript
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'
```

### Methods

#### `getTrending()`
Get trending movies for the week.

```javascript
const data = await tmdbApi.getTrending()
// Returns: { results: Movie[], page: number, total_pages: number }
```

#### `getPopular(page)`
Get popular movies.

```javascript
const data = await tmdbApi.getPopular(1)
// Returns: { results: Movie[], page: number, total_pages: number }
```

**Parameters:**
- `page` (number, optional): Page number (default: 1)

#### `getTopRated(page)`
Get top-rated movies.

```javascript
const data = await tmdbApi.getTopRated(1)
// Returns: { results: Movie[], page: number, total_pages: number }
```

#### `getMovieDetails(movieId)`
Get detailed information about a specific movie.

```javascript
const movie = await tmdbApi.getMovieDetails(550)
// Returns: Movie object with videos, credits, similar movies
```

**Parameters:**
- `movieId` (number, required): TMDB movie ID

**Returns:**
```javascript
{
  id: number,
  title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
  release_date: string,
  vote_average: number,
  vote_count: number,
  runtime: number,
  genres: Genre[],
  videos: { results: Video[] },
  credits: { cast: Cast[], crew: Crew[] },
  similar: { results: Movie[] }
}
```

#### `searchMovies(query, page)`
Search for movies by title.

```javascript
const results = await tmdbApi.searchMovies('inception', 1)
// Returns: { results: Movie[], page: number, total_pages: number }
```

**Parameters:**
- `query` (string, required): Search query
- `page` (number, optional): Page number (default: 1)

#### `getByGenre(genreId, page)`
Get movies by genre.

```javascript
const action = await tmdbApi.getByGenre(28, 1) // 28 = Action
// Returns: { results: Movie[], page: number, total_pages: number }
```

**Genre IDs:**
- 28: Action
- 12: Adventure
- 16: Animation
- 35: Comedy
- 80: Crime
- 99: Documentary
- 18: Drama
- 10751: Family
- 14: Fantasy
- 36: History
- 27: Horror
- 10402: Music
- 9648: Mystery
- 10749: Romance
- 878: Science Fiction
- 10770: TV Movie
- 53: Thriller
- 10752: War
- 37: Western

#### `getGenres()`
Get list of all movie genres.

```javascript
const data = await tmdbApi.getGenres()
// Returns: { genres: Genre[] }
```

#### `getVideos(movieId)`
Get videos (trailers, teasers) for a movie.

```javascript
const videos = await tmdbApi.getVideos(550)
// Returns: { results: Video[] }
```

#### `getImageUrl(path, size)`
Helper to construct image URLs.

```javascript
const url = tmdbApi.getImageUrl('/poster.jpg', 'w500')
// Returns: 'https://image.tmdb.org/t/p/w500/poster.jpg'
```

**Sizes:**
- Poster: w92, w154, w185, w342, w500, w780, original
- Backdrop: w300, w780, w1280, original

#### `getTrailerUrl(videos)`
Helper to get YouTube trailer embed URL.

```javascript
const url = tmdbApi.getTrailerUrl(movie.videos)
// Returns: 'https://www.youtube.com/embed/VIDEO_KEY?autoplay=1&mute=1...'
```

---

## 🔥 Firebase Services

Location: `src/lib/firebase.js`

### Configuration
```javascript
import { auth, googleProvider, db, storage } from './lib/firebase'
```

### Authentication

#### Sign Up with Email
```javascript
import { createUserWithEmailAndPassword } from 'firebase/auth'

await createUserWithEmailAndPassword(auth, email, password)
```

#### Sign In with Email
```javascript
import { signInWithEmailAndPassword } from 'firebase/auth'

await signInWithEmailAndPassword(auth, email, password)
```

#### Sign In with Google
```javascript
import { signInWithPopup } from 'firebase/auth'

await signInWithPopup(auth, googleProvider)
```

#### Sign Out
```javascript
import { signOut } from 'firebase/auth'

await signOut(auth)
```

#### Password Reset
```javascript
import { sendPasswordResetEmail } from 'firebase/auth'

await sendPasswordResetEmail(auth, email)
```

#### Auth State Listener
```javascript
import { onAuthStateChanged } from 'firebase/auth'

const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log(user.uid, user.email)
  } else {
    // User is signed out
  }
})

// Cleanup
unsubscribe()
```

### Firestore Database

#### Collections
- `comments` - Movie comments
- `customMovies` - Admin-added movies
- `users` - User profiles (optional)

#### Add Document
```javascript
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

await addDoc(collection(db, 'comments'), {
  movieId: '550',
  userId: user.uid,
  text: 'Great movie!',
  createdAt: serverTimestamp()
})
```

#### Get Documents
```javascript
import { collection, getDocs } from 'firebase/firestore'

const querySnapshot = await getDocs(collection(db, 'customMovies'))
const movies = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}))
```

#### Query Documents
```javascript
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'

const q = query(
  collection(db, 'comments'),
  where('movieId', '==', '550'),
  orderBy('createdAt', 'desc')
)

const unsubscribe = onSnapshot(q, (snapshot) => {
  const comments = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
})
```

#### Update Document
```javascript
import { doc, updateDoc, increment } from 'firebase/firestore'

await updateDoc(doc(db, 'comments', commentId), {
  likes: increment(1)
})
```

#### Delete Document
```javascript
import { doc, deleteDoc } from 'firebase/firestore'

await deleteDoc(doc(db, 'customMovies', movieId))
```

---

## 🗄️ State Management

Location: `src/store/useStore.js`

### Zustand Store

```javascript
import useStore from './store/useStore'

function Component() {
  const { user, watchlist, addToWatchlist } = useStore()
  
  // Use state and actions
}
```

### State Properties

#### `user`
Current authenticated user (Firebase User object or null).

```javascript
const user = useStore(state => state.user)
// { uid, email, displayName, photoURL, ... }
```

#### `movies`
Array of movies (if cached).

```javascript
const movies = useStore(state => state.movies)
```

#### `watchlist`
Array of movie IDs in user's watchlist.

```javascript
const watchlist = useStore(state => state.watchlist)
// [550, 680, 27205, ...]
```

#### `watchHistory`
Array of movie IDs user has watched.

```javascript
const watchHistory = useStore(state => state.watchHistory)
// [550, 680, ...]
```

#### `searchQuery`
Current search query string.

```javascript
const searchQuery = useStore(state => state.searchQuery)
```

#### `selectedGenre`
Currently selected genre filter.

```javascript
const selectedGenre = useStore(state => state.selectedGenre)
```

### Actions

#### `setUser(user)`
Set current user.

```javascript
const setUser = useStore(state => state.setUser)
setUser(firebaseUser)
```

#### `setMovies(movies)`
Set movies array.

```javascript
const setMovies = useStore(state => state.setMovies)
setMovies(moviesArray)
```

#### `addToWatchlist(movieId)`
Add movie to watchlist.

```javascript
const addToWatchlist = useStore(state => state.addToWatchlist)
addToWatchlist(550)
```

#### `removeFromWatchlist(movieId)`
Remove movie from watchlist.

```javascript
const removeFromWatchlist = useStore(state => state.removeFromWatchlist)
removeFromWatchlist(550)
```

#### `addToHistory(movieId)`
Add movie to watch history.

```javascript
const addToHistory = useStore(state => state.addToHistory)
addToHistory(550)
```

#### `setSearchQuery(query)`
Set search query.

```javascript
const setSearchQuery = useStore(state => state.setSearchQuery)
setSearchQuery('inception')
```

#### `setSelectedGenre(genre)`
Set genre filter.

```javascript
const setSelectedGenre = useStore(state => state.setSelectedGenre)
setSelectedGenre('Action')
```

---

## 🧩 Component APIs

### MovieCard

```javascript
import MovieCard from './components/MovieCard'

<MovieCard 
  movie={movieObject} 
  index={0} 
/>
```

**Props:**
- `movie` (object, required): TMDB movie object
- `index` (number, required): Index for animation delay

### MovieRow

```javascript
import MovieRow from './components/MovieRow'

<MovieRow 
  title="Trending Now"
  movies={moviesArray}
  loading={false}
/>
```

**Props:**
- `title` (string, required): Row title
- `movies` (array, required): Array of movie objects
- `loading` (boolean, optional): Show loading state

### MovieGrid

```javascript
import MovieGrid from './components/MovieGrid'

<MovieGrid 
  title="Popular Movies"
  fetchFunction={tmdbApi.getPopular}
  genre={28}
/>
```

**Props:**
- `title` (string, optional): Grid title
- `fetchFunction` (function, required): Function to fetch movies
- `genre` (number, optional): Genre ID to filter by

### VideoPlayer

```javascript
import VideoPlayer from './components/VideoPlayer'

<VideoPlayer 
  movieId="550"
  movieTitle="Fight Club"
  trailerKey="SUXWAEX2jlg"
  quality="1080p"
/>
```

**Props:**
- `movieId` (string, required): Movie ID
- `movieTitle` (string, required): Movie title
- `trailerKey` (string, optional): YouTube video key
- `quality` (string, required): Selected quality (480p, 720p, 1080p)

### Comments

```javascript
import Comments from './components/Comments'

<Comments movieId="550" />
```

**Props:**
- `movieId` (string, required): Movie ID for comments

---

## 🛠️ Utility Functions

### Format Time

```javascript
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}
```

### Format Date

```javascript
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
```

### Generate Avatar URL

```javascript
const getAvatarUrl = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=C1121F&color=fff&size=128`
}
```

---

## 🔐 Environment Variables

Required environment variables:

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# TMDB
VITE_TMDB_API_KEY=

# Admin
VITE_ADMIN_PASSWORD=
```

Access in code:
```javascript
const apiKey = import.meta.env.VITE_TMDB_API_KEY
```

---

## 📝 Type Definitions

### Movie Object
```typescript
interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  vote_count: number
  runtime?: number
  genres?: Genre[]
  videos?: { results: Video[] }
  credits?: { cast: Cast[], crew: Crew[] }
  similar?: { results: Movie[] }
}
```

### Comment Object
```typescript
interface Comment {
  id: string
  movieId: string
  userId: string
  userName: string
  userPhoto: string | null
  text: string
  isSpoiler: boolean
  likes: number
  createdAt: Timestamp
}
```

### Custom Movie Object
```typescript
interface CustomMovie {
  id: string
  title: string
  year: number
  genre: string
  rating: number
  plot: string
  poster: string
  backdrop: string
  trailerUrl: string
  videoUrl480: string
  videoUrl720: string
  videoUrl1080: string
  vjName?: string
  cast: string
  director: string
  runtime: number
  createdAt: Date
}
```

---

## 🚀 Extending the Platform

### Adding New Features

1. **Create Component**
```javascript
// src/components/NewFeature.jsx
export default function NewFeature() {
  return <div>New Feature</div>
}
```

2. **Add Route**
```javascript
// src/App.jsx
<Route path="/new-feature" element={<NewFeature />} />
```

3. **Add to Navigation**
```javascript
// src/components/Navbar.jsx
<Link to="/new-feature">New Feature</Link>
```

### Adding New API Endpoints

```javascript
// src/lib/tmdb.js
export const tmdbApi = {
  // ... existing methods
  
  getNewData: async () => {
    const response = await fetch(
      `${TMDB_BASE_URL}/new/endpoint?api_key=${TMDB_API_KEY}`
    )
    return response.json()
  }
}
```

### Adding New State

```javascript
// src/store/useStore.js
const useStore = create((set, get) => ({
  // ... existing state
  
  newState: [],
  setNewState: (data) => set({ newState: data }),
}))
```

---

## 📚 Additional Resources

- [TMDB API Docs](https://developers.themoviedb.org/3)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

**Happy coding! 🚀**
