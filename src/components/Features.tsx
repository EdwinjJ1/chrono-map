"use client";

import { useTranslations } from 'next-intl';
import { motion } from "framer-motion";
import { MapPin, Clock, Film, QrCode, Smartphone, Compass } from "lucide-react";


const iconMap = {
  MapPin,
  Clock,
  Film,
  QrCode,
  Smartphone,
  Compass,
};

const featureKeys = [
  { key: 'interactiveHeritageMap', icon: 'MapPin', color: "from-primary to-primary-light" },
  { key: 'thenNowComparison', icon: 'Clock', color: "from-accent to-accent-light" },
  { key: 'filmLocationTours', icon: 'Film', color: "from-primary-light to-accent" },
  { key: 'qrCodePlaques', icon: 'QrCode', color: "from-accent to-primary" },
  { key: 'mobileFirstExperience', icon: 'Smartphone', color: "from-primary to-accent" },
  { key: 'curatedWalkingTours', icon: 'Compass', color: "from-accent-light to-primary-light" },
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function Features() {
  const t = useTranslations('features');

  return (
    <section id="features" className="py-24 bg-background-alt relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {t('headline')}
          </h2>
          <p className="text-lg text-muted">
            {t('description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {featureKeys.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={feature.key}
                variants={itemVariants}
                className="group relative glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-muted leading-relaxed">
                  {t(`${feature.key}.description`)}
                </p>

                {/* Hover Accent */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/20 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
