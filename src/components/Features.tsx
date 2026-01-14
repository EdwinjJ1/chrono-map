"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Film, Compass, QrCode, Smartphone } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Interactive Heritage Map",
    description: "Explore Sydney's rich history through our beautifully designed interactive map. Each pin tells a unique story.",
    color: "from-primary to-primary-light",
  },
  {
    icon: Clock,
    title: "Then & Now Comparison",
    description: "Slide through time to see how locations have transformed over decades. Historical photos meet modern reality.",
    color: "from-accent to-accent-light",
  },
  {
    icon: Film,
    title: "Film Location Tours",
    description: "Discover where iconic movies like The Matrix were filmed. Walk in the footsteps of cinema history.",
    color: "from-primary-light to-accent",
  },
  {
    icon: QrCode,
    title: "QR Code Plaques",
    description: "Scan physical plaques at locations to instantly access rich historical content and AR experiences.",
    color: "from-accent to-primary",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Experience",
    description: "Designed for explorers on the go. Access stories, photos, and navigation right from your pocket.",
    color: "from-primary to-accent",
  },
  {
    icon: Compass,
    title: "Curated Walking Tours",
    description: "Follow expertly crafted routes that connect multiple historical points into meaningful journeys.",
    color: "from-accent-light to-primary-light",
  },
];

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
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Explore History Like Never Before
          </h2>
          <p className="text-lg text-muted">
            Our platform combines cutting-edge technology with rich historical content
            to create an immersive time-traveling experience.
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
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Accent */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/20 transition-colors duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
