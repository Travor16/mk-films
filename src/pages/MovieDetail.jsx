import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/movies.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(m => m.id == id);
        setMovie(found);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', padding: '20px' }}>
        <h1>Movie not found</h1>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const imdbId = movie.imdb_id || movie.imdbId;
  const streamUrl = imdbId ? `https://vidsrc.me/embed/movie/${imdbId}` : null;
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;
  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null;

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh' }}>
      {streamUrl ? (
        // Video player mode
        <div>
          <iframe
            src={streamUrl}
            style={{ width: '100%', height: '100vh', border: 'none' }}
            allowFullScreen
            allow="autoplay; fullscreen"
          />
          <button
            onClick={() => navigate(-1)}
            style={{
              position: 'fixed',
              top: '20px',
              left: '20px',
              zIndex: 1000,
              background: 'black',
              color: 'white',
              border: '1px solid white',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            ← Back
          </button>
        </div>
      ) : (
        // Info mode (no video URL available)
        <div>
          <div style={{ position: 'relative', height: '50vh', overflow: 'hidden' }}>
            {backdropUrl && (
              <img 
                src={backdropUrl}
                alt={movie.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.5' }}
              />
            )}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
              <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>{movie.title}</h1>
              <p style={{ fontSize: '16px', maxWidth: '600px' }}>{movie.overview}</p>
              <p style={{ marginTop: '10px' }}>⭐ {movie.vote_average} / 10</p>
              <p>{movie.release_date?.split('-')[0]}</p>
            </div>
          </div>

          <div style={{ padding: '20px' }}>
            <button 
              onClick={() => navigate(-1)}
              style={{ background: 'gray', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
            >
              ← Back
            </button>
            {!imdbId && <span style={{ color: 'red' }}>No video available for this movie</span>}
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
