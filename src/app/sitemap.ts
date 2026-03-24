import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { sitePageSlugs } from '@/data/site-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chrono-map.com';

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
      });
    });

    // Static content pages
    sitePageSlugs.forEach((slug) => {
      routes.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    });
  });

  return routes;
}
