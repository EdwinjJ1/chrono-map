"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Clock, Film, Compass, ChevronRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const stats = [
    { value: "50+", label: t('historicSites') },
    { value: "100+", label: t('yearsOfHistory') },
    { value: "10+", label: t('filmLocations') },
  ];

  const features = [
    { icon: MapPin, label: t('historicalLandmarks'), color: "text-primary" },
    { icon: Film, label: t('filmTVLocations'), color: "text-accent" },
    { icon: Clock, label: t('thenNowComparison'), color: "text-primary-light" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center aurora-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent-dark">
                {t('badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
              {t('headline1')}{" "}
              <span className="gradient-text">{t('headline2')}</span>
              <br />
              {t('headline3')}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto lg:mx-0 mb-8">
              {t('subheadline')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href={`/${locale}/map`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary-light transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                {t('startExploring')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-foreground font-semibold rounded-2xl hover:bg-white/90 transition-all duration-300 cursor-pointer"
              >
                {t('learnMore')}
              </Link>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-3xl font-serif font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative glass rounded-3xl p-6 shadow-2xl">
              {/* Map Preview Image Placeholder */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/10 mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary/40 mx-auto mb-4" />
                    <p className="text-muted text-sm">{t('interactiveMapPreview')}</p>
                  </div>
                </div>
                {/* Floating Location Pins */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 left-1/4 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg"
                >
                  <MapPin className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-1/2 right-1/3 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg"
                >
                  <Film className="w-4 h-4 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-1/3 right-1/4 w-9 h-9 bg-primary-light rounded-full flex items-center justify-center shadow-lg"
                >
                  <Clock className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* Feature List */}
              <div className="space-y-3">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/50 hover:bg-background transition-colors cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-background flex items-center justify-center ${feature.color}`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-foreground">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
