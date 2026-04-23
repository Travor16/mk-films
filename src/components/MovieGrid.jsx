import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import MovieCard from './MovieCard'
import tmdbApi from '../lib/tmdb'
import useStore from '../store/useStore'

export default function MovieGrid({ title, fetchFunction, genre }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { searchQuery } = useStore()

  useEffect(() => {
    loadMovies()
  }, [page, genre, searchQuery])

  const loadMovies = async () => {
    try {
      setLoading(true)
      let data

      if (searchQuery) {
        data = await tmdbApi.searchMovies(searchQuery, page)
      } else if (genre) {
        data = await tmdbApi.getByGenre(genre, page)
      } else {
        data = await fetchFunction(page)
      }

      if (page === 1) {
        setMovies(data.results || [])
      } else {
        setMovies(prev => [...prev, ...(data.results || [])])
      }

      setHasMore(data.page < data.total_pages)
    } catch (error) {
      console.error('Error loading movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1)
    }
  }

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-luxury-red animate-spin" />
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-white/60 text-lg">No movies found</p>
      </div>
    )
  }

  return (
    <div className="py-12">
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-title font-bold text-white mb-8"
        >
          {title}
        </motion.h2>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} index={index} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-luxury-red hover:bg-luxury-gold text-white px-8 py-3 rounded-full transition glow-red font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Load More</span>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
