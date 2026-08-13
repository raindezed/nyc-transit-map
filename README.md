# NYC Transit Explorer

A Vercel-ready Next.js interactive map for exploring selected New York City subway lines and major stations.

## Features
- Interactive OpenStreetMap/Leaflet map
- Subway line filters
- Station search by name or borough
- Major station markers and route polylines
- Responsive desktop/mobile layout
- MTA-inspired route colors

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
Import this folder into Vercel or run:
```bash
npx vercel
```

## Next step: live MTA data
The current MVP uses curated route/station geometry for a fast demo. Connect MTA GTFS and GTFS-Realtime feeds in a server-side route handler to add live arrivals, service alerts, and vehicle positions.
