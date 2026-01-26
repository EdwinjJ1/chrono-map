"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, Film, ExternalLink, ChevronRight, History, Camera } from "lucide-react";
import { Location, locationTypes } from "@/data/locations";

interface LocationCardProps {
  location: Location | null;
  onClose: () => void;
  isOpen: boolean;
}

export default function LocationCard({ location, onClose, isOpen }: LocationCardProps) {
  const [showHistorical, setShowHistorical] = useState(false);

  if (!location) return null;

  const typeInfo = locationTypes[location.type];
  const hasImage = location.modernImage || location.historicalImage;
  const hasBothImages = location.modernImage && location.historicalImage;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 lg:right-4 lg:top-24 lg:bottom-4 lg:rounded-2xl overflow-hidden"
          >
            <div className="h-full glass flex flex-col shadow-2xl lg:rounded-2xl">
              {/* Header Image/Gradient */}
              <div
                className="relative h-48 sm:h-56 flex-shrink-0 overflow-hidden"
                style={{
                  background: !hasImage ? `linear-gradient(135deg, ${typeInfo.color}dd, ${typeInfo.color}99)` : undefined,
                }}
              >
                {/* Image Display */}
                {hasImage && (
                  <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={showHistorical ? "historical" : "modern"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={showHistorical && location.historicalImage ? location.historicalImage : (location.modernImage || location.historicalImage || "")}
                          alt={`${showHistorical ? "Historical" : "Modern"} ${location.name}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        {/* Overlay gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Historical/Modern Toggle */}
                    {hasBothImages && (
                      <div className="absolute top-14 left-4 z-10">
                        <button
                          onClick={() => setShowHistorical(!showHistorical)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-sm font-medium hover:bg-black/60 transition-colors cursor-pointer"
                        >
                          {showHistorical ? (
                            <>
                              <Camera className="w-4 h-4" />
                              <span>View Modern</span>
                            </>
                          ) : (
                            <>
                              <History className="w-4 h-4" />
                              <span>View Historical</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Image label */}
                    {hasBothImages && (
                      <div className="absolute top-14 right-4 z-10">
                        <span className="px-2 py-1 rounded bg-black/40 backdrop-blur-sm text-white text-xs">
                          {showHistorical ? "Historical" : "Present Day"}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors cursor-pointer z-10"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                    {typeInfo.label}
                  </span>
                </div>

                {/* Year Badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Est. {location.year}</span>
                </div>

                {/* Location Name */}
                <div className="absolute bottom-4 right-4 left-4 text-right">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow-lg">
                    {location.name}
                  </h2>
                  {location.nameZh && (
                    <p className="text-white/70 text-sm mt-1">{location.nameZh}</p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Description */}
                <p className="text-foreground leading-relaxed mb-6">
                  {location.fullDescription}
                </p>

                {/* Address */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-background-alt mb-4">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{location.address}</p>
                    {location.visitInfo?.hours && (
                      <p className="text-xs text-muted mt-1">{location.visitInfo.hours}</p>
                    )}
                  </div>
                </div>

                {/* Film References */}
                {location.relatedFilms && location.relatedFilms.length > 0 && (
                  <div className="mb-6">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                      <Film className="w-4 h-4 text-accent" />
                      Featured In
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {location.relatedFilms.map((film) => (
                        <span
                          key={film}
                          className="px-3 py-1.5 rounded-full bg-accent/10 text-accent-dark text-sm"
                        >
                          {film}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Facts */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Did You Know?
                  </h3>
                  <ul className="space-y-3">
                    {location.facts.map((fact, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-sm text-muted">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visit Info */}
                {location.visitInfo && (
                  <div className="p-4 rounded-xl border border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                      Visitor Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      {location.visitInfo.admission && (
                        <div className="flex justify-between">
                          <span className="text-muted">Admission</span>
                          <span className="text-foreground font-medium">
                            {location.visitInfo.admission}
                          </span>
                        </div>
                      )}
                      {location.visitInfo.website && (
                        <a
                          href={location.visitInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between text-primary hover:text-primary-light transition-colors cursor-pointer"
                        >
                          <span>Official Website</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex-shrink-0 p-4 border-t border-border">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-light transition-colors cursor-pointer">
                  Get Directions
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
