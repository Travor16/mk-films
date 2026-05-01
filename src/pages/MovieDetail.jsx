// src/pages/MovieDetail.jsx - EMERGENCY FIX
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    console.log('=== EMERGENCY FIX VERSION ===');
    console.log('Looking for ID:', id);
    
    // Load local movies
    fetch('/movies_local.json')
      .then(res => res.json())
      .then(data => {
        console.log('Loaded', data.length, 'movies');
        console.log('First movie ID:', data[0]?.id);
        
        // Find by strict string comparison
        const found = data.find(m => String(m.id) === String(id));
        
        if (found) {
          console.log('FOUND:', found.title);
          setMovie(found);
          setVideoUrl(`/api/proxy?url=${encodeURIComponent(found.stream_url)}`);
        } else {
          console.log('NOT FOUND. Available IDs:', data.slice(0,5).map(m => String(m.id)));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!movie) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', textAlign: 'center' }}>
        <h1>Movie not found</h1>
        <p>ID: {id}</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', background: '#e50914', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh' }}>
      <button onClick={() => navigate(-1)} style={{ position: 'fixed', top: '20px', left: '20px', zIndex: 1000, background: 'black', color: 'white', border: '1px solid white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>← Back</button>
      <video controls autoPlay style={{ width: '100%', height: '100vh', objectFit: 'contain' }} src={videoUrl}>Your browser does not support the video tag.</video>
    </div>
  );
}

export default MovieDetail;
