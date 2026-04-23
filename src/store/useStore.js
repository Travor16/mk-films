import { create } from 'zustand'

const useStore = create((set, get) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),
  
  // Movies state
  movies: [],
  setMovies: (movies) => set({ movies }),
  
  // Watchlist (localStorage for guests, Firestore for users)
  watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
  addToWatchlist: (movieId) => {
    const newWatchlist = [...get().watchlist, movieId]
    set({ watchlist: newWatchlist })
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
  },
  removeFromWatchlist: (movieId) => {
    const newWatchlist = get().watchlist.filter(id => id !== movieId)
    set({ watchlist: newWatchlist })
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
  },
  
  // Watch history
  watchHistory: JSON.parse(localStorage.getItem('watchHistory') || '[]'),
  addToHistory: (movieId) => {
    const history = get().watchHistory
    const newHistory = [movieId, ...history.filter(id => id !== movieId)].slice(0, 20)
    set({ watchHistory: newHistory })
    localStorage.setItem('watchHistory', JSON.stringify(newHistory))
  },
  
  // Search & Filters
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  selectedGenre: 'All',
  setSelectedGenre: (genre) => set({ selectedGenre: genre }),
  
  selectedYear: 'All',
  setSelectedYear: (year) => set({ selectedYear: year }),
  
  selectedVJ: 'All',
  setSelectedVJ: (vj) => set({ selectedVJ: vj }),
}))

export default useStore
