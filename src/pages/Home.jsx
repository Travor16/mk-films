import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/movies.json')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '80px' }}>
        <p style={{ textAlign: 'center' }}>Loading movies...</p>
      </div>
    );
  }

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '80px', paddingLeft: '20px', paddingRight: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
        {movies.map((movie, index) => {
          const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;
          return (
            <Link to={`/movie/${movie.id}`} key={movie.id || index} style={{ textDecoration: 'none', color: 'white' }}>
              <div style={{ cursor: 'pointer' }}>
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
                <p style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{movie.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
