"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Film,
  ExternalLink,
  Share2,
  Navigation,
  ChevronRight,
  Bookmark,
  Info,
} from "lucide-react";
import { Location, locationTypes, locations } from "@/data/locations";
import TimelineCompare from "@/components/TimelineCompare";

interface LocationDetailClientProps {
  location: Location;
}

export default function LocationDetailClient({ location }: LocationDetailClientProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const typeInfo = locationTypes[location.type];

  // Get related locations (same type, excluding current)
  const relatedLocations = locations
    .filter((loc) => loc.type === location.type && loc.id !== location.id)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: location.name,
        text: location.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div
        className="relative h-[50vh] min-h-[400px]"
        style={{
          background: `linear-gradient(135deg, ${typeInfo.color}ee, ${typeInfo.color}99)`,
        }}
      >
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/map"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Map</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 rounded-full backdrop-blur-sm transition-colors cursor-pointer ${
                    isBookmarked
                      ? "bg-accent text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors cursor-pointer"
                  aria-label="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full pb-8 pt-20 bg-gradient-to-t from-black/60 to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Type Badge */}
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-sm font-medium mb-4"
                  style={{ backgroundColor: typeInfo.color }}
                >
                  {typeInfo.label}
                </span>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-2">
                  {location.name}
                </h1>

                {/* Chinese Name */}
                {location.nameZh && (
                  <p className="text-xl text-white/70 mb-4">{location.nameZh}</p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Est. {location.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{location.address}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                About This Location
              </h2>
              <p className="text-lg text-muted leading-relaxed">
                {location.fullDescription}
              </p>
            </motion.section>

            {/* Timeline Compare */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TimelineCompare
                historicalImage={location.historicalImage}
                modernImage={location.modernImage}
                historicalYear={location.year}
                locationName={location.name}
              />
            </motion.section>

            {/* Facts */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="flex items-center gap-2 text-2xl font-serif font-semibold text-foreground mb-6">
                <Info className="w-6 h-6 text-primary" />
                Did You Know?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {location.facts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-background-alt"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-muted">{fact}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Film References */}
            {location.relatedFilms && location.relatedFilms.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="flex items-center gap-2 text-2xl font-serif font-semibold text-foreground mb-6">
                  <Film className="w-6 h-6 text-accent" />
                  Featured In
                </h2>
                <div className="flex flex-wrap gap-3">
                  {location.relatedFilms.map((film) => (
                    <span
                      key={film}
                      className="px-5 py-3 rounded-xl bg-accent/10 text-accent-dark font-medium border border-accent/20"
                    >
                      {film}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl p-6 sticky top-24"
            >
              <h3 className="text-lg font-serif font-semibold text-foreground mb-4">
                Plan Your Visit
              </h3>

              {/* Visit Info */}
              {location.visitInfo && (
                <div className="space-y-3 mb-6">
                  {location.visitInfo.hours && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Hours</p>
                        <p className="text-sm text-muted">{location.visitInfo.hours}</p>
                      </div>
                    </div>
                  )}
                  {location.visitInfo.admission && (
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Admission</p>
                        <p className="text-sm text-muted">{location.visitInfo.admission}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleGetDirections}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-light transition-colors cursor-pointer"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </button>

                {location.visitInfo?.website && (
                  <a
                    href={location.visitInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 border border-border text-foreground font-medium rounded-xl hover:bg-background-alt transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Official Website
                  </a>
                )}
              </div>

              {/* Map Preview */}
              <div className="mt-6 h-40 rounded-xl overflow-hidden bg-background-alt flex items-center justify-center">
                <div className="text-center text-muted">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Map Preview</p>
                  <p className="text-xs">
                    {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Locations */}
        {relatedLocations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-semibold text-foreground">
                Similar Locations
              </h2>
              <Link
                href="/map"
                className="flex items-center gap-1 text-primary hover:text-primary-light transition-colors cursor-pointer"
              >
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedLocations.map((loc) => {
                const locTypeInfo = locationTypes[loc.type];
                return (
                  <Link
                    key={loc.id}
                    href={`/location/${loc.id}`}
                    className="group glass rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <div
                      className="h-32"
                      style={{
                        background: `linear-gradient(135deg, ${locTypeInfo.color}dd, ${locTypeInfo.color}99)`,
                      }}
                    >
                      <div className="p-4">
                        <span className="px-2 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                          {locTypeInfo.label}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                        {loc.name}
                      </h3>
                      <p className="text-sm text-muted line-clamp-2 mt-1">
                        {loc.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-primary-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Ready to Explore More?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Discover all the hidden stories of Sydney. From colonial heritage to modern landmarks,
            every corner has a tale to tell.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary-dark font-semibold rounded-xl hover:bg-accent-light transition-colors cursor-pointer"
            >
              <MapPin className="w-5 h-5" />
              Explore the Map
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
