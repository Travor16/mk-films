import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import PrivacyPolicy from './pages/PrivacyPolicy'
import About from './pages/About'

function App() {
  const [library, setLibrary] = useState('global')

  useEffect(() => {
    const saved = localStorage.getItem('luxflix_library')
    if (saved) {
      setLibrary(saved)
    }
  }, [])

  const handleSwitchLibrary = (mode) => {
    setLibrary(mode)
    localStorage.setItem('luxflix_library', mode)
  }

  return (
    <Router>
      <div className="min-h-screen bg-luxury-black">
        <Navbar library={library} onSwitchLibrary={handleSwitchLibrary} />
        <Routes>
          <Route path="/" element={<Home library={library} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
