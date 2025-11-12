# Movie Watchlist

A movie search and watchlist application built with vanilla JavaScript, using the OMDB API.

## Features

- 🔍 Search for movies using OMDB API
- ⭐ View movie ratings, runtime, genre, and plot
- ➕ Add movies to your watchlist
- ➖ Remove movies from your watchlist
- 💾 Persistent storage using localStorage
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd movie-watchlist
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This project is configured for automatic deployment to Netlify using GitHub Actions.

### Setup Netlify Deployment

1. Create a new site on Netlify
2. Get your `NETLIFY_AUTH_TOKEN` from Netlify User Settings > Applications
3. Get your `NETLIFY_SITE_ID` from Site Settings > General > Site details
4. Add these as secrets in your GitHub repository:
   - Go to Settings > Secrets and variables > Actions
   - Add `NETLIFY_AUTH_TOKEN`
   - Add `NETLIFY_SITE_ID`

5. Push to the `main` branch to trigger automatic deployment

## Project Structure

```
movie-watchlist/
├── index.html          # Main search page
├── watchlist.html      # Watchlist page
├── index.js            # Search page logic
├── watchlist.js        # Watchlist page logic
├── index.css           # Styles
├── images/             # Image assets
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies
```

## Technologies Used

- HTML5
- CSS3 (Flexbox, Custom Scrollbars)
- JavaScript (ES6+)
- Vite (Build tool)
- OMDB API
- Font Awesome (Icons)
- Google Fonts (Inter)

## API

This project uses the [OMDB API](http://www.omdbapi.com/) for movie data.

## License

MIT
