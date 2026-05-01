// src/pages/About.jsx
import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', paddingLeft: '40px', paddingRight: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>About LUXFLIX</h1>
      <p style={{ color: '#888', marginBottom: '30px' }}>Your premium destination for streaming movies</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Our Mission</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>LUXFLIX was created to provide movie lovers with a simple, elegant way to discover and watch their favorite films. We believe everyone should have access to quality entertainment without complicated subscriptions or hidden fees.</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>What We Offer</h2>
      <ul style={{ color: '#ccc', lineHeight: '1.6', marginLeft: '20px' }}>
        <li>1,000+ popular movies instantly available</li>
        <li>HD quality streaming</li>
        <li>Easy-to-use interface with Netflix-style navigation</li>
        <li>Personal watchlists (coming soon)</li>
        <li>Completely free to use (ad-supported)</li>
      </ul>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Our Data Source</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>LUXFLIX uses The Movie Database (TMDB) API for all movie information including titles, descriptions, posters, and ratings. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>How We Stay Free</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>LUXFLIX is supported by display advertisements. This allows us to keep the platform free for all users while covering our hosting and operational costs.</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>Contact</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>Questions or suggestions? Reach out to us at: <a href="mailto:info@luxflix.com" style={{ color: '#00ff00' }}>info@luxflix.com</a></p>

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #333', textAlign: 'center', color: '#666' }}>
        <p>© 2026 LUXFLIX. All rights reserved.</p>
        <p style={{ fontSize: '12px' }}>Movie data provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </div>
    </div>
  );
}

export default About;
