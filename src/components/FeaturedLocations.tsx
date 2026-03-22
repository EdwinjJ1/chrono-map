"use client";

import { useMemo, useState, useCallback, useRef } from "react";
import { useLocale, useTranslations } from 'next-intl';
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, MessageCircle, MapPin, Route, Send } from "lucide-react";
import { locations } from "@/data/locations";
import { getLocalizedLocation } from "@/data/locations-zh";

const cardTransforms = [
  { rotate: 5, x: -60 },
  { rotate: 2, x: -20 },
  { rotate: -2, x: 20 },
  { rotate: -5, x: 60 },
];

export default function FeaturedLocations() {
  const locale = useLocale();
  const t = useTranslations('featuredLocations');
  const tAi = useTranslations('aiPlanner');
  const tTypes = useTranslations('locationTypes');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const featuredLocations = useMemo(() => {
    return locations
      .filter((location) => location.id >= 1 && location.id <= 4)
      .map((location) => getLocalizedLocation(location, locale));
  }, [locale]);

  const getCardTransform = useCallback((index: number) => {
    const base = cardTransforms[index] ?? { rotate: 0, x: 0 };

    if (hoveredIndex === null) {
      return { rotate: base.rotate, x: base.x, scale: 1 };
    }

    if (index === hoveredIndex) {
      return { rotate: 0, x: base.x, scale: 1.08 };
    }

    const pushDirection = index < hoveredIndex ? -1 : 1;
    const distance = Math.abs(hoveredIndex - index);
    const pushAmount = (100 / distance) * pushDirection;

    return {
      rotate: base.rotate * 1.3,
      x: base.x + pushAmount,
      scale: 0.95,
    };
  }, [hoveredIndex]);

  const mockMessages = [
    { role: "user" as const, text: tAi('mockUser1') },
    { role: "ai" as const, text: tAi('mockAi1') },
    { role: "user" as const, text: tAi('mockUser2') },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
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

        {/* Two-Column Layout: BounceCards + AI Planner */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left - BounceCards */}
          <div>
            {/* Mobile Grid */}
            <div className="grid grid-cols-2 gap-4 lg:hidden">
              {featuredLocations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.08,
                  }}
                >
                  <Link href={`/${locale}/map`} className="block group cursor-pointer">
                    <div className="relative h-52 rounded-2xl overflow-hidden shadow-lg border-2 border-white/10">
                      <Image
                        src={location.modernImage || location.historicalImage || ""}
                        alt={location.name}
                        fill
                        className="object-cover"
                        sizes="50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <span className="self-start px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium mb-2">
                          {tTypes(location.type)}
                        </span>
                        <h3 className="text-sm font-serif font-semibold text-white leading-tight">
                          {location.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop BounceCards */}
            <div
              ref={containerRef}
              className="hidden lg:flex justify-center items-center relative"
              style={{ height: 420 }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {featuredLocations.map((location, index) => {
                const transform = getCardTransform(index);

                return (
                  <motion.div
                    key={location.id}
                    className="absolute cursor-pointer"
                    style={{ zIndex: hoveredIndex === index ? 10 : index }}
                    initial={{ scale: 0, rotate: cardTransforms[index]?.rotate ?? 0 }}
                    animate={isInView ? {
                      scale: transform.scale,
                      rotate: transform.rotate,
                      x: transform.x,
                    } : { scale: 0 }}
                    transition={
                      hoveredIndex !== null
                        ? { type: "spring", stiffness: 300, damping: 20 }
                        : {
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: index * 0.08,
                          }
                    }
                    onMouseEnter={() => setHoveredIndex(index)}
                  >
                    <Link href={`/${locale}/map`} className="block group">
                      <div className="relative w-52 h-80 rounded-2xl overflow-hidden shadow-2xl border-[3px] border-white/20 hover:border-accent/40 transition-colors duration-300">
                        <Image
                          src={location.modernImage || location.historicalImage || ""}
                          alt={location.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="208px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium">
                              {tTypes(location.type)}
                            </span>
                            <span className="text-white/60 text-xs font-medium">
                              {location.year}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-lg font-serif font-bold text-white mb-1 group-hover:text-accent-light transition-colors leading-tight">
                              {location.name}
                            </h3>
                            <p className="text-white/70 text-xs line-clamp-2 leading-relaxed">
                              {location.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right - AI Travel Planner */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative glass rounded-3xl p-6 shadow-2xl overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />

              {/* Header */}
              <div className="relative flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-foreground">
                    {tAi('title')}
                  </h3>
                  <p className="text-sm text-muted">{tAi('subtitle')}</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="ml-auto w-2 h-2 rounded-full bg-green-400"
                />
              </div>

              {/* Mock Chat Preview */}
              <div className="relative space-y-3 mb-6">
                {mockMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-background-alt text-foreground rounded-bl-md"
                    }`}>
                      {msg.role === "ai" && (
                        <Sparkles className="w-3 h-3 inline-block mr-1.5 text-accent opacity-70" />
                      )}
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-background-alt flex items-center gap-1">
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 rounded-full bg-muted"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-muted"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 rounded-full bg-muted"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { icon: Route, text: tAi('featureRoute') },
                  { icon: MapPin, text: tAi('featureSpots') },
                  { icon: MessageCircle, text: tAi('featureChat') },
                ].map((pill) => (
                  <span
                    key={pill.text}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent-dark text-xs font-medium"
                  >
                    <pill.icon className="w-3 h-3" />
                    {pill.text}
                  </span>
                ))}
              </div>

              {/* Mock Input */}
              <div className="flex items-center gap-2 p-2 rounded-2xl bg-background-alt border border-border">
                <div className="flex-1 px-3 py-2 text-sm text-muted">
                  {tAi('inputPlaceholder')}
                </div>
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={`/${locale}/ai-planner`}
                className="group flex items-center justify-center gap-2 w-full mt-4 px-6 py-3.5 bg-gradient-to-r from-accent to-accent-dark text-primary-dark font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                {tAi('cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
