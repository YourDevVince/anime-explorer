# Anime Explorer

Anime Explorer is a React app that lets you search for anime using the Jikan API (MyAnimeList). Results display in a card grid, you can favorite anime (saved to localStorage), and click any card to view details in a modal.

## Live Demo

- deployed link here: https://yourdevvince.github.io/anime-explorer/

## Features

- Search anime via the Jikan API
- Displays results as cards (shows 3 at a time)
- "More" button loads 3 additional results per click until all are shown
- Favorites system (add or remove) persisted in localStorage
- Favorites page to view saved anime
- Modal with image, title, synopsis, and favorite button
- Loading state (preloader) while fetching
- Error handling with a user-friendly message
- Empty state when nothing is found

## Tech Stack

- React
- React Router
- JavaScript (vanilla fetch)
- CSS
- Jikan API (MyAnimeList)

## API Used

This project uses the Jikan REST API:

- Base URL: `https://api.jikan.moe/v4`
- Search endpoint: `GET /anime?q=<query>&limit=<limit>&page=<page>`

## User Flow

- App renders `Header`, `Main`, and `Footer`
- After searching:
  - shows a preloader while fetching
  - shows only 3 results initially
  - click "More" to show 3 more
- Click the heart icon to favorite an anime
- Favorites are stored in localStorage (id, title, image, synopsis)
- Click a card to open a modal with details and a favorite button
- Navigate to `/favorites` to view saved anime with active heart state

### Installation

```bash
git clone https://github.com/YourDevVince/anime-explorer.git
cd ANIME-EXPLORER
npm install
```

### Run Locally

```bash
npm run dev
```
