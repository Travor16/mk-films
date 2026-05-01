// api/proxy.js
// This file creates a proxy to add the required Referer header for vjluga.com videos

export default async function handler(req, res) {
  // Get the video URL from the query parameter
  const { url } = req.query;
  
  // If no URL provided, return error
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }
  
  try {
    // Fetch the video with the correct Referer header
    const response = await fetch(url, {
      headers: {
        'Referer': 'https://vjluga.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    // If fetch fails, return error
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch video' });
    }
    
    // Get the video data as a buffer
    const buffer = await response.arrayBuffer();
    
    // Set correct headers for video playback
    res.setHeader('Content-Type', response.headers.get('content-type') || 'video/mp4');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    
    // Send the video data
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
