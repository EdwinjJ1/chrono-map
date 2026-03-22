"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MapPin, Clock, Film, Compass, ChevronRight } from "lucide-react";
import LetterPullUp from "@/components/effects/LetterPullUp";
import GradientText from "@/components/effects/GradientText";
import CountUp from "@/components/effects/CountUp";

const LightRays = dynamic(() => import("@/components/effects/LightRays"), { ssr: false });

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const stats = [
    { value: 50, suffix: "+", label: t('historicSites') },
    { value: 100, suffix: "+", label: t('yearsOfHistory') },
    { value: 10, suffix: "+", label: t('filmLocations') },
  ];

  const features = [
    { icon: MapPin, label: t('historicalLandmarks'), color: "text-primary" },
    { icon: Film, label: t('filmTVLocations'), color: "text-accent" },
    { icon: Clock, label: t('thenNowComparison'), color: "text-primary-light" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060a10]">
      {/* LightRays Background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#d4af37"
          raysSpeed={1.5}
          lightSpread={0.6}
          rayLength={1.8}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={0.7}
        />
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-accent-light">
                {t('badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-[1.1] mb-6">
              <LetterPullUp
                text={t('headline1')}
                className="inline"
              />{" "}
              <GradientText
                text={t('headline2')}
                delay={0.3}
                from="var(--accent)"
                to="var(--accent-light)"
              />
              <br />
              <LetterPullUp
                text={t('headline3')}
                className="inline"
                delay={0.5}
              />
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-8"
            >
              {t('subheadline')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href={`/${locale}/map`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary-dark font-semibold rounded-2xl hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-accent/20 cursor-pointer"
              >
                <Compass className="w-5 h-5" />
                {t('startExploring')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 text-white font-semibold rounded-2xl hover:bg-white/5 backdrop-blur-sm transition-all duration-300 cursor-pointer"
              >
                {t('learnMore')}
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-3xl font-serif font-bold text-accent">
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                      delay={1.4 + index * 0.2}
                    />
                  </div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Map Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative rounded-3xl p-4 shadow-2xl bg-white/5 backdrop-blur-md border border-white/10">
              {/* Map Preview Screenshot */}
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden group">
                <Image
                  src="/images/map-preview.jpg"
                  alt={t('interactiveMapPreview')}
                  fill
                  className="object-cover object-left transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                {/* Floating Location Pins */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[20%] left-[15%] w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20"
                >
                  <MapPin className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-[45%] left-[40%] w-8 h-8 bg-accent/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20"
                >
                  <Film className="w-4 h-4 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[25%] right-[20%] w-9 h-9 bg-primary-light/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20"
                >
                  <Clock className="w-4 h-4 text-white" />
                </motion.div>

                {/* Shimmer */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12"
                />
              </div>

              {/* Feature List */}
              <div className="space-y-3 mt-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/item"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${feature.color} group-hover/item:scale-110 transition-transform`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-white/90">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/15 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/15 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
