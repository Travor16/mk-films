import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Heart, Clock, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import useStore from '../store/useStore'
import tmdbApi from '../lib/tmdb'
import MovieCard from '../components/MovieCard'

export default function Profile() {
  const { user, watchlist, watchHistory } = useStore()
  const [watchlistMovies, setWatchlistMovies] = useState([])
  const [historyMovies, setHistoryMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('watchlist')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    loadMovies()
  }, [user, watchlist, watchHistory])

  const loadMovies = async () => {
    try {
      setLoading(true)
      
      // Load watchlist movies
      const watchlistPromises = watchlist.map(id => tmdbApi.getMovieDetails(id))
      const watchlistData = await Promise.all(watchlistPromises)
      setWatchlistMovies(watchlistData.filter(m => m))

      // Load history movies
      const historyPromises = watchHistory.slice(0, 20).map(id => tmdbApi.getMovieDetails(id))
      const historyData = await Promise.all(historyPromises)
      setHistoryMovies(historyData.filter(m => m))
    } catch (error) {
      console.error('Error loading profile movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-8 mb-8 border border-white/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}&background=C1121F&color=fff&size=128`}
                alt={user.displayName || user.email}
                className="w-24 h-24 rounded-full border-4 border-luxury-red"
              />
              <div>
                <h1 className="text-3xl font-title font-bold text-white mb-2">
                  {user.displayName || 'Movie Enthusiast'}
                </h1>
                <p className="text-white/60">{user.email}</p>
                <div className="flex items-center space-x-4 mt-3 text-sm">
                  <span className="text-white/80">
                    <Heart className="w-4 h-4 inline mr-1 text-luxury-red" />
                    {watchlist.length} in watchlist
                  </span>
                  <span className="text-white/80">
                    <Clock className="w-4 h-4 inline mr-1 text-luxury-gold" />
                    {watchHistory.length} watched
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 glass hover:bg-white/10 text-white px-6 py-3 rounded-full transition border border-white/20"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`px-6 py-3 rounded-full transition font-semibold ${
              activeTab === 'watchlist'
                ? 'bg-luxury-red text-white glow-red'
                : 'glass text-white/60 hover:text-white border border-white/20'
            }`}
          >
            My Watchlist ({watchlist.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 rounded-full transition font-semibold ${
              activeTab === 'history'
                ? 'bg-luxury-red text-white glow-red'
                : 'glass text-white/60 hover:text-white border border-white/20'
            }`}
          >
            Watch History ({watchHistory.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-white/10 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div>
            {activeTab === 'watchlist' && (
              <div>
                {watchlistMovies.length === 0 ? (
                  <div className="text-center py-20">
                    <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60 text-lg">Your watchlist is empty</p>
                    <p className="text-white/40 text-sm mt-2">
                      Add movies to your watchlist to watch them later
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {watchlistMovies.map((movie, index) => (
                      <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                {historyMovies.length === 0 ? (
                  <div className="text-center py-20">
                    <Clock className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60 text-lg">No watch history yet</p>
                    <p className="text-white/40 text-sm mt-2">
                      Movies you watch will appear here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {historyMovies.map((movie, index) => (
                      <MovieCard key={movie.id} movie={movie} index={index} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
