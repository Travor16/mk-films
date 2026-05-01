#!/usr/bin/env node

/**
 * Cloudinary Setup Verification Script
 * Run this to check if your Cloudinary is configured correctly
 * 
 * Usage: node verify-cloudinary.js
 */

import { config } from 'dotenv';
import { readFileSync } from 'fs';

// Load .env file
config();

console.log('\n🔍 Verifying Cloudinary Setup...\n');

// Check 1: .env file exists
try {
  readFileSync('.env', 'utf8');
  console.log('✅ .env file found');
} catch (error) {
  console.log('❌ .env file not found');
  console.log('   Create a .env file in the root directory');
  process.exit(1);
}

// Check 2: Cloud name is set
const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;

if (!cloudName) {
  console.log('❌ VITE_CLOUDINARY_CLOUD_NAME not set in .env');
  console.log('   Add this line to your .env file:');
  console.log('   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name');
  process.exit(1);
}

console.log(`✅ Cloud name configured: ${cloudName}`);

// Check 3: Test Cloudinary URL format
const testUrl = `https://res.cloudinary.com/${cloudName}/video/upload/movies/1771/1080p.mp4`;
console.log(`\n📹 Test video URL format:`);
console.log(`   ${testUrl}`);

// Check 4: Test if Cloudinary is reachable
console.log('\n🌐 Testing Cloudinary connection...');

fetch(`https://res.cloudinary.com/${cloudName}/image/upload/sample.jpg`)
  .then(response => {
    if (response.ok) {
      console.log('✅ Cloudinary is reachable');
      console.log('\n✨ Setup looks good!');
      console.log('\n📝 Next steps:');
      console.log('   1. Upload a test video to Cloudinary');
      console.log('   2. Folder structure: movies/1771/1080p.mp4');
      console.log('   3. Restart dev server: npm run dev');
      console.log('   4. Test at: http://localhost:5173/movie/1771');
      console.log('\n📚 See CLOUDINARY_UPLOAD_GUIDE.md for detailed instructions\n');
    } else {
      console.log('⚠️  Could not verify Cloudinary account');
      console.log('   Check if your cloud name is correct');
      console.log(`   Current cloud name: ${cloudName}`);
    }
  })
  .catch(error => {
    console.log('⚠️  Network error - check your internet connection');
    console.log(`   Error: ${error.message}`);
  });
