# APOD Explorer

A senior-developer take-home exercise built with **Next.js App Router, TypeScript, React, and Tailwind CSS**. It integrates NASA's Astronomy Picture of the Day API and implements the requested 3x3 recent-APOD grid, detail pages, viewed history, and clear-history behavior.

## Features

- 3x3 responsive grid of the 9 most recent APODs.
- Detail route for each APOD: `/apod/YYYY-MM-DD`.
- Viewed items are highlighted and persisted in `localStorage`.
- Clear-history control.
- Server-side data fetching with hourly revalidation.
- Next.js Route Handler at `/api/apod` for API creation/demo consumption.
- Loading, error, and not-found states.
- Responsive, accessible UI with semantic links/buttons and image alt text.
- Image optimization configuration for NASA-hosted media.

## Architecture / interview discussion

### Component development

The UI is intentionally split by responsibility:

- `SiteHeader`: application chrome.
- `ApodGrid`: collection rendering.
- `ApodCard`: reusable APOD presentation component.
- `VisitHistoryProvider`: client-side state boundary.
- `HistoryControls`: stateful history action UI.
- `MarkViewed`: small client-side side-effect component used on the detail page.

This keeps server-only data fetching separate from browser-only state (`localStorage`).

### State management

The assessment only requires a small piece of client state: the dates a user has viewed. A React Context is used instead of Redux/Zustand because the state is local to this feature, has a simple lifecycle, and does not justify an additional dependency.

The provider persists state to `localStorage`, so returning to the home page—or refreshing the browser—retains viewed highlights. Clearing history removes both React state and persisted history.

### API creation and consumption

`lib/apod.ts` encapsulates the external NASA API integration. The Next.js Route Handler at `app/api/apod/route.ts` exposes:

- `GET /api/apod?count=9`
- `GET /api/apod?date=YYYY-MM-DD`

The route handler validates query parameters and returns appropriate HTTP status codes. The application pages consume the NASA API through the shared server-side data layer rather than making a server-to-own-API HTTP round trip.

This is intentional: Next.js recommends fetching external data directly from Server Components rather than creating an internal API call solely for the server to call itself. The Route Handler still provides a clean API boundary for external/client consumers and demonstrates API creation.

### Rendering strategy: Server-side rendering / server components

This implementation uses the Next.js App Router's **Server Components** for APOD data fetching. The home page fetches nine APODs on the server and revalidates the result every hour. The detail page fetches the requested date on the server.

Why this approach:

1. APOD content is public and useful for SEO/discoverability.
2. The initial HTML contains the actual APOD content instead of waiting for browser JavaScript to fetch it.
3. The NASA API key stays server-side.
4. Hourly revalidation avoids requesting NASA on every user visit while keeping the content fresh.
5. Only the interactive visit-history behavior needs client JavaScript.

#### CSR vs SSR vs ISR

**Client-side rendering (CSR):** the browser receives a shell and JavaScript fetches APOD data after load. This is straightforward for highly interactive/private dashboards, but it delays meaningful content and would expose the API interaction to the browser.

**Server-side rendering (SSR):** the server obtains data and renders HTML for a request. This gives strong initial content and keeps server-only credentials off the client, but request-time fetching can increase server work and latency.

**Incremental Static Regeneration (ISR):** pages can be statically generated/cached and periodically revalidated. This is especially attractive here because APOD data changes predictably and does not need to be generated uniquely for every visitor.

In this implementation, the App Router's server-side data fetching plus `revalidate: 3600` provides the practical ISR-style behavior: cached server-rendered content is refreshed hourly while users receive fast pre-rendered content.

## Run locally

Requirements: Node.js 20.9+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

The provided `DEMO_KEY` is sufficient for demonstrating the app, subject to NASA's API rate limits. For a production deployment, set `NASA_API_KEY` to a personal NASA API key in the hosting provider's environment variables.

## Production build

```bash
npm run build
npm start
```

## Vercel deployment

1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Add `NASA_API_KEY` as an Environment Variable.
4. Deploy.

The project is already structured for Vercel's Next.js runtime; no custom server is required.

## API examples

```text
GET /api/apod?count=9
GET /api/apod?date=2026-09-25
```

## NASA API note

The assessment specifies the legacy APOD API endpoint. NASA currently notes that this legacy APOD API is scheduled to be archived on December 1, 2026. For a production application, the API adapter in `lib/apod.ts` should be migrated to NASA's replacement APOD data source before that date. Keeping the NASA integration behind `lib/apod.ts` makes that migration localized.
