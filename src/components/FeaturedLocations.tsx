"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { locations } from "@/data/locations";
import { getLocalizedLocation } from "@/data/locations-zh";

export default function FeaturedLocations() {
  const locale = useLocale();
  const t = useTranslations('featuredLocations');
  const tTypes = useTranslations('locationTypes');
  const featuredLocations = useMemo(() => {
    return locations
      .filter((location) => location.id >= 1 && location.id <= 4)
      .map((location) => getLocalizedLocation(location, locale));
  }, [locale]);

  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent-dark text-sm font-medium mb-4">
              {t('badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              {t('title')}
            </h2>
          </div>
          <Link
            href={`/${locale}/map`}
            className="group inline-flex items-center gap-2 text-primary font-medium hover:text-primary-light transition-colors cursor-pointer"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Location Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/${locale}/map`} className="block group cursor-pointer">
                <div className="relative h-80 rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <Image
                    src={location.modernImage || location.historicalImage || ""}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Fallback Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-dark/90 opacity-30" />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                        {tTypes(location.type)}
                      </span>
                    </div>

                    {/* Year */}
                    <div className="absolute top-4 right-4">
                      <span className="text-white/60 text-sm font-medium">
                        {location.year}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-serif font-semibold text-white mb-2 group-hover:text-accent-light transition-colors">
                      {location.name}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {location.description}
                    </p>

                    {/* Hover Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-white/0 group-hover:text-white transition-all duration-300">
                      <span className="text-sm font-medium">{t('explore')}</span>
                      <ArrowRight className="w-4 h-4 -translate-x-2 group-hover:translate-x-0 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/50 transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
