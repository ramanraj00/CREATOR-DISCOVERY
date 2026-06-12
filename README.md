# Creator Discovery — upstageX Frontend Intern Task

A creator discovery page where brands can search and filter creators for campaigns.

## Tech Stack
- Next.js 15 (App Router) · TypeScript · shadcn/ui · Tailwind CSS
- TanStack Query · react-hook-form + zod · lucide-react

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/creators](http://localhost:3000/creators)

## Features
- Search by keyword, filter by niche, platform, follower range, country
- Responsive creator card grid with avatar, name, niche badge, platform, followers, engagement rate
- Click a card → Sheet opens with full bio + audience breakdown
- Loading skeletons, empty state, error state
- Mock async API with fake delay via TanStack Query

## Decisions
- Data served from `/public/data/creators.json` fetched via TanStack Query with a 600ms fake delay to demonstrate loading states
- Filters wired client-side against fetched data
- Server component for page shell, client component for interactive filter + grid
