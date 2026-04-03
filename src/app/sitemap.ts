import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { locations } from '@/data/locations';
import { sitePageSlugs } from '@/data/site-pages';
import { topicPageSlugs } from '@/data/topic-pages';
import { getLocationSlug } from '@/lib/location-slugs';
import { getSiteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const routes: MetadataRoute.Sitemap = [];

  // Core routes
  const corePaths = ['', '/map', '/ai-planner'];

  locales.forEach((locale) => {
    corePaths.forEach((path) => {
      routes.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alternateLocale) => [
              alternateLocale,
              `${baseUrl}/${alternateLocale}${path}`,
            ])
          ),
        },
      });
    });

    sitePageSlugs.forEach((slug) => {
      routes.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alternateLocale) => [
              alternateLocale,
              `${baseUrl}/${alternateLocale}/${slug}`,
            ])
          ),
        },
      });
    });

    topicPageSlugs.forEach((slug) => {
      routes.push({
        url: `${baseUrl}/${locale}/topics/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alternateLocale) => [
              alternateLocale,
              `${baseUrl}/${alternateLocale}/topics/${slug}`,
            ])
          ),
        },
      });
    });

    locations.forEach((location) => {
      const locationSlug = getLocationSlug(location);

      routes.push({
        url: `${baseUrl}/${locale}/places/${locationSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alternateLocale) => [
              alternateLocale,
              `${baseUrl}/${alternateLocale}/places/${locationSlug}`,
            ])
          ),
        },
      });
    });
  });

  return routes;
}
