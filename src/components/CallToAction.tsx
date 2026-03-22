"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import CountUp from "@/components/effects/CountUp";

export default function CallToAction() {
  const t = useTranslations('cta');
  const locale = useLocale();

  const numericStats = [
    { value: 50, suffix: "+", label: t('historicLocations'), delay: 0.4 },
    { value: 200, suffix: "+", label: t('yearsOfHistory'), delay: 0.6 },
    { value: 15, suffix: "+", label: t('filmLocations'), delay: 0.8 },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Premium dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e14] via-[#111927] to-[#0d1520]" />

      {/* Subtle warm accent glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary-light/[0.05] rounded-full blur-[100px]" />

      {/* Fine dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      {/* Top gradient fade for smooth transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-[1]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] mb-6 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white/80">
              {t('badge')}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            {t('headline1')}
            <br />
            <span className="text-accent">{t('headline2')}</span>
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-white/50 max-w-2xl mx-auto mb-10"
          >
            {t('description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={`/${locale}/map`}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary-dark font-semibold rounded-2xl hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/10 hover:shadow-accent/20 cursor-pointer"
            >
              <MapPin className="w-5 h-5" />
              {t('exploreTheMap')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/10 text-white font-semibold rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              {t('learnHowItWorks')}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16 pt-10 border-t border-white/[0.06]"
          >
            {numericStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-accent">
                  <CountUp
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                    delay={stat.delay}
                  />
                </div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="text-3xl sm:text-4xl font-serif font-bold text-accent"
              >
                {t('freeLabel')}
              </motion.div>
              <div className="text-sm text-white/40 mt-1">{t('toExplore')}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
