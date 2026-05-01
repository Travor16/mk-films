// Video Storage API - JSON Database Integration
// This connects to your local JSON database of movies

let moviesDatabase = { movies: [] }

// Try to import the database
try {
  const dbModule = await import('../data/movies-database.json')
  moviesDatabase = dbModule.default || dbModule
} catch (error) {
  console.warn('Movies database not found, using empty database')
}

export const videoStorage = {
  // Get video URL for streaming
  getVideoUrl: async (movieId, quality = '1080p') => {
    try {
      // Find movie in database
      const movie = moviesDatabase.movies.find(m => m.id === String(movieId))
      
      if (!movie) {
        throw new Error('Movie not found in database')
      }

      // Return video URL from database
      // Most videos from your source are single quality, so we use the same URL for all
      return {
        url: movie.video_url,
        quality: movie.quality || 'HD',
        subtitles: movie.subtitles || [],
        audioTracks: [
          { id: 'original', label: 'Original Audio' },
          { id: 'vj-junior', label: 'VJ Junior Dub' },
          { id: 'vj-emmy', label: 'VJ Emmy Dub' }
        ]
      }
    } catch (error) {
      console.error('Error fetching video URL:', error)
      throw new Error('Failed to load video')
    }
  },

  // Get download link
  getDownloadUrl: async (movieId, quality = '1080p') => {
    try {
      // Find movie in database
      const movie = moviesDatabase.movies.find(m => m.id === String(movieId))
      
      if (!movie) {
        throw new Error('Movie not found in database')
      }
      
      // Return direct download URL
      return movie.video_url
    } catch (error) {
      console.error('Error generating download link:', error)
      throw new Error('Failed to generate download link')
    }
  },

  // Check if video exists for a movie
  checkAvailability: async (movieId) => {
    try {
      // Check if movie exists in database
      const movie = moviesDatabase.movies.find(m => m.id === String(movieId))
      
      if (movie && movie.video_url) {
        return {
          available: true,
          qualities: [movie.quality || 'HD']
        }
      }
      
      return {
        available: false,
        message: 'Video not in database',
        qualities: []
      }
    } catch (error) {
      console.error('Error checking video availability:', error)
      return { available: false, qualities: [] }
    }
  },

  // Get all movies from database
  getAllMovies: () => {
    return moviesDatabase.movies
  },

  // Search movies in database
  searchMovies: (query) => {
    const lowerQuery = query.toLowerCase()
    return moviesDatabase.movies.filter(movie => 
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.description?.toLowerCase().includes(lowerQuery)
    )
  }
}

export default videoStorage
