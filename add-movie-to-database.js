#!/usr/bin/env node

/**
 * Add Movie to Database Tool
 * Simple CLI tool to add movies to your JSON database
 * 
 * Usage: node add-movie-to-database.js
 */

import fs from 'fs';
import readline from 'readline';

const DATABASE_FILE = 'src/data/movies-database.json';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function addMovie() {
  console.log('\n🎬 Add Movie to Database\n');
  
  const id = await question('Movie ID (e.g., 2640): ');
  const title = await question('Title: ');
  const year = await question('Year: ');
  const description = await question('Description: ');
  const posterUrl = await question('Poster URL: ');
  const videoUrl = await question('Video URL: ');
  const category = await question('Category (default: Translated): ') || 'Translated';
  const quality = await question('Quality (default: HD): ') || 'HD';
  
  const movie = {
    id,
    title,
    year,
    description,
    poster_url: posterUrl,
    video_url: videoUrl,
    category,
    quality
  };
  
  // Load existing database
  let database = { movies: [] };
  if (fs.existsSync(DATABASE_FILE)) {
    const content = fs.readFileSync(DATABASE_FILE, 'utf8');
    database = JSON.parse(content);
  }
  
  // Add new movie
  database.movies.push(movie);
  
  // Save database
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(database, null, 2));
  
  console.log('\n✅ Movie added successfully!');
  console.log(`📊 Total movies in database: ${database.movies.length}`);
  
  const addAnother = await question('\nAdd another movie? (y/n): ');
  if (addAnother.toLowerCase() === 'y') {
    await addMovie();
  } else {
    console.log('\n🎉 Done! Restart your dev server to see changes.');
    rl.close();
  }
}

addMovie();
