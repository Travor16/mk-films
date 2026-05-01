import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Admin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localMovies, setLocalMovies] = useState([]);
  const [globalMovies, setGlobalMovies] = useState([]);
  const [activeTab, setActiveTab] = useState('local');
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    language: 'Luganda',
    overview: '',
    release_date: '',
    poster_url: '',
    stream_url: '',
    rating: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === 'travormicheal7@gmail.com') {
        setUser(currentUser);
        loadMovies();
      } else {
        navigate('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const loadMovies = async () => {
    try {
      const localRes = await fetch('/movies_local.json');
      const localData = await localRes.json();
      setLocalMovies(localData);
      
      const globalRes = await fetch('/movies.json');
      const globalData = await globalRes.json();
      setGlobalMovies(globalData);
    } catch (err) {
      console.error('Error loading movies:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.stream_url) {
      setMessage({ text: 'Title and Stream URL are required', type: 'error' });
      return;
    }

    const newMovie = {
      id: isEditing ? editingId : `local_${Date.now()}`,
      title: formData.title,
      language: formData.language,
      overview: formData.overview || 'No description available',
      release_date: formData.release_date || new Date().toISOString().split('T')[0],
      poster_url: formData.poster_url || 'https://via.placeholder.com/300x450?text=No+Poster',
      stream_url: formData.stream_url,
      rating: parseFloat(formData.rating) || 5.0
    };

    let updatedMovies;
    if (isEditing) {
      updatedMovies = localMovies.map(m => m.id === editingId ? newMovie : m);
    } else {
      updatedMovies = [newMovie, ...localMovies];
    }

    setLocalMovies(updatedMovies);
    downloadJSON(updatedMovies);
    
    setMessage({ text: isEditing ? 'Movie updated successfully' : 'Movie added successfully', type: 'success' });
    resetForm();
    
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const downloadJSON = (movies) => {
    const dataStr = JSON.stringify(movies, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movies_local.json';
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ text: 'JSON file downloaded. Upload to /public folder.', type: 'success' });
  };

  const editMovie = (movie) => {
    setFormData({
      id: movie.id,
      title: movie.title,
      language: movie.language || 'Luganda',
      overview: movie.overview || '',
      release_date: movie.release_date || '',
      poster_url: movie.poster_url || '',
      stream_url: movie.stream_url || '',
      rating: movie.rating || 0
    });
    setIsEditing(true);
    setEditingId(movie.id);
  };

  const deleteMovie = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      const updatedMovies = localMovies.filter(m => m.id !== id);
      setLocalMovies(updatedMovies);
      downloadJSON(updatedMovies);
      setMessage({ text: 'Movie deleted', type: 'success' });
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      language: 'Luganda',
      overview: '',
      release_date: '',
      poster_url: '',
      stream_url: '',
      rating: 0
    });
    setIsEditing(false);
    setEditingId(null);
  };

  if (loading) {
    return (
      <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '80px', paddingLeft: '40px', paddingRight: '40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Admin Panel</h1>
        <p style={{ color: '#888', marginBottom: '30px' }}>Manage VJ Mode movies (Luganda/Runyankole content)</p>

        {message.text && (
          <div style={{
            padding: '12px 20px',
            borderRadius: '8px',
            marginBottom: '20px',
            background: message.type === 'success' ? '#00ff0011' : '#ff000011',
            border: `1px solid ${message.type === 'success' ? '#00ff00' : '#ff0000'}`,
            color: message.type === 'success' ? '#00ff00' : '#ff0000'
          }}>
            {message.text}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #333' }}>
          <button
            onClick={() => setActiveTab('local')}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: 'none',
              color: activeTab === 'local' ? '#e50914' : '#888',
              borderBottom: activeTab === 'local' ? '2px solid #e50914' : 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            VJ Mode Movies (Local)
          </button>
          <button
            onClick={() => setActiveTab('global')}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: 'none',
              color: activeTab === 'global' ? '#e50914' : '#888',
              borderBottom: activeTab === 'global' ? '2px solid #e50914' : 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Global Movies (Read Only)
          </button>
        </div>

        {activeTab === 'local' ? (
          <>
            {/* Add/Edit Form */}
            <div style={{ background: '#111', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>{isEditing ? 'Edit Movie' : 'Add New VJ Movie'}</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                  <input
                    name="title"
                    placeholder="Movie Title*"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: 'white' }}
                    required
                  />
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: 'white' }}
                  >
                    <option value="Luganda">Luganda</option>
                    <option value="Runyankole">Runyankole</option>
                    <option value="English">English</option>
                  </select>
                  <input
                    name="stream_url"
                    placeholder="Stream URL* (Contabo/Dropbox)"
                    value={formData.stream_url}
                    onChange={handleInputChange}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: 'white' }}
                    required
                  />
                  <input
                    name="poster_url"
                    placeholder="Poster URL"
                    value={formData.poster_url}
                    onChange={handleInputChange}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: 'white' }}
                  />
                  <input
                    name="overview"
                    placeholder="Description"
                    value={formData.overview}
                    onChange={handleInputChange}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: 'white' }}
                  />
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    placeholder="Rating (0-10)"
                    value={formData.rating}
                    onChange={handleInputChange}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: 'white' }}
                  />
                  <input
                    name="release_date"
                    type="date"
                    placeholder="Release Date"
                    value={formData.release_date}
                    onChange={handleInputChange}
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #333', background: '#222', color: 'white' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button type="submit" style={{ padding: '10px 20px', background: '#e50914', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
                    {isEditing ? 'Update Movie' : 'Add Movie'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={resetForm} style={{ padding: '10px 20px', background: '#333', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Movies List */}
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>VJ Movies ({localMovies.length})</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {localMovies.map((movie) => (
                  <div key={movie.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#111', borderRadius: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <strong>{movie.title}</strong>
                      <span style={{ marginLeft: '10px', fontSize: '12px', color: '#ff9900' }}>{movie.language || 'Luganda'}</span>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>{movie.stream_url?.substring(0, 60)}...</div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => editMovie(movie)} style={{ padding: '5px 15px', background: '#444', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => deleteMovie(movie.id)} style={{ padding: '5px 15px', background: '#e50914', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '15px' }}>Global Movies ({globalMovies.length})</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Global movies are managed via TMDB API. Read only.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
              {globalMovies.slice(0, 50).map((movie) => (
                <div key={movie.id} style={{ padding: '10px', background: '#111', borderRadius: '8px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{movie.title}</p>
                  <p style={{ fontSize: '12px', color: '#666' }}>{movie.release_date?.split('-')[0]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '30px', padding: '15px', background: '#111', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#666' }}>
            Instructions: After adding/editing/deleting movies, a JSON file will download. 
            Upload this file to your /public folder as 'movies_local.json' and redeploy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
