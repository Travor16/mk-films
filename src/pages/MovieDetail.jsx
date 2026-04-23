import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, Download, Plus, Check, Star, Clock, Calendar, 
  Share2, ChevronLeft, Loader2, AlertCircle 
} from 'lucide-react'
import tmdbApi from '../lib/tmdb'
import useStore from '../store/useStore'
import VideoPlayer from '../components/VideoPlayer'
import Comments from '../components/Comments'
import MovieRow from '../components/MovieRow'

export default function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPlayer, setShowPlayer] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState('1080p')
  const { user, watchlist, addToWatchlist, removeFromWatchlist, addToHistory } = useStore()

  const isInWatchlist = watchlist.includes(parseInt(id))

  useEffect(() => {
    loadMovieDetails()
    window.scrollTo(0, 0)
  }, [id])

  const loadMovieDetails = async () => {
    try {
      setLoading(true)
      const data = await tmdbApi.getMovieDetails(id)
      setMovie(data)
      setSimilar(data.similar?.results?.slice(0, 12) || [])
      addToHistory(parseInt(id))
    } catch (error) {
      console.error('Error loading movie:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(parseInt(id))
    } else {
      addToWatchlist(parseInt(id))
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.title,
          text: movie.overview,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleDownload = () => {
    if (!user) {
      alert('Please sign in to download movies')
      return
    }
    
    // In production, this would link to actual video files
    // For now, show a message
    alert(`Download link for ${movie.title} in ${selectedQuality} would be generated here. In production, this connects to your video storage (Cloudinary/Backblaze).`)
  }

  const handleWatchNow = () => {
    if (!user && selectedQuality === '1080p') {
      alert('Please sign in to watch in 1080p')
      return
    }
    setShowPlayer(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 text-luxury-red animate-spin" />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <AlertCircle className="w-16 h-16 text-luxury-red mb-4" />
        <h2 className="text-2xl font-title text-white mb-2">Movie Not Found</h2>
        <Link to="/" className="text-luxury-red hover:text-luxury-gold transition">
          Return Home
        </Link>
      </div>
    )
  }

  const trailer = movie.videos?.results?.find(
    v => v.type === 'Trailer' && v.site === 'YouTube'
  )

  const director = movie.credits?.crew?.find(c => c.job === 'Director')
  const cast = movie.credits?.cast?.slice(0, 10) || []

  return (
    <div className="min-h-screen pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={tmdbApi.getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-64 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="hidden lg:block">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              src={tmdbApi.getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-title font-bold text-white mb-4">
                {movie.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-white/80 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-luxury-gold" fill="#D4AF37" />
                  <span className="font-semibold">{movie.vote_average?.toFixed(1)}</span>
                  <span className="text-white/60">({movie.vote_count} votes)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>{movie.runtime} min</span>
                </div>
                <div className="px-3 py-1 border border-white/30 rounded text-sm">
                  {movie.adult ? '18+' : 'PG-13'}
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map(genre => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 glass rounded-full text-sm border border-white/20"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="text-white/90 text-lg mb-8 leading-relaxed">
                {movie.overview}
              </p>

              {/* Quality Selector */}
              <div className="mb-6">
                <label className="block text-white/80 text-sm mb-2">Select Quality</label>
                <div className="flex flex-wrap gap-2">
                  {['480p', '720p', '1080p'].map(quality => (
                    <button
                      key={quality}
                      onClick={() => setSelectedQuality(quality)}
                      className={`px-6 py-2 rounded-full transition ${
                        selectedQuality === quality
                          ? 'bg-luxury-red text-white glow-red'
                          : 'glass border border-white/20 text-white hover:border-luxury-red'
                      }`}
                    >
                      {quality}
                      {quality === '1080p' && !user && (
                        <span className="ml-2 text-luxury-gold text-xs">🔒 Sign in</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={handleWatchNow}
                  className="flex items-center space-x-2 bg-luxury-red hover:bg-luxury-red/80 text-white px-8 py-3 rounded-full transition glow-red font-semibold"
                >
                  <Play className="w-5 h-5" fill="white" />
                  <span>Watch Now</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 glass hover:bg-white/10 text-white px-8 py-3 rounded-full transition border border-white/20"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>

                <button
                  onClick={toggleWatchlist}
                  className={`flex items-center space-x-2 glass hover:bg-white/10 text-white px-6 py-3 rounded-full transition border border-white/20 ${
                    isInWatchlist ? 'bg-luxury-gold/20' : ''
                  }`}
                >
                  {isInWatchlist ? (
                    <>
                      <Check className="w-5 h-5 text-luxury-gold" />
                      <span>In Watchlist</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Add to List</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 glass hover:bg-white/10 text-white px-6 py-3 rounded-full transition border border-white/20"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>

              {/* VPN Warning */}
              <div className="glass p-4 rounded-lg border border-luxury-red/30 mb-8">
                <p className="text-white/70 text-sm">
                  ⚠️ <span className="text-luxury-red font-semibold">Important:</span> If movies are not playing or downloading, please disable your VPN for better streaming experience.
                </p>
              </div>

              {/* Cast & Crew */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {director && (
                  <div>
                    <h3 className="text-white/60 text-sm mb-2">Director</h3>
                    <p className="text-white font-semibold">{director.name}</p>
                  </div>
                )}
                {cast.length > 0 && (
                  <div>
                    <h3 className="text-white/60 text-sm mb-2">Cast</h3>
                    <p className="text-white">{cast.map(c => c.name).join(', ')}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Video Player */}
        {showPlayer && (
          <div className="my-12">
            <VideoPlayer
              movieId={id}
              movieTitle={movie.title}
              trailerKey={trailer?.key}
              quality={selectedQuality}
            />
          </div>
        )}

        {/* Comments Section */}
        <div className="my-12">
          <Comments movieId={id} />
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="my-12">
            <MovieRow title="Similar Movies" movies={similar} />
          </div>
        )}
      </div>
    </div>
  )
}
