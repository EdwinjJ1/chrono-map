"use client";

import { useTranslations, useLocale } from 'next-intl';
import Link from "next/link";
import { countryPages } from '@/data/country-pages';
import { MapPin, Clock, Mail, Github, Twitter } from "lucide-react";

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const footerLinks = {
    explore: [
      { label: t('exploreLinks.interactiveMap'), href: `/${locale}/map` },
      { label: t('exploreLinks.featuredLocations'), href: `/${locale}/topics/sydney-hidden-history` },
      { label: t('exploreLinks.filmLocations'), href: `/${locale}/topics/sydney-film-locations` },
      { label: t('exploreLinks.walkingTours'), href: `/${locale}/topics/sydney-heritage-walk` },
    ],
    about: [
      { label: t('aboutLinks.ourStory'), href: `/${locale}/about` },
      { label: t('aboutLinks.howItWorks'), href: `/${locale}/how-it-works` },
      { label: t('aboutLinks.forBusinesses'), href: `/${locale}/business` },
      { label: t('aboutLinks.contactUs'), href: `/${locale}/contact` },
    ],
    legal: [
      { label: t('legalLinks.legalInformation'), href: `/${locale}/legal` },
      { label: t('legalLinks.privacyPolicy'), href: `/${locale}/privacy` },
      { label: t('legalLinks.termsOfService'), href: `/${locale}/terms` },
      { label: t('legalLinks.cookiePolicy'), href: `/${locale}/cookies` },
    ],
  };

  return (
    <footer className="bg-primary-dark text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4 cursor-pointer">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-accent rounded-xl" />
                <Clock className="w-5 h-5 text-white relative z-10" />
                <MapPin className="w-3 h-3 text-white absolute bottom-1 right-1 z-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-white tracking-tight">
                  Chrono-Map
                </span>
                <span className="text-[10px] text-white/50 uppercase tracking-widest -mt-1">
                  {t('brandSubtitle')}
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/60 mb-6 max-w-xs">
              {t('brandTagline')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                aria-label={t('social.twitter')}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                aria-label={t('social.github')}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@chrono-map.com"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                aria-label={t('social.email')}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">{t('explore')}</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent-light transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">{t('about')}</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent-light transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-serif font-semibold text-white mb-4">{t('legal')}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent-light transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Destinations — country guides (internal linking for discoverability) */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h4 className="font-serif font-semibold text-white mb-4">
            {locale.startsWith('zh') ? '按国家探索' : 'Explore by Country'}
          </h4>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {countryPages.map((country) => (
              <li key={country.slug}>
                <Link
                  href={`/${locale}/countries/${country.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-accent-light transition-colors cursor-pointer"
                >
                  <span aria-hidden>{country.flag}</span>
                  {locale.startsWith('zh') ? country.name.zh : country.name.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Chrono-Map. {t('allRightsReserved')}
          </p>
          <p className="text-sm text-white/40">
            {t('madeWithPassion')}
          </p>
        </div>
      </div>
    </footer>
  );
}
