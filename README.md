# Chrono-Map: Sydney Layers

An interactive web application for exploring Sydney's historical landmarks, film locations, and cultural heritage sites through time.

## Project Overview

Chrono-Map is a production-grade Next.js application that combines cutting-edge web technologies with rich historical content to create an immersive time-traveling experience. Users can explore Sydney's heritage through an interactive 3D map, compare historical and modern photographs, and discover the stories behind iconic locations.

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js | 16.1.1 |
| **Language** | TypeScript | ^5 |
| **UI Library** | React | 19.2.3 |
| **Styling** | Tailwind CSS | ^4 |
| **Map Library** | Mapbox GL | ^3.17.0 |
| **Animations** | Framer Motion | ^12.26.2 |
| **Icons** | Lucide React | ^0.562.0 |

## Features

- **Interactive 3D Map**: Explore Sydney CBD with Mapbox GL, featuring 3D buildings and custom markers
- **Location Categories**: Historical sites, Film locations, Cultural venues, Heritage buildings
- **Then & Now Comparison**: Slider component to compare historical and modern photographs
- **Responsive Design**: Mobile-first approach with glass morphism UI effects
- **Dynamic Routing**: Individual location detail pages with rich content

## Project Structure

```
080-chrono-map/
├── public/
│   └── images/
│       └── locations/        # Location photographs
├── src/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── map/
│   │   │   └── page.tsx      # Interactive map page
│   │   └── location/
│   │       └── [id]/         # Dynamic location detail pages
│   ├── components/
│   │   ├── MapView.tsx       # Mapbox GL map component
│   │   ├── LocationCard.tsx  # Slide-out location panel
│   │   ├── TimelineCompare.tsx # Then/Now image slider
│   │   ├── FeaturedLocations.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── CallToAction.tsx
│   └── data/
│       └── locations.ts      # Location data and types
├── .env.local                # Environment variables
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Mapbox account (for API token)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 080-chrono-map
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Mapbox token:
```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Yes | Mapbox GL API token |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics ID |

## API Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, and featured locations |
| `/map` | Interactive Mapbox map with search and filter |
| `/location/[id]` | Individual location detail page |

## Location Data Model

```typescript
interface Location {
  id: number;
  name: string;
  nameZh?: string;              // Chinese name
  type: "historical" | "film" | "cultural" | "heritage";
  year: string;
  coordinates: { lat: number; lng: number };
  description: string;
  fullDescription: string;
  historicalImage?: string;
  modernImage?: string;
  facts: string[];
  relatedFilms?: string[];
  address: string;
  visitInfo?: {
    hours?: string;
    admission?: string;
    website?: string;
  };
}
```

## Development Progress

### Completed
- [x] Project setup with Next.js 16 and TypeScript
- [x] Landing page with Hero, Features, and CTA sections
- [x] Interactive Mapbox GL map with 3D buildings
- [x] Custom color-coded markers by location type
- [x] Location detail pages with dynamic routing
- [x] Then & Now image comparison slider
- [x] Search and filter functionality
- [x] Mobile-responsive design
- [x] Glass morphism UI effects
- [x] Real location images from Unsplash

### In Progress
- [ ] Historical images for Then & Now comparison
- [ ] QR code generation for physical plaques
- [ ] Walking tour routes

### Planned
- [ ] User authentication
- [ ] Bookmarking favorite locations
- [ ] AR overlay features
- [ ] Offline PWA support
- [ ] Multi-language support (Chinese/English)

## Design System

### Color Palette
- **Primary**: `#1E3A5F` (Deep Navy)
- **Accent**: `#D4AF37` (Antique Gold)
- **Background**: `#FAF8F5` (Warm White)
- **Foreground**: `#1A1A1A`

### Typography
- **Serif**: Playfair Display (headings)
- **Sans**: Inter (body text)

### Location Type Colors
- Historical: `#1E3A5F` (Navy)
- Film Location: `#D4AF37` (Gold)
- Cultural: `#2D5A8A` (Blue)
- Heritage: `#8B5A2B` (Brown)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Location images from [Unsplash](https://unsplash.com)
- Map data from [Mapbox](https://www.mapbox.com) and [OpenStreetMap](https://www.openstreetmap.org)
- Historical information from various Sydney heritage resources

## Contact

For questions or feedback, please open an issue on GitHub.
