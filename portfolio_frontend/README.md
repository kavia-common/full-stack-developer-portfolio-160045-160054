# Portfolio Frontend (React SPA)

A modern, minimalistic single-page application for a developer portfolio.

## Features implemented

- Dark theme using provided palette:
  - primary: `#0D47A1`, secondary: `#1565C0`, accent: `#00B8D4`
- Sections:
  - About (Hero banner with objective)
  - Skills & Technologies (categorized grid)
  - Project Highlights (cards)
  - Experience Timeline (vertical timeline)
  - Contact (details + working form)
  - Resume Download
- Fixed top navigation with smooth scrolling and active state
- Responsive layout and subtle scroll-reveal transitions
- REST API integration for all content

## Configuration

Create a `.env` file at the project root (see `.env.example`):

```
REACT_APP_API_BASE_URL=https://your-backend.example.com
```

Leave `REACT_APP_API_BASE_URL` empty to use same-origin requests behind a reverse proxy in production.

## Scripts

- `npm start` - start dev server
- `npm test` - run tests
- `npm run build` - build for production

## Structure

- `src/services/api.js` - API client
- `src/hooks/useFetch.js` - minimal data-fetching hook
- `src/components/*` - UI components per section
- `src/App.js` / `src/App.css` - app shell and global styles
