import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Settings, 
  SkipForward, SkipBack, Loader2 
} from 'lucide-react'

export default function VideoPlayer({ movieId, movieTitle, trailerKey, quality }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [loading, setLoading] = useState(true)
  const [selectedSubtitle, setSelectedSubtitle] = useState('off')
  const [selectedAudio, setSelectedAudio] = useState('original')

  // In production, you would fetch the actual video URL from your storage
  // For now, we'll use the YouTube trailer as a demo
  const videoUrl = trailerKey 
    ? `https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1`
    : null

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setLoading(false)
    }
  }

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (videoRef.current) {
      videoRef.current.volume = vol
    }
    setMuted(vol === 0)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      setMuted(!muted)
    }
  }

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // For YouTube embed (temporary solution)
  if (trailerKey) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-lg overflow-hidden border border-white/10"
      >
        <div className="bg-luxury-red/20 p-4 border-b border-white/10">
          <h3 className="text-white font-title text-xl">Now Playing: {movieTitle}</h3>
          <p className="text-white/60 text-sm mt-1">Quality: {quality}</p>
          <p className="text-luxury-gold text-xs mt-2">
            ℹ️ Demo Mode: Showing trailer. In production, this plays the full movie from your video storage.
          </p>
        </div>
        
        <div className="relative aspect-video bg-black">
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Quality & Audio Selector */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-2">Audio Track</label>
            <select
              value={selectedAudio}
              onChange={(e) => setSelectedAudio(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-red"
            >
              <option value="original">Original Audio</option>
              <option value="vj-junior">VJ Junior Dub</option>
              <option value="vj-emmy">VJ Emmy Dub</option>
            </select>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Subtitles</label>
            <select
              value={selectedSubtitle}
              onChange={(e) => setSelectedSubtitle(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-red"
            >
              <option value="off">Off</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </motion.div>
    )
  }

  // Custom HTML5 player (for when you have actual video files)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-lg overflow-hidden border border-white/10"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="bg-luxury-red/20 p-4 border-b border-white/10">
        <h3 className="text-white font-title text-xl">Now Playing: {movieTitle}</h3>
        <p className="text-white/60 text-sm mt-1">Quality: {quality}</p>
      </div>

      <div className="relative aspect-video bg-black group">
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={togglePlay}
        >
          <source src="/path-to-your-video.mp4" type="video/mp4" />
          <track kind="subtitles" src="/path-to-subtitles.vtt" srcLang="en" label="English" />
        </video>

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-luxury-red animate-spin" />
          </div>
        )}

        {/* Play/Pause Overlay */}
        {!playing && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="bg-luxury-red/80 hover:bg-luxury-red text-white p-6 rounded-full transition glow-red"
            >
              <Play className="w-12 h-12" fill="white" />
            </button>
          </div>
        )}

        {/* Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full mb-4 accent-luxury-red"
          />

          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="text-white hover:text-luxury-red transition">
                {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              <button onClick={() => skip(-10)} className="text-white hover:text-luxury-red transition">
                <SkipBack className="w-5 h-5" />
              </button>

              <button onClick={() => skip(10)} className="text-white hover:text-luxury-red transition">
                <SkipForward className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="text-white hover:text-luxury-red transition">
                  {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-luxury-red"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-luxury-red transition">
                <Settings className="w-5 h-5" />
              </button>

              <button onClick={toggleFullscreen} className="text-white hover:text-luxury-red transition">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-white/80 text-sm mb-2">Audio Track</label>
          <select
            value={selectedAudio}
            onChange={(e) => setSelectedAudio(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-red"
          >
            <option value="original">Original Audio</option>
            <option value="vj-junior">VJ Junior Dub</option>
            <option value="vj-emmy">VJ Emmy Dub</option>
          </select>
        </div>

        <div>
          <label className="block text-white/80 text-sm mb-2">Subtitles</label>
          <select
            value={selectedSubtitle}
            onChange={(e) => setSelectedSubtitle(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-luxury-red"
          >
            <option value="off">Off</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}
