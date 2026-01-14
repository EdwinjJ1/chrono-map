"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const locations = [
  {
    id: 1,
    name: "The Rocks",
    type: "Historical",
    year: "1788",
    description: "Sydney's oldest neighborhood, where the first European settlers landed.",
    image: "/images/locations/the-rocks.jpg",
    gradient: "from-primary/80 to-primary-dark/90",
  },
  {
    id: 2,
    name: "Martin Place",
    type: "Film Location",
    year: "1999",
    description: "The iconic 'Woman in Red' scene from The Matrix was filmed here.",
    image: "/images/locations/martin-place.jpg",
    gradient: "from-accent/80 to-accent-dark/90",
  },
  {
    id: 3,
    name: "Queen Victoria Building",
    type: "Heritage",
    year: "1898",
    description: "A Romanesque Revival masterpiece, once nearly demolished.",
    image: "/images/locations/qvb.jpg",
    gradient: "from-primary-light/80 to-primary/90",
  },
  {
    id: 4,
    name: "Sydney Opera House",
    type: "Cultural",
    year: "1973",
    description: "Jørn Utzon's controversial masterpiece that became a world icon.",
    image: "/images/locations/opera-house.jpg",
    gradient: "from-accent-dark/80 to-primary-dark/90",
  },
];

export default function FeaturedLocations() {
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
              Featured Locations
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              Start Your Journey Here
            </h2>
          </div>
          <Link
            href="/map"
            className="group inline-flex items-center gap-2 text-primary font-medium hover:text-primary-light transition-colors cursor-pointer"
          >
            View all locations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Location Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/location/${location.id}`} className="block group cursor-pointer">
                <div className="relative h-80 rounded-2xl overflow-hidden">
                  {/* Background Image */}
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Fallback Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${location.gradient} opacity-30`} />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                        {location.type}
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
                      <span className="text-sm font-medium">Explore</span>
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
