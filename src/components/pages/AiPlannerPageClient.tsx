"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowLeft, Send, MapPin, Clock, Route, MessageCircle } from "lucide-react";

export default function AiPlannerPageClient() {
  const t = useTranslations('aiPlanner');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <header className="relative z-10 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{t('backToHome')}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="font-serif font-bold text-foreground">{t('title')}</span>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-accent to-accent-dark shadow-xl mb-8"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent-dark text-sm font-medium mb-6"
          >
            {t('comingSoon')}
          </motion.span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto mb-12">
            {t('pageSubtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-foreground text-sm">{t('title')}</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-xs text-muted">Online</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 space-y-4 min-h-[300px] bg-background/30">
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-md bg-background-alt text-foreground text-sm leading-relaxed">
                <Sparkles className="w-3 h-3 inline-block mr-1.5 text-accent" />
                {t('comingSoonDescription')}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pl-2">
              {[
                { icon: Route, text: "2-day itinerary" },
                { icon: MapPin, text: "Film locations tour" },
                { icon: Clock, text: "Historical walk" },
                { icon: MessageCircle, text: "Food & culture" },
              ].map((chip) => (
                <button
                  key={chip.text}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-accent/10 text-accent-dark text-xs font-medium hover:bg-accent/20 transition-colors cursor-pointer"
                  disabled
                >
                  <chip.icon className="w-3 h-3" />
                  {chip.text}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-4 border-t border-border">
            <div className="flex items-center gap-2 p-2 rounded-2xl bg-background-alt border border-border">
              <input
                type="text"
                placeholder={t('inputPlaceholder')}
                className="flex-1 px-3 py-2 bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
                disabled
              />
              <button
                className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center cursor-not-allowed"
                disabled
              >
                <Send className="w-4 h-4 text-white/50" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors cursor-pointer text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToHome')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
