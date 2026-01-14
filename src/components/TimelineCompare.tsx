"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface TimelineCompareProps {
  historicalImage?: string;
  modernImage?: string;
  historicalYear: string;
  modernYear?: string;
  locationName: string;
}

export default function TimelineCompare({
  historicalImage,
  modernImage,
  historicalYear,
  modernYear = "Today",
  locationName,
}: TimelineCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  // Placeholder gradients when no images
  const historicalPlaceholder = "linear-gradient(135deg, #1E3A5F 0%, #0F1E33 100%)";
  const modernPlaceholder = "linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif font-semibold text-foreground">
          Then & Now
        </h3>
        <p className="text-sm text-muted">Drag to compare</p>
      </div>

      {/* Comparison Container */}
      <motion.div
        ref={containerRef}
        className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Modern Image (Background) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: modernImage ? `url(${modernImage})` : modernPlaceholder,
            background: !modernImage ? modernPlaceholder : undefined,
          }}
        >
          {!modernImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/60">
                <p className="text-sm font-medium">Modern View</p>
                <p className="text-xs">{modernYear}</p>
              </div>
            </div>
          )}
        </div>

        {/* Historical Image (Foreground with clip) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: historicalImage ? `url(${historicalImage})` : historicalPlaceholder,
            background: !historicalImage ? historicalPlaceholder : undefined,
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          {!historicalImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/60">
                <p className="text-sm font-medium">Historical View</p>
                <p className="text-xs">{historicalYear}</p>
              </div>
            </div>
          )}
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* Handle Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize">
            <div className="flex items-center gap-0.5">
              <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
              <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Year Labels */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-white text-sm font-medium">
          {historicalYear}
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-accent/90 backdrop-blur-sm text-white text-sm font-medium">
          {modernYear}
        </div>

        {/* Location Label */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
          {locationName}
        </div>
      </motion.div>

      {/* Timeline Slider */}
      <div className="mt-6">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="w-full h-2 bg-background-alt rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110"
        />
        <div className="flex justify-between mt-2 text-xs text-muted">
          <span>Past</span>
          <span>Present</span>
        </div>
      </div>
    </div>
  );
}
