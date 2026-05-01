// src/pages/MovieDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    // First try to load from local movies file (VJ Mode)
    fetch('/movies_local.json')
      .then(res => {
        if (!res.ok) throw new Error('Local movies not found');
        return res.json();
      })
      .then(data => {
        const found = data.find(m => m.id == id || m.id === id);
        if (found) {
          setMovie(found);
          // Use proxy URL to add correct referer header
          const proxyUrl = `/api/proxy?url=${encodeURIComponent(found.stream_url)}`;
          setVideoUrl(proxyUrl);
          setLoading(false);
        } else {
          // If not found in local, try global movies
          return fetch('/movies.json');
        }
      })
      .catch(() => {
        // Fallback to global movies
        fetch('/movies.json')
          .then(res => res.json())
          .then(data => {
            const found = data.find(m => m.id == id || m.tmdb_id == id);
            if (found) {
              setMovie(found);
              // For global movies, use VidSrc
              const imdbId = found.imdb_id;
              const streamUrl = imdbId ? `https://vidsrc.me/embed/movie/${imdbId}` : null;
              setVideoUrl(streamUrl);
              setLoading(false);
            } else {
              setLoading(false);
            }
          })
          .catch(err => {
            console.error('Error loading movies:', err);
            setLoading(false);
          });
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', textAlign: 'center' }}>
        <p>Loading movie...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', textAlign: 'center' }}>
        <h1>Movie not found</h1>
        <button 
          onClick={() => navigate('/')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#e50914',
            border: 'none',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Go Home
        </button>
      </div>
    );
  }

  // For VJ Mode movies (local), use iframe with proxy
  if (videoUrl && videoUrl.includes('/api/proxy')) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh' }}>
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
        <video
          controls
          autoPlay
          style={{ width: '100%', height: '100vh', objectFit: 'contain' }}
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // For Global Mode movies (VidSrc)
  if (videoUrl && videoUrl.includes('vidsrc.me')) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh' }}>
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
        <iframe
          src={videoUrl}
          style={{ width: '100%', height: '100vh', border: 'none' }}
          allowFullScreen
          allow="autoplay; fullscreen"
        />
      </div>
    );
  }

  // Fallback: show movie info
  const posterUrl = movie.poster_url || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null);
  
  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', paddingLeft: '40px', paddingRight: '40px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'gray',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Back
      </button>
      
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {posterUrl && (
          <img
            src={posterUrl}
            alt={movie.title}
            style={{ width: '300px', borderRadius: '12px' }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>{movie.title}</h1>
          <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '16px' }}>{movie.overview}</p>
          <p style={{ color: '#888' }}>Release: {movie.release_date || 'Unknown'}</p>
          {movie.rating && <p style={{ color: '#888' }}>Rating: ⭐ {movie.rating}/10</p>}
          {movie.language && <p style={{ color: '#ff9900' }}>Language: {movie.language}</p>}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
