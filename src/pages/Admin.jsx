import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Plus, Trash2, Edit, Save, X } from 'lucide-react'
import { db } from '../lib/firebase'
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc 
} from 'firebase/firestore'

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [customMovies, setCustomMovies] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    genre: '',
    rating: '',
    plot: '',
    poster: '',
    backdrop: '',
    trailerUrl: '',
    videoUrl480: '',
    videoUrl720: '',
    videoUrl1080: '',
    vjName: '',
    cast: '',
    director: '',
    runtime: ''
  })

  useEffect(() => {
    if (authenticated) {
      loadCustomMovies()
    }
  }, [authenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'mkfilms2024'
    if (password === adminPassword) {
      setAuthenticated(true)
    } else {
      alert('Incorrect password')
    }
  }

  const loadCustomMovies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'customMovies'))
      const movies = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setCustomMovies(movies)
    } catch (error) {
      console.error('Error loading custom movies:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingMovie) {
        // Update existing movie
        await updateDoc(doc(db, 'customMovies', editingMovie.id), formData)
        alert('Movie updated successfully!')
      } else {
        // Add new movie
        await addDoc(collection(db, 'customMovies'), {
          ...formData,
          createdAt: new Date()
        })
        alert('Movie added successfully!')
      }
      
      resetForm()
      loadCustomMovies()
    } catch (error) {
      console.error('Error saving movie:', error)
      alert('Error saving movie')
    }
  }

  const handleDelete = async (movieId) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteDoc(doc(db, 'customMovies', movieId))
        alert('Movie deleted successfully!')
        loadCustomMovies()
      } catch (error) {
        console.error('Error deleting movie:', error)
        alert('Error deleting movie')
      }
    }
  }

  const handleEdit = (movie) => {
    setEditingMovie(movie)
    setFormData({
      title: movie.title || '',
      year: movie.year || '',
      genre: movie.genre || '',
      rating: movie.rating || '',
      plot: movie.plot || '',
      poster: movie.poster || '',
      backdrop: movie.backdrop || '',
      trailerUrl: movie.trailerUrl || '',
      videoUrl480: movie.videoUrl480 || '',
      videoUrl720: movie.videoUrl720 || '',
      videoUrl1080: movie.videoUrl1080 || '',
      vjName: movie.vjName || '',
      cast: movie.cast || '',
      director: movie.director || '',
      runtime: movie.runtime || ''
    })
    setShowAddForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      year: '',
      genre: '',
      rating: '',
      plot: '',
      poster: '',
      backdrop: '',
      trailerUrl: '',
      videoUrl480: '',
      videoUrl720: '',
      videoUrl1080: '',
      vjName: '',
      cast: '',
      director: '',
      runtime: ''
    })
    setEditingMovie(null)
    setShowAddForm(false)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass max-w-md w-full p-8 rounded-2xl border border-white/10"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Shield className="w-10 h-10 text-luxury-red" />
            <h2 className="text-2xl font-title font-bold text-white">Admin Access</h2>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-luxury-red hover:bg-luxury-gold text-white px-6 py-3 rounded-full transition glow-red font-semibold"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-luxury-red" />
            <h1 className="text-3xl font-title font-bold text-white">Admin Panel</h1>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 bg-luxury-red hover:bg-luxury-gold text-white px-6 py-3 rounded-full transition glow-red"
          >
            {showAddForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            <span>{showAddForm ? 'Cancel' : 'Add Movie'}</span>
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-lg p-6 mb-8 border border-white/10"
          >
            <h2 className="text-2xl font-title font-bold text-white mb-6">
              {editingMovie ? 'Edit Movie' : 'Add New Movie'}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
                required
              />

              <input
                type="number"
                placeholder="Year *"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
                required
              />

              <input
                type="text"
                placeholder="Genre (e.g., Action, Drama)"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="number"
                step="0.1"
                placeholder="Rating (0-10)"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="text"
                placeholder="Poster URL"
                value={formData.poster}
                onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="text"
                placeholder="Backdrop URL"
                value={formData.backdrop}
                onChange={(e) => setFormData({ ...formData, backdrop: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="text"
                placeholder="YouTube Trailer URL"
                value={formData.trailerUrl}
                onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="text"
                placeholder="VJ Name (optional)"
                value={formData.vjName}
                onChange={(e) => setFormData({ ...formData, vjName: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="text"
                placeholder="480p Video URL"
                value={formData.videoUrl480}
                onChange={(e) => setFormData({ ...formData, videoUrl480: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="text"
                placeholder="720p Video URL"
                value={formData.videoUrl720}
                onChange={(e) => setFormData({ ...formData, videoUrl720: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="text"
                placeholder="1080p Video URL"
                value={formData.videoUrl1080}
                onChange={(e) => setFormData({ ...formData, videoUrl1080: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="number"
                placeholder="Runtime (minutes)"
                value={formData.runtime}
                onChange={(e) => setFormData({ ...formData, runtime: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="text"
                placeholder="Director"
                value={formData.director}
                onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <input
                type="text"
                placeholder="Cast (comma separated)"
                value={formData.cast}
                onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
                className="bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red"
              />

              <textarea
                placeholder="Plot/Overview *"
                value={formData.plot}
                onChange={(e) => setFormData({ ...formData, plot: e.target.value })}
                className="md:col-span-2 bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-luxury-red resize-none"
                rows="4"
                required
              />

              <button
                type="submit"
                className="md:col-span-2 flex items-center justify-center space-x-2 bg-luxury-red hover:bg-luxury-gold text-white px-6 py-3 rounded-full transition glow-red font-semibold"
              >
                <Save className="w-5 h-5" />
                <span>{editingMovie ? 'Update Movie' : 'Add Movie'}</span>
              </button>
            </form>
          </motion.div>
        )}

        {/* Movies List */}
        <div className="glass rounded-lg p-6 border border-white/10">
          <h2 className="text-2xl font-title font-bold text-white mb-6">
            Custom Movies ({customMovies.length})
          </h2>

          {customMovies.length === 0 ? (
            <p className="text-white/60 text-center py-8">No custom movies added yet</p>
          ) : (
            <div className="space-y-4">
              {customMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    {movie.poster && (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="text-white font-semibold">{movie.title}</h3>
                      <p className="text-white/60 text-sm">
                        {movie.year} • {movie.genre} • {movie.rating}/10
                      </p>
                      {movie.vjName && (
                        <p className="text-luxury-gold text-sm">VJ: {movie.vjName}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="p-2 glass hover:bg-white/10 text-white rounded-lg transition border border-white/20"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="p-2 bg-luxury-red/20 hover:bg-luxury-red text-white rounded-lg transition border border-luxury-red/30"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
