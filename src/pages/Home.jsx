import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home({ library }) {
  const [globalMovies, setGlobalMovies] = useState([]);
  const [localMovies, setLocalMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load both movie databases
  useEffect(() => {
    Promise.all([
      fetch('/movies.json').then(res => res.json()),
      fetch('/movies_local.json').then(res => res.json())
    ])
      .then(([global, local]) => {
        setGlobalMovies(global);
        setLocalMovies(local);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading movies:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  const currentMovies = library === 'global' ? globalMovies : localMovies;
  const isGlobal = library === 'global';

  if (currentMovies.length === 0) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', paddingLeft: '40px', paddingRight: '40px', textAlign: 'center' }}>
        <h1>LUXFLIX</h1>
        <p style={{ color: 'red' }}>No movies available.</p>
      </div>
    );
  }

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '80px', paddingLeft: '40px', paddingRight: '40px' }}>
      
      {/* Movie Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
        gap: '24px' 
      }}>
        {currentMovies.slice(0, 100).map((movie, index) => {
          const posterUrl = movie.poster_url || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null);
          
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
                  {isGlobal ? (movie.release_date?.split('-')[0] || '2025') : (movie.language || 'Luganda')}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', color: '#555', borderTop: '1px solid #222' }}>
        {isGlobal 
          ? `Showing ${Math.min(100, currentMovies.length)} of ${currentMovies.length} movies`
          : `Showing ${Math.min(100, currentMovies.length)} of ${currentMovies.length} local movies`
        }
      </div>
    </div>
  );
}

export default Home;
