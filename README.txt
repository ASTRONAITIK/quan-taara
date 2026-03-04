# Quan-Taara — Deploy Guide

## Files
- index.html   → your website
- api/chat.js  → backend (hides the API key)
- vercel.json  → Vercel config

## Steps (10 minutes, free)

### 1. Get a free Groq API key
- Go to console.groq.com
- Sign up with email (no card, no age check)
- Click API Keys → Create API Key
- Copy the key (starts with gsk_...)

### 2. Upload to GitHub
- Go to github.com → New repository → name it "quan-taara"
- Upload all 3 files (index.html, api/chat.js, vercel.json)
- Click "Commit changes"

### 3. Deploy on Vercel
- Go to vercel.com → Sign up with GitHub (free)
- Click "Add New Project"
- Import your "quan-taara" repo
- Click "Environment Variables" → Add:
    Name:  GROQ_API_KEY
    Value: (paste your gsk_... key here)
- Click Deploy

### 4. Done!
- Vercel gives you a live URL like: quan-taara.vercel.app
- Share it with anyone — no key needed, just works!
- Every time you update files on GitHub, Vercel auto-deploys
