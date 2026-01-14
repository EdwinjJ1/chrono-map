"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { locations, locationTypes, type Location } from "@/data/locations";

interface MapViewProps {
  onLocationSelect?: (location: Location) => void;
  selectedLocationId?: number | null;
  className?: string;
}

// Note: Replace with your own Mapbox token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1IjoiZGVtby1tYXBib3giLCJhIjoiY2x4eXp4eXh4MHh4eDJqcXh4eHh4eHh4eCJ9.demo";

export default function MapView({
  onLocationSelect,
  selectedLocationId,
  className = ""
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const createCustomMarker = useCallback((location: Location, isSelected: boolean) => {
    const el = document.createElement("div");
    const typeInfo = locationTypes[location.type];

    el.className = "custom-marker";
    el.innerHTML = `
      <div class="marker-container ${isSelected ? "selected" : ""}" style="--marker-color: ${typeInfo.color}">
        <div class="marker-pin">
          <div class="marker-icon">
            ${getIconSvg(location.type)}
          </div>
        </div>
        <div class="marker-pulse"></div>
      </div>
    `;

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
      .custom-marker {
        cursor: pointer;
      }
      .marker-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .marker-pin {
        width: 40px;
        height: 40px;
        background: var(--marker-color);
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
      }
      .marker-container:hover .marker-pin,
      .marker-container.selected .marker-pin {
        transform: rotate(-45deg) scale(1.1);
        box-shadow: 0 6px 20px rgba(0,0,0,0.4);
      }
      .marker-icon {
        transform: rotate(45deg);
        color: white;
        width: 20px;
        height: 20px;
      }
      .marker-icon svg {
        width: 100%;
        height: 100%;
      }
      .marker-pulse {
        position: absolute;
        bottom: -4px;
        width: 12px;
        height: 12px;
        background: var(--marker-color);
        border-radius: 50%;
        opacity: 0;
        animation: pulse 2s ease-out infinite;
      }
      .marker-container.selected .marker-pulse {
        animation: pulse 1.5s ease-out infinite;
      }
      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 0.6;
        }
        100% {
          transform: scale(3);
          opacity: 0;
        }
      }
    `;
    el.appendChild(style);

    return el;
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [151.2093, -33.8688], // Sydney CBD
      zoom: 14,
      pitch: 45,
      bearing: -17.6,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.current.on("load", () => {
      setMapLoaded(true);

      // Add 3D buildings layer
      const layers = map.current?.getStyle()?.layers;
      const labelLayerId = layers?.find(
        (layer) => layer.type === "symbol" && layer.layout?.["text-field"]
      )?.id;

      if (labelLayerId) {
        map.current?.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#ddd",
              "fill-extrusion-height": ["get", "height"],
              "fill-extrusion-base": ["get", "min_height"],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayerId
        );
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Add markers when map is loaded
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    // Add markers for each location
    locations.forEach((location) => {
      const isSelected = selectedLocationId === location.id;
      const el = createCustomMarker(location, isSelected);

      el.addEventListener("click", () => {
        onLocationSelect?.(location);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([location.coordinates.lng, location.coordinates.lat])
        .addTo(map.current!);

      markers.current.push(marker);
    });
  }, [mapLoaded, selectedLocationId, onLocationSelect, createCustomMarker]);

  // Fly to selected location
  useEffect(() => {
    if (!map.current || !selectedLocationId) return;

    const location = locations.find((loc) => loc.id === selectedLocationId);
    if (location) {
      map.current.flyTo({
        center: [location.coordinates.lng, location.coordinates.lat],
        zoom: 16,
        pitch: 60,
        duration: 1500,
      });
    }
  }, [selectedLocationId]);

  return (
    <div className={`relative w-full ${className}`} style={{ height: '100%', minHeight: '400px' }}>
      <div ref={mapContainer} className="w-full h-full rounded-2xl overflow-hidden" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 glass rounded-xl p-4 z-10">
        <h4 className="text-sm font-semibold text-foreground mb-3">Legend</h4>
        <div className="space-y-2">
          {Object.entries(locationTypes).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: value.color }}
              />
              <span className="text-xs text-muted">{value.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Loading overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted">Loading map...</span>
          </div>
        </div>
      )}
    </div>
  );
}

function getIconSvg(type: Location["type"]): string {
  const icons: Record<Location["type"], string> = {
    historical: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`,
    film: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>`,
    cultural: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072" /></svg>`,
    heritage: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>`,
  };
  return icons[type];
}
