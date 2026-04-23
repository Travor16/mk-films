import { motion } from 'framer-motion'
import { Play, Star, Plus, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import tmdbApi from '../lib/tmdb'
import useStore from '../store/useStore'

export default function MovieCard({ movie, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStore()

  const isInWatchlist = watchlist.includes(movie.id)

  const handleMouseEnter = async () => {
    setIsHovered(true)
    if (!trailerKey) {
      try {
        const videos = await tmdbApi.getVideos(movie.id)
        const trailer = videos.results?.find(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        )
        if (trailer) setTrailerKey(trailer.key)
      } catch (error) {
        console.error('Error loading trailer:', error)
      }
    }
  }

  const toggleWatchlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie.id)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-white/5">
          {/* Poster Image */}
          <img
            src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />

          {/* Hover Overlay with Trailer */}
          {isHovered && trailerKey && (
            <div className="absolute inset-0 bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
              />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="w-3 h-3 text-luxury-gold" fill="#D4AF37" />
            <span className="text-white text-xs font-semibold">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-2">
              <button className="bg-luxury-red hover:bg-luxury-red/80 text-white p-3 rounded-full transition glow-red">
                <Play className="w-5 h-5" fill="white" />
              </button>
              <button
                onClick={toggleWatchlist}
                className={`glass hover:bg-white/20 text-white p-3 rounded-full transition border border-white/20 ${
                  isInWatchlist ? 'bg-luxury-gold/20' : ''
                }`}
              >
                {isInWatchlist ? (
                  <Check className="w-5 h-5 text-luxury-gold" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="mt-3">
          <h3 className="text-white font-semibold line-clamp-1 group-hover:text-luxury-red transition">
            {movie.title}
          </h3>
          <p className="text-white/60 text-sm mt-1">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
