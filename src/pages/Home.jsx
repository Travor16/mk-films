import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import MovieGrid from '../components/MovieGrid'
import tmdbApi from '../lib/tmdb'
import useStore from '../store/useStore'

export default function Home() {
  const [searchParams] = useSearchParams()
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [actionMovies, setActionMovies] = useState([])
  const [comedyMovies, setComedyMovies] = useState([])
  const [horrorMovies, setHorrorMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const { searchQuery } = useStore()

  const filter = searchParams.get('filter')
  const search = searchParams.get('search')

  useEffect(() => {
    if (!search && !searchQuery) {
      loadAllMovies()
    }
  }, [search, searchQuery])

  const loadAllMovies = async () => {
    try {
      setLoading(true)
      
      const [trending, popular, topRated, action, comedy, horror] = await Promise.all([
        tmdbApi.getTrending(),
        tmdbApi.getPopular(),
        tmdbApi.getTopRated(),
        tmdbApi.getByGenre(28), // Action
        tmdbApi.getByGenre(35), // Comedy
        tmdbApi.getByGenre(27), // Horror
      ])

      setTrendingMovies(trending.results || [])
      setPopularMovies(popular.results || [])
      setTopRatedMovies(topRated.results || [])
      setActionMovies(action.results || [])
      setComedyMovies(comedy.results || [])
      setHorrorMovies(horror.results || [])
    } catch (error) {
      console.error('Error loading movies:', error)
    } finally {
      setLoading(false)
    }
  }

  // Show search results
  if (search || searchQuery) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-title font-bold text-white mb-8">
            Search Results for "{search || searchQuery}"
          </h1>
          <MovieGrid fetchFunction={tmdbApi.getPopular} />
        </div>
      </div>
    )
  }

  // Show filtered view
  if (filter === 'trending') {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MovieGrid title="Trending Now" fetchFunction={tmdbApi.getTrending} />
        </div>
      </div>
    )
  }

  if (filter === 'top-rated') {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MovieGrid title="Top Rated Movies" fetchFunction={tmdbApi.getTopRated} />
        </div>
      </div>
    )
  }

  // Default home view with hero and rows
  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <MovieRow title="Trending Now" movies={trendingMovies} loading={loading} />
        <MovieRow title="Popular Movies" movies={popularMovies} loading={loading} />
        <MovieRow title="Top Rated" movies={topRatedMovies} loading={loading} />
        <MovieRow title="Action & Adventure" movies={actionMovies} loading={loading} />
        <MovieRow title="Comedy" movies={comedyMovies} loading={loading} />
        <MovieRow title="Horror" movies={horrorMovies} loading={loading} />
      </div>
    </div>
  )
}
