// TMDB API Integration - 100% Free
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const tmdbApi = {
  // Get trending movies
  getTrending: async () => {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
    )
    return response.json()
  },

  // Get popular movies
  getPopular: async (page = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    )
    return response.json()
  },

  // Get top rated movies
  getTopRated: async (page = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&page=${page}`
    )
    return response.json()
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits,similar`
    )
    return response.json()
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    )
    return response.json()
  },

  // Get movies by genre
  getByGenre: async (genreId, page = 1) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`
    )
    return response.json()
  },

  // Get genres list
  getGenres: async () => {
    const response = await fetch(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    )
    return response.json()
  },

  // Get movie videos (trailers)
  getVideos: async (movieId) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
    )
    return response.json()
  },

  // Helper: Get image URL
  getImageUrl: (path, size = 'original') => {
    if (!path) return '/placeholder-movie.jpg'
    return `${TMDB_IMAGE_BASE}/${size}${path}`
  },

  // Helper: Get YouTube trailer URL
  getTrailerUrl: (videos) => {
    const trailer = videos?.results?.find(
      v => v.type === 'Trailer' && v.site === 'YouTube'
    )
    return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}` : null
  },

  // Check if video is available for streaming/download
  checkVideoAvailability: async (movieId) => {
    try {
      const VIDEO_API_BASE = import.meta.env.VITE_VIDEO_API_URL
      
      if (!VIDEO_API_BASE) {
        return { available: false, message: 'Video API not configured' }
      }
      
      const response = await fetch(`${VIDEO_API_BASE}/check/${movieId}`)
      return response.json()
    } catch (error) {
      console.error('Error checking video availability:', error)
      return { available: false, message: 'Unable to check availability' }
    }
  },

  // Get download URL
  getDownloadUrl: async (movieId, quality = '1080p') => {
    try {
      const VIDEO_API_BASE = import.meta.env.VITE_VIDEO_API_URL
      
      if (!VIDEO_API_BASE) {
        throw new Error('Video API not configured')
      }
      
      const response = await fetch(`${VIDEO_API_BASE}/download/${movieId}?quality=${quality}`)
      const data = await response.json()
      return data.downloadUrl
    } catch (error) {
      console.error('Error getting download URL:', error)
      throw error
    }
  }
}

export default tmdbApi
