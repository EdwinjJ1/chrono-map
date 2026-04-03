import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getSiteUrl } from '@/lib/site-url';
import StaticContentPage from '@/components/StaticContentPage';
import {
  getLocalizedSitePage,
  isSitePageSlug,
  sitePageSlugs,
  type SitePageSlug,
} from '@/data/site-pages';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    sitePageSlugs.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale) || !isSitePageSlug(slug)) {
    return {};
  }

  const page = getLocalizedSitePage(locale as Locale, slug);
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: `${page.title} | Chrono-Map`,
    description: page.description,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: {
        en: `/en/${slug}`,
        zh: `/zh/${slug}`,
      },
    },
    openGraph: {
      title: `${page.title} | Chrono-Map`,
      description: page.description,
      url: `${siteUrl}/${locale}/${slug}`,
      type: 'article',
      locale: locale === 'zh' ? 'zh_CN' : 'en_AU',
    },
  };
}

export default async function SiteContentPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale) || !isSitePageSlug(slug)) {
    notFound();
  }

  const page = getLocalizedSitePage(locale as Locale, slug as SitePageSlug);

  return <StaticContentPage page={page} />;
}
