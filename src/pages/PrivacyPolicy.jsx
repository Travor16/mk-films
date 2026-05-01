// src/pages/PrivacyPolicy.jsx
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', paddingTop: '100px', paddingLeft: '40px', paddingRight: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Privacy Policy</h1>
      <p style={{ color: '#888', marginBottom: '30px' }}>Last updated: May 1, 2026</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>1. Information We Collect</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>LUXFLIX collects information you provide directly to us, such as when you create an account, save your watchlist, or contact us. This may include your name, email address, and preferences.</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>2. Automatically Collected Information</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>When you visit LUXFLIX, we automatically collect certain information about your device, browsing actions, and patterns. This includes your IP address, browser type, and pages you visit.</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>3. Cookies and Tracking</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>We use cookies and similar tracking technologies to track activity on our site and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>4. How We Use Your Information</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>We use the information we collect to:</p>
      <ul style={{ color: '#ccc', lineHeight: '1.6', marginLeft: '20px' }}>
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Develop new products, services, features, and functionality</li>
        <li>Communicate with you about updates and promotions</li>
      </ul>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>5. Third-Party Services</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>We use TMDB API for movie data. TMDB's privacy policy applies to their service. We also use Google AdSense for advertising. Google's privacy policy applies to their advertising services.</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>6. Data Security</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>We implement appropriate technical and organizational measures to protect your personal information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>7. Your Rights</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data.</p>

      <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>8. Contact Us</h2>
      <p style={{ lineHeight: '1.6', color: '#ccc' }}>If you have questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@luxflix.com" style={{ color: '#00ff00' }}>privacy@luxflix.com</a></p>

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #333', textAlign: 'center', color: '#666' }}>
        <p>© 2026 LUXFLIX. All rights reserved.</p>
        <p style={{ fontSize: '12px' }}>Movie data provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
