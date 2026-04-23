import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Download, Plus, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import tmdbApi from '../lib/tmdb'
import useStore from '../store/useStore'

export default function Hero() {
  const [heroMovie, setHeroMovie] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const { user, watchlist, addToWatchlist } = useStore()

  useEffect(() => {
    loadHeroMovie()
  }, [])

  const loadHeroMovie = async () => {
    try {
      const { results } = await tmdbApi.getTrending()
      if (results && results.length > 0) {
        const movie = results[0]
        setHeroMovie(movie)
        
        // Get trailer
        const videos = await tmdbApi.getVideos(movie.id)
        const trailer = videos.results?.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
        if (trailer) setTrailerKey(trailer.key)
      }
    } catch (error) {
      console.error('Error loading hero movie:', error)
    }
  }

  if (!heroMovie) {
    return (
      <div className="relative h-screen bg-luxury-black animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent" />
      </div>
    )
  }

  const isInWatchlist = watchlist.includes(heroMovie.id)

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background with Trailer */}
      <div className="absolute inset-0">
        {trailerKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&playsinline=1&rel=0&modestbranding=1`}
            className="w-full h-full object-cover scale-150"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
        ) : (
          <img
            src={tmdbApi.getImageUrl(heroMovie.backdrop_path, 'original')}
            alt={heroMovie.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-title font-bold text-white mb-4">
              {heroMovie.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center space-x-4 text-white/80 mb-6">
              <span className="text-luxury-gold font-semibold">
                ★ {heroMovie.vote_average?.toFixed(1)}
              </span>
              <span>{new Date(heroMovie.release_date).getFullYear()}</span>
              <span className="px-3 py-1 border border-white/30 rounded text-sm">
                HD
              </span>
            </div>

            {/* Overview */}
            <p className="text-white/90 text-lg mb-8 line-clamp-3">
              {heroMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to={`/movie/${heroMovie.id}`}
                className="flex items-center space-x-2 bg-luxury-red hover:bg-luxury-red/80 text-white px-8 py-3 rounded-full transition glow-red font-semibold"
              >
                <Play className="w-5 h-5" fill="white" />
                <span>Watch Now</span>
              </Link>

              <Link
                to={`/movie/${heroMovie.id}#download`}
                className="flex items-center space-x-2 glass hover:bg-white/10 text-white px-8 py-3 rounded-full transition border border-white/20"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </Link>

              <button
                onClick={() => !isInWatchlist && addToWatchlist(heroMovie.id)}
                className={`flex items-center space-x-2 glass hover:bg-white/10 text-white px-6 py-3 rounded-full transition border border-white/20 ${
                  isInWatchlist ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isInWatchlist}
              >
                <Plus className="w-5 h-5" />
                <span>{isInWatchlist ? 'In Watchlist' : 'Add to List'}</span>
              </button>

              <Link
                to={`/movie/${heroMovie.id}`}
                className="flex items-center space-x-2 glass hover:bg-white/10 text-white px-6 py-3 rounded-full transition border border-white/20"
              >
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </Link>
            </div>

            {/* VPN Warning */}
            <div className="mt-8 glass p-4 rounded-lg border border-luxury-red/30 max-w-xl">
              <p className="text-white/70 text-sm">
                ⚠️ <span className="text-luxury-red font-semibold">Important:</span> If movies are not playing or downloading, please disable your VPN for better streaming experience.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-luxury-red rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  )
}
