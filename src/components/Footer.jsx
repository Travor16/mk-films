import { Film, Mail, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-8 h-8 text-luxury-red" />
              <span className="text-2xl font-title font-bold text-luxury-gold">
                M&K FILMS
              </span>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Your premium destination for cinematic excellence. Stream the latest movies in stunning quality.
            </p>
            <div className="flex items-center space-x-2 text-white/40 text-xs">
              <Shield className="w-4 h-4" />
              <span>100% Free • No Credit Card Required</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <Link to="/" className="hover:text-luxury-red transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/?filter=trending" className="hover:text-luxury-red transition">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/?filter=top-rated" className="hover:text-luxury-red transition">
                  Top Rated
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-luxury-red transition">
                  My Watchlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="flex items-center space-x-2 text-white/60 text-sm">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@mkfilms.com" className="hover:text-luxury-red transition">
                contact@mkfilms.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} M&K FILMS. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Movie data provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  )
}
