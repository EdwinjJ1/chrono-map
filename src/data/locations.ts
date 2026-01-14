export interface Location {
  id: number;
  name: string;
  nameZh?: string;
  type: "historical" | "film" | "cultural" | "heritage";
  year: string;
  coordinates: {
    lat: number;
    lng: number;
  };
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

export const locations: Location[] = [
  {
    id: 1,
    name: "The Rocks",
    nameZh: "岩石区",
    type: "historical",
    year: "1788",
    coordinates: {
      lat: -33.8599,
      lng: 151.2090,
    },
    description: "Sydney's oldest neighborhood, where the first European settlers landed.",
    fullDescription: "The Rocks is Sydney's oldest urban area, established by the First Fleet in 1788. This historic precinct was home to convicts, soldiers, and sailors in the early colonial days. Today, it's a charming blend of cobblestone laneways, heritage buildings, and vibrant weekend markets. The area nearly faced demolition in the 1970s but was saved by resident protests and union green bans.",
    modernImage: "/images/locations/the-rocks.jpg",
    facts: [
      "First European settlement in Australia (1788)",
      "Survived the Bubonic Plague outbreak of 1900",
      "Saved from demolition by the Green Bans movement in 1971",
      "Home to Australia's oldest surviving residential building",
    ],
    address: "The Rocks, Sydney NSW 2000",
    visitInfo: {
      hours: "Open 24/7 (markets on weekends)",
      admission: "Free",
      website: "https://www.therocks.com",
    },
  },
  {
    id: 2,
    name: "Martin Place",
    nameZh: "马丁广场",
    type: "film",
    year: "1999",
    coordinates: {
      lat: -33.8678,
      lng: 151.2107,
    },
    description: "The iconic 'Woman in Red' scene from The Matrix was filmed here.",
    fullDescription: "Martin Place is Sydney's civic heart, a grand pedestrian mall stretching from George Street to Macquarie Street. In 1999, it became immortalized in cinema when the Wachowskis filmed the famous 'Woman in Red' scene from The Matrix here. Neo walks through the crowded plaza, distracted by a mysterious woman, before being confronted with the truth about reality.",
    modernImage: "/images/locations/martin-place.jpg",
    facts: [
      "The Matrix's 'Woman in Red' scene filmed in 1998",
      "Sydney's premier civic space since 1891",
      "Hosts the Cenotaph war memorial",
      "Annual Christmas tree lighting tradition since 1930s",
    ],
    relatedFilms: ["The Matrix (1999)", "Superman Returns (2006)"],
    address: "Martin Place, Sydney NSW 2000",
    visitInfo: {
      hours: "Open 24/7",
      admission: "Free",
    },
  },
  {
    id: 3,
    name: "Queen Victoria Building",
    nameZh: "维多利亚女王大厦",
    type: "heritage",
    year: "1898",
    coordinates: {
      lat: -33.8718,
      lng: 151.2065,
    },
    description: "A Romanesque Revival masterpiece, once nearly demolished.",
    fullDescription: "The Queen Victoria Building (QVB) is a late 19th-century heritage-listed building that occupies an entire city block. Designed by architect George McRae in Romanesque Revival style, it opened in 1898 during a depression and was built to provide work for unemployed craftsmen. The building fell into disrepair and faced demolition multiple times, but was restored in the 1980s and is now considered one of the world's most beautiful shopping centers.",
    modernImage: "/images/locations/qvb.jpg",
    facts: [
      "Built during an economic depression to provide jobs",
      "Nearly demolished for a parking lot in the 1960s",
      "Features the Royal Clock designed by Neil Glasser",
      "Pierre Cardin called it 'the most beautiful shopping centre in the world'",
    ],
    address: "455 George St, Sydney NSW 2000",
    visitInfo: {
      hours: "9am - 6pm daily (varies)",
      admission: "Free",
      website: "https://www.qvb.com.au",
    },
  },
  {
    id: 4,
    name: "Sydney Opera House",
    nameZh: "悉尼歌剧院",
    type: "cultural",
    year: "1973",
    coordinates: {
      lat: -33.8568,
      lng: 151.2153,
    },
    description: "Jørn Utzon's controversial masterpiece that became a world icon.",
    fullDescription: "The Sydney Opera House is one of the 20th century's most famous and distinctive buildings. Danish architect Jørn Utzon won an international design competition in 1957, but construction challenges and political disputes led to his resignation in 1966 before its completion. Utzon never saw the finished building in person. It was designated a UNESCO World Heritage Site in 2007, and Utzon received the Pritzker Prize in 2003.",
    modernImage: "/images/locations/opera-house.jpg",
    facts: [
      "Architect Jørn Utzon never saw the completed building",
      "Construction took 16 years (1957-1973)",
      "Originally estimated at $7 million, final cost was $102 million",
      "The 'shells' are covered in over 1 million Swedish tiles",
      "UNESCO World Heritage Site since 2007",
    ],
    relatedFilms: ["Mission: Impossible 2 (2000)", "Finding Nemo (2003)"],
    address: "Bennelong Point, Sydney NSW 2000",
    visitInfo: {
      hours: "Guided tours daily 9am - 5pm",
      admission: "Tours from $43 AUD",
      website: "https://www.sydneyoperahouse.com",
    },
  },
  {
    id: 5,
    name: "Circular Quay",
    nameZh: "环形码头",
    type: "historical",
    year: "1844",
    coordinates: {
      lat: -33.8612,
      lng: 151.2110,
    },
    description: "The historic ferry terminal and gateway to Sydney Harbour.",
    fullDescription: "Circular Quay has been Sydney's main ferry hub since the 1840s. Originally known as Semi-Circular Quay, it was the landing point for the First Fleet in 1788. Today it serves as a major transport hub and tourist precinct, connecting the city to the Opera House, The Rocks, and harbour destinations. The quay has witnessed countless historic arrivals and departures over nearly two centuries.",
    modernImage: "/images/locations/circular-quay.jpg",
    facts: [
      "Original name was 'Semi-Circular Quay'",
      "Site of the First Fleet landing in 1788",
      "Ferries have operated here since 1844",
      "Underground train station opened in 1956",
    ],
    address: "Circular Quay, Sydney NSW 2000",
    visitInfo: {
      hours: "Open 24/7",
      admission: "Free",
    },
  },
];

export const locationTypes = {
  historical: {
    label: "Historical",
    color: "#1E3A5F",
    icon: "landmark",
  },
  film: {
    label: "Film Location",
    color: "#D4AF37",
    icon: "film",
  },
  cultural: {
    label: "Cultural",
    color: "#2D5A8A",
    icon: "palette",
  },
  heritage: {
    label: "Heritage",
    color: "#8B5A2B",
    icon: "building",
  },
};

export function getLocationById(id: number): Location | undefined {
  return locations.find((loc) => loc.id === id);
}

export function getLocationsByType(type: Location["type"]): Location[] {
  return locations.filter((loc) => loc.type === type);
}
