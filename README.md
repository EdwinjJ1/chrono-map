# Chrono-Map: Stories of Place

Use one map to understand the story behind every place.

An interactive web application for exploring the layered stories behind places through time, starting with Sydney and designed to expand globally.

## Project Overview

Chrono-Map is a production-grade Next.js application that combines map-based exploration, visual comparison, and editorial storytelling into a place-discovery experience. Users can move from a map view to a story view in a few taps, compare historical and modern imagery, and understand why a location matters.

The current editorial layer starts with Sydney, but the product is being built as a global system for place-based storytelling. The data model, bilingual UX, and content structure are intended to scale beyond a single city.

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

- **Interactive 3D Map**: Explore story-rich places with Mapbox GL, featuring 3D buildings and custom markers
- **Location Categories**: Historical sites, film locations, cultural venues, heritage buildings, nature, and food
- **Then & Now Comparison**: Slider component to compare historical and modern photographs
- **Bilingual Experience**: English and Chinese content supported through localized routes and messages
- **Responsive Design**: Mobile-first approach with glass morphism UI effects
- **Editorial Pages**: Static pages for about, business, contact, and legal information
- **AI Planner Preview**: Early product direction for itinerary and route planning

## Project Structure

```
080-chrono-map/
├── public/
│   └── images/
│       └── locations/        # Location photographs
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── map/page.tsx      # Interactive map page
│   │   │   ├── ai-planner/page.tsx
│   │   │   └── [slug]/page.tsx   # Static content pages
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
│       ├── locations.ts      # Core location data and types
│       ├── locations-zh.ts   # Chinese localization layer
│       └── site-pages.ts     # Static content page copy
├── .env.local                # Environment variables
└── package.json
```

## Product Positioning

- **Core promise**: Use one map to understand the story behind every place.
- **Current scope**: Sydney is the first content layer and proof of concept.
- **Long-term direction**: Expand to more cities, more place types, and more route-based experiences.
- **Primary audiences**: Travelers, citywalk users, film-location fans, students, and cultural institutions.

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
| `/{locale}` | Localized landing page |
| `/{locale}/map` | Interactive map with search and filters |
| `/{locale}/ai-planner` | AI planner preview page |
| `/{locale}/[slug]` | Static content pages such as about, business, and contact |

## Location Data Model

```typescript
interface Location {
  id: number;
  name: string;
  nameZh?: string;
  type: "historical" | "film" | "cultural" | "heritage" | "nature" | "restaurant";
  year: string;
  coordinates: { lat: number; lng: number };
  description: string;
  descriptionZh?: string;
  fullDescription: string;
  fullDescriptionZh?: string;
  historicalImage?: string;
  modernImage?: string;
  facts: string[];
  factsZh?: string[];
  relatedFilms?: string[];
  address: string;
  addressZh?: string;
  visitInfo?: {
    hours?: string;
    hoursZh?: string;
    admission?: string;
    admissionZh?: string;
    website?: string;
  };
}
```

## Content Model

- Each location combines coordinates, concise summary copy, deeper narrative context, facts, imagery, and visitor information.
- English content is the base layer, with Chinese localization provided for key fields and UI copy.
- The editorial pattern is designed to support future route pages, QR plaque experiences, and city-by-city expansion.

## Development Progress

### Completed
- [x] Project setup with Next.js 16 and TypeScript
- [x] Landing page with Hero, Features, and CTA sections
- [x] Interactive Mapbox GL map with 3D buildings
- [x] Custom color-coded markers by location type
- [x] Localized static pages with dynamic slug routing
- [x] Then & Now image comparison slider
- [x] Search and filter functionality
- [x] Mobile-responsive design
- [x] Glass morphism UI effects
- [x] Real location images from Unsplash
- [x] English and Chinese localization support
- [x] Static documentation pages for brand, business, and legal content

### In Progress
- [ ] Historical images for Then & Now comparison
- [ ] QR code generation for physical plaques
- [ ] Walking tour routes
- [ ] Better growth infrastructure such as analytics, sharing, and sitemap support

### Planned
- [ ] Shareable route generation
- [ ] Expanded city coverage beyond Sydney
- [ ] AR overlay features
- [ ] Optional bookmarks or saved places
- [ ] Offline PWA support
- [ ] Additional language support beyond English and Chinese

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
- Historical information sourced from location-specific heritage, archival, tourism, and cultural references

## Contact

For questions or feedback, please open an issue on GitHub.
