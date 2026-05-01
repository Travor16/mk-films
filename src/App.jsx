import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
  return (
    <Router>
      <div className="min-h-screen bg-luxury-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
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
