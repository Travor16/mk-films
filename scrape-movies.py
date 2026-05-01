#!/usr/bin/env python3
"""
Movie Data Scraper
Extracts movie information and builds JSON database

Usage: python scrape-movies.py
"""

import json
import re
from pathlib import Path

# Your movie data goes here
# You can manually add movies or scrape from a source you have access to

movies_data = []

def add_movie(id, title, year, description, poster_url, video_url, category="Translated", quality="HD"):
    """Add a movie to the database"""
    movie = {
        "id": str(id),
        "title": title,
        "year": str(year),
        "description": description,
        "poster_url": poster_url,
        "video_url": video_url,
        "category": category,
        "quality": quality
    }
    movies_data.append(movie)
    print(f"✅ Added: {title} ({year})")

def extract_vj_name(filename):
    """Extract VJ name from filename"""
    vj_patterns = [
        r'VJ\s+JUNIOR',
        r'VJ\s+EMMY', 
        r'VJ\s+JINGO',
        r'VJ\s+KEVO',
        r'\bJR\b',
        r'\bJUNIOR\b'
    ]
    
    for pattern in vj_patterns:
        match = re.search(pattern, filename, re.IGNORECASE)
        if match:
            return match.group(0)
    return None

def parse_local_movies(folder_path):
    """Parse movies from your local Downloads folder"""
    import os
    
    if not os.path.exists(folder_path):
        print(f"❌ Folder not found: {folder_path}")
        return
    
    files = os.listdir(folder_path)
    video_files = [f for f in files if f.endswith(('.mkv', '.mp4', '.avi', '.mov'))]
    
    print(f"\n📁 Found {len(video_files)} video files in {folder_path}\n")
    
    for idx, filename in enumerate(video_files, start=1):
        # Extract movie info from filename
        clean_name = re.sub(r'\[.*?\]', '', filename)  # Remove [WWW.LABAFILM.COM]
        clean_name = re.sub(r'\.(mkv|mp4|avi|mov)$', '', clean_name, flags=re.IGNORECASE)
        
        vj_name = extract_vj_name(clean_name)
        title = re.sub(r'\b(VJ\s+\w+|JR|JUNIOR|EMMY|JINGO|KEVO)\b', '', clean_name, flags=re.IGNORECASE).strip()
        title = title.replace('_', ' ').strip()
        
        # Extract year if present
        year_match = re.search(r'\b(19|20)\d{2}\b', title)
        year = year_match.group(0) if year_match else "2024"
        
        # You'll need to upload these to Cloudinary or your storage
        # For now, we'll create placeholder URLs
        video_url = f"https://your-storage.com/movies/{filename}"
        
        add_movie(
            id=f"local-{idx}",
            title=title,
            year=year,
            description=f"{title} - Translated by {vj_name if vj_name else 'VJ'}",
            poster_url="https://via.placeholder.com/500x750?text=Movie+Poster",
            video_url=video_url,
            category="Translated",
            quality="HD"
        )

def save_database(output_file="src/data/movies-database.json"):
    """Save movies database to JSON file"""
    database = {"movies": movies_data}
    
    # Create directory if it doesn't exist
    Path(output_file).parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(database, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Database saved to: {output_file}")
    print(f"📊 Total movies: {len(movies_data)}")

def main():
    print("🎬 Movie Database Builder\n")
    
    # Example: Add movies manually
    add_movie(
        id="2640",
        title="The Gates",
        year="2026",
        description="The Gates (2026) follows friends trapped in a deadly gated community after witnessing a murder.",
        poster_url="https://lugandatranslatedmovies.com/path_to_poster.jpg",
        video_url="https://usc1.contabostorage.com/1d8a2252f28184ed5bba83bce6f3d1e90:films/THE_GATES_JR.mp4",
        category="Translated",
        quality="HD"
    )
    
    # Parse your local movies folder
    # Uncomment and update the path to your Downloads folder
    # parse_local_movies("C:\\Users\\J0SC0M\\Downloads")
    
    # Save to JSON file
    save_database()
    
    print("\n🎉 Done! Your movies database is ready.")
    print("\n📝 Next steps:")
    print("   1. Upload your video files to Cloudinary or storage")
    print("   2. Update video_url in the JSON file")
    print("   3. Restart your dev server: npm run dev")
    print("   4. Test your movies!")

if __name__ == "__main__":
    main()
