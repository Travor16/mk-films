// src/services/movieService.js
const API_KEY = "11c7afa54f9f90ed933c7450e5ebbd11";
const TMDB_BASE = "https://api.themoviedb.org/3";

// Load local movies from public folder
export async function loadLocalMovies() {
  const response = await fetch('/movies.json');
  return response.json();
}

// Search TMDB for additional movies
export async function searchTMDB(query) {
  const response = await fetch(
    `${TMDB_BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  return response.json();
}

// Get streaming URL from IMDB ID
export function getStreamUrl(imdbId) {
  return `https://vidsrc.me/embed/movie/${imdbId}`;
}

// Get poster URL
export function getPosterUrl(path) {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
}

export default { loadLocalMovies, searchTMDB, getStreamUrl, getPosterUrl };
