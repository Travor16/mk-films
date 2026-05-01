import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Bell, User, LogOut, Menu, X } from 'lucide-react'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import useStore from '../store/useStore'

export default function Navbar({ library, onSwitchLibrary }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
        scrolled 
          ? 'bg-black/95 backdrop-blur-sm border-b border-white/10' 
          : 'bg-black/60 backdrop-blur-sm'
      }`}
    >
      <div className="px-4 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-16">
          {/* Logo */}
          <Link to="/" className="text-red-600 text-2xl md:text-3xl font-black tracking-tighter hover:text-red-500 transition">
            LUXFLIX
          </Link>
          
          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-300 text-sm transition">
              Home
            </Link>
            <Link to="/?filter=trending" className="text-white hover:text-gray-300 text-sm transition">
              Trending
            </Link>
            <Link to="/?filter=top-rated" className="text-white hover:text-gray-300 text-sm transition">
              Top Rated
            </Link>
            {user && (
              <Link to="/profile" className="text-white hover:text-gray-300 text-sm transition">
                My List
              </Link>
            )}
            
            {/* Mode Toggle - Subtle */}
            <button
              onClick={() => onSwitchLibrary(library === 'global' ? 'local' : 'global')}
              className="ml-4 text-xs text-gray-400 hover:text-white transition border-l border-gray-700 pl-4"
            >
              {library === 'global' ? 'Switch to VJ Mode' : 'Switch to Global Mode'}
            </button>
          </div>

          {/* User Controls - Right */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300 transition">
              <Search className="w-5 h-5" />
            </button>
            
            <button className="text-white hover:text-gray-300 transition hidden md:block">
              <Bell className="w-5 h-5" />
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-white">
                  <User className="w-6 h-6 rounded bg-gray-700 p-1" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-black/95 border border-gray-700 rounded-md shadow-lg hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-gray-800">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm transition"
              >
                Sign In
              </Link>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-3 border-t border-gray-800 bg-black/95"
          >
            <Link to="/" className="block text-white hover:text-red-600 transition py-1">
              Home
            </Link>
            <Link to="/?filter=trending" className="block text-white hover:text-red-600 transition py-1">
              Trending
            </Link>
            <Link to="/?filter=top-rated" className="block text-white hover:text-red-600 transition py-1">
              Top Rated
            </Link>
            {user && (
              <Link to="/profile" className="block text-white hover:text-red-600 transition py-1">
                My List
              </Link>
            )}
            
            {/* Mode Toggle in Mobile Menu */}
            <button
              onClick={() => {
                onSwitchLibrary(library === 'global' ? 'local' : 'global')
                setMobileMenuOpen(false)
              }}
              className="block w-full text-left text-gray-400 hover:text-white transition py-1 text-sm"
            >
              {library === 'global' ? 'Switch to VJ Mode' : 'Switch to Global Mode'}
            </button>
            
            <div className="pt-2 border-t border-gray-800">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-white hover:text-red-600 transition py-1"
                >
                  Sign Out
                </button>
              ) : (
                <Link to="/login" className="block bg-red-600 text-white px-4 py-2 rounded text-center">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
