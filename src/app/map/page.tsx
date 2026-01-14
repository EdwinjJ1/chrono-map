"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, List, Grid, MapPin } from "lucide-react";
import { locations, locationTypes, type Location } from "@/data/locations";
import LocationCard from "@/components/LocationCard";

// Dynamic import for MapView to avoid SSR issues with Mapbox
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-background-alt flex items-center justify-center rounded-2xl">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-muted">Loading map...</span>
      </div>
    </div>
  ),
});

type ViewMode = "map" | "list";
type FilterType = "all" | Location["type"];

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleLocationSelect = useCallback((location: Location) => {
    setSelectedLocation(location);
  }, []);

  const handleCloseCard = useCallback(() => {
    setSelectedLocation(null);
  }, []);

  const filteredLocations = locations.filter((loc) => {
    const matchesType = filterType === "all" || loc.type === filterType;
    const matchesSearch =
      searchQuery === "" ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Back Button */}
            <Link
              href="/"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Back</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-foreground placeholder:text-muted"
                />
              </div>
            </div>

            {/* View Toggle & Filter */}
            <div className="flex items-center gap-2">
              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  showFilters || filterType !== "all"
                    ? "bg-primary text-white border-primary"
                    : "bg-background border-border text-foreground hover:border-primary"
                }`}
                aria-label="Filter"
              >
                <Filter className="w-5 h-5" />
              </button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-2.5 transition-colors cursor-pointer ${
                    viewMode === "map"
                      ? "bg-primary text-white"
                      : "bg-background text-foreground hover:bg-background-alt"
                  }`}
                  aria-label="Map view"
                >
                  <MapPin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-primary text-white"
                      : "bg-background text-foreground hover:bg-background-alt"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pb-4"
            >
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    filterType === "all"
                      ? "bg-primary text-white"
                      : "bg-background-alt text-foreground hover:bg-border"
                  }`}
                >
                  All ({locations.length})
                </button>
                {Object.entries(locationTypes).map(([key, value]) => {
                  const count = locations.filter((l) => l.type === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setFilterType(key as Location["type"])}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                        filterType === key
                          ? "text-white"
                          : "bg-background-alt text-foreground hover:bg-border"
                      }`}
                      style={{
                        backgroundColor: filterType === key ? value.color : undefined,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: filterType === key ? "white" : value.color }}
                      />
                      {value.label} ({count})
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={`pt-16 ${showFilters ? "pt-28" : ""}`} style={{ height: '100vh' }}>
        {viewMode === "map" ? (
          /* Map View */
          <div className="h-full p-4" style={{ height: showFilters ? 'calc(100vh - 7rem)' : 'calc(100vh - 4rem)' }}>
            <MapView
              onLocationSelect={handleLocationSelect}
              selectedLocationId={selectedLocation?.id}
              className="h-full"
            />
          </div>
        ) : (
          /* List View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-serif font-bold text-foreground">
                Explore Locations
              </h1>
              <p className="text-muted">
                {filteredLocations.length} location{filteredLocations.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => {
                const typeInfo = locationTypes[location.type];
                return (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    onClick={() => handleLocationSelect(location)}
                    className="glass rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    {/* Header */}
                    <div
                      className="h-32 relative"
                      style={{
                        background: `linear-gradient(135deg, ${typeInfo.color}dd, ${typeInfo.color}99)`,
                      }}
                    >
                      <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                        {typeInfo.label}
                      </span>
                      <span className="absolute top-3 right-3 text-white/70 text-xs">
                        {location.year}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-serif font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {location.name}
                      </h3>
                      <p className="text-sm text-muted line-clamp-2">
                        {location.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredLocations.length === 0 && (
              <div className="text-center py-16">
                <Grid className="w-12 h-12 text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No locations found
                </h3>
                <p className="text-muted">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Location Detail Card */}
      <LocationCard
        location={selectedLocation}
        isOpen={selectedLocation !== null}
        onClose={handleCloseCard}
      />
    </div>
  );
}
