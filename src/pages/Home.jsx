import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [globalMovies, setGlobalMovies] = useState([]);
  const [localMovies, setLocalMovies] = useState([]);
  const [library, setLibrary] = useState('global');
  const [loading, setLoading] = useState(true);
  const [detecting, setDetecting] = useState(true);

  // Step 1: Load both movie databases
  useEffect(() => {
    Promise.all([
      fetch('/movies.json').then(res => res.json()),
      fetch('/movies_local.json').then(res => res.json())
    ])
      .then(([global, local]) => {
        setGlobalMovies(global);
        setLocalMovies(local);
      })
      .catch(err => console.error('Error loading movies:', err));
  }, []);

  // Step 2: Detect IP and set default library (only once, no saved preference)
  useEffect(() => {
    // Check if user manually chose before
    const savedLibrary = localStorage.getItem('luxflix_library');
    
    if (savedLibrary) {
      // User has a saved preference - respect it
      setLibrary(savedLibrary);
      setDetecting(false);
      setLoading(false);
      return;
    }
    
    // No saved preference - detect IP
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const isUganda = data.country_code === 'UG';
        const defaultMode = isUganda ? 'local' : 'global';
        setLibrary(defaultMode);
        localStorage.setItem('luxflix_library', defaultMode);
        setDetecting(false);
        setLoading(false);
      })
      .catch(() => {
        // If IP detection fails, default to global
        setLibrary('global');
        localStorage.setItem('luxflix_library', 'global');
        setDetecting(false);
        setLoading(false);
      });
  }, []);

  // Step 3: Manual switch function
  const switchLibrary = (mode) => {
    setLibrary(mode);
    localStorage.setItem('luxflix_library', mode);
  };

  // Step 4: Show loading state while detecting
  if (loading || detecting) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', textAlign: 'center' }}>
        <p>Detecting your location...</p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>This helps us show you relevant content</p>
      </div>
    );
  }

  // Step 5: Select which movies to show
  const currentMovies = library === 'global' ? globalMovies : localMovies;
  const currentTitle = library === 'global' ? '🌍 Global Cinema' : '🎬 Luganda / Runyankole Movies';
  const currentColor = library === 'global' ? '#e50914' : '#ff9900';

  // Step 6: Show empty state if no movies
  if (currentMovies.length === 0) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', paddingLeft: '40px', paddingRight: '40px', textAlign: 'center' }}>
        <h1>LUXFLIX</h1>
        <p style={{ color: 'red' }}>No movies available in this library yet.</p>
        <button onClick={() => switchLibrary('global')} style={{ marginTop: '20px', padding: '10px 20px', background: '#e50914', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>Switch to Global Cinema</button>
      </div>
    );
  }

  // Step 7: Render the page
  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', paddingLeft: '40px', paddingRight: '40px' }}>
      
      {/* Library Toggle Buttons */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => switchLibrary('global')}
          style={{
            padding: '10px 30px',
            borderRadius: '40px',
            fontWeight: 'bold',
            fontSize: '16px',
            background: library === 'global' ? '#e50914' : '#333',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          🌍 Global Cinema
        </button>
        <button
          onClick={() => switchLibrary('local')}
          style={{
            padding: '10px 30px',
            borderRadius: '40px',
            fontWeight: 'bold',
            fontSize: '16px',
            background: library === 'local' ? '#ff9900' : '#333',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          🎬 Luganda / Runyankole
        </button>
      </div>

      {/* Library Title */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', color: currentColor }}>{currentTitle}</h2>
        <p style={{ color: '#888', fontSize: '14px' }}>
          {library === 'global' 
            ? 'Hollywood blockbusters and international hits' 
            : 'Local Ugandan movies in Luganda and Runyankole'}
        </p>
      </div>

      {/* Movie Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
        gap: '24px' 
      }}>
        {currentMovies.slice(0, 100).map((movie, index) => {
          const posterUrl = movie.poster_url || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null);
          const streamUrl = movie.stream_url || (movie.imdb_id ? `https://vidsrc.me/embed/movie/${movie.imdb_id}` : null);
          
          return (
            <Link 
              to={`/movie/${movie.id || movie.tmdb_id}`} 
              key={movie.id || movie.tmdb_id || index} 
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    style={{ width: '100%', borderRadius: '8px', aspectRatio: '2/3', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '2/3', borderRadius: '8px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    No poster
                  </div>
                )}
                <p style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '14px' }}>{movie.title}</p>
                <p style={{ fontSize: '12px', color: '#888' }}>
                  {library === 'local' ? movie.language || 'Luganda' : (movie.release_date?.split('-')[0] || '2025')}
                </p>
                {library === 'local' && (
                  <p style={{ fontSize: '11px', color: '#ff9900', marginTop: '4px' }}>🎬 Full Movie</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer Message */}
      <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', color: '#555', borderTop: '1px solid #222' }}>
        {library === 'global' 
          ? `Showing ${Math.min(100, currentMovies.length)} of ${currentMovies.length} international movies`
          : `Showing ${Math.min(100, currentMovies.length)} of ${currentMovies.length} local Luganda/Runyankole movies`
        }
        <p style={{ fontSize: '12px', marginTop: '8px' }}>
          {library === 'global' 
            ? '🌍 You can switch to Luganda movies anytime using the button above' 
            : '🎬 You can switch to Global Cinema anytime using the button above'
          }
        </p>
      </div>
    </div>
  );
}

export default Home;
