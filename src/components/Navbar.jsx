import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, User, LogOut, Film, Menu, X } from 'lucide-react'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import useStore from '../store/useStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { user, setUser, searchQuery, setSearchQuery } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return unsubscribe
  }, [setUser])

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-luxury-red" />
            <span className="text-2xl font-title font-bold text-luxury-gold">
              M&K FILMS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-luxury-red transition">
              Home
            </Link>
            <Link to="/?filter=trending" className="text-white hover:text-luxury-red transition">
              Trending
            </Link>
            <Link to="/?filter=top-rated" className="text-white hover:text-luxury-red transition">
              Top Rated
            </Link>
            {user && (
              <Link to="/profile" className="text-white hover:text-luxury-red transition">
                My List
              </Link>
            )}
          </div>

          {/* Search & User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-luxury-red w-64"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="ml-2 text-white hover:text-luxury-red"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-white hover:text-luxury-red transition"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-white hover:text-luxury-gold transition"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user.displayName || user.email}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-luxury-red transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-luxury-red hover:bg-luxury-gold text-white px-6 py-2 rounded-full transition glow-red"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-luxury-red"
              />
            </form>
            <Link to="/" className="block text-white hover:text-luxury-red transition">
              Home
            </Link>
            <Link to="/?filter=trending" className="block text-white hover:text-luxury-red transition">
              Trending
            </Link>
            <Link to="/?filter=top-rated" className="block text-white hover:text-luxury-red transition">
              Top Rated
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="block text-white hover:text-luxury-red transition">
                  My List
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-white hover:text-luxury-red transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block bg-luxury-red hover:bg-luxury-gold text-white px-6 py-2 rounded-full transition text-center"
              >
                Sign In
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
