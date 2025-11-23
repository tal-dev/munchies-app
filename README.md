# Munchies

A restaurant discovery app.

## Stack

- **Next.js 14+** (App Router) - Full-stack framework
- **TypeScript** - Type safety
- **React** - UI library
- **Tailwind CSS** - Styling

## Architecture

The app uses Next.js API routes as a proxy layer between the frontend and the external restaurant API. All API calls go through our backend proxy, which implements:

- **In-memory caching** with 5-minute TTL to reduce external API calls
- **Graceful degradation** - serves stale cache if external API fails
- **Simple error handling** with user-friendly messages

The frontend is mobile-first with a responsive desktop layout.

## Running Locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Splash screen with brand identity
- Restaurant listing with real-time open/closed status
- Filtering by food category, delivery time, and price range
- Responsive design (mobile and desktop layouts)
- Client-side and server-side filtering
- Loading and error states

## Caching Behavior

API responses are cached in-memory for 5 minutes. If the external API is down but we have cached data (even expired), we'll serve it to keep the app functional. Cache keys are based on the request method and path.
