import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLocalizedLocation } from '@/data/locations-zh';
import {
  getLocalizedTopicPage,
  isTopicPageSlug,
  topicPageSlugs,
  type TopicPageSlug,
} from '@/data/topic-pages';
import { locales, type Locale } from '@/i18n/config';
import { getLocationSlug } from '@/lib/location-slugs';
import { getSiteUrl } from '@/lib/site-url';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    topicPageSlugs.map((slug) => ({
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

  if (!locales.includes(locale as Locale) || !isTopicPageSlug(slug)) {
    return {};
  }

  const siteUrl = getSiteUrl();
  const topicPage = getLocalizedTopicPage(locale as Locale, slug);
  const path = `/${locale}/topics/${slug}`;

  return {
    metadataBase: new URL(siteUrl),
    title: topicPage.seoTitle,
    description: topicPage.description,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/topics/${slug}`,
        zh: `/zh/topics/${slug}`,
      },
    },
    openGraph: {
      title: topicPage.seoTitle,
      description: topicPage.description,
      url: `${siteUrl}${path}`,
      type: 'article',
      locale: locale === 'zh' ? 'zh_CN' : 'en_AU',
      siteName: 'Chrono-Map',
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale) || !isTopicPageSlug(slug)) {
    notFound();
  }

  const topicPage = getLocalizedTopicPage(locale as Locale, slug as TopicPageSlug);
  const localizedLocations = topicPage.locations.map((location) =>
    getLocalizedLocation(location!, locale)
  );

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden border-b border-border bg-background-alt pt-32 pb-16">
        <div className="aurora-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              {topicPage.badge}
            </p>
            <h1 className="text-4xl font-serif font-bold text-foreground sm:text-5xl">
              {topicPage.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              {topicPage.description}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/80">
              {topicPage.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {topicPage.sections.map((section) => (
            <article key={section.title} className="glass rounded-3xl p-8">
              <h2 className="text-2xl font-serif font-semibold text-foreground">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-foreground/80">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              {locale === 'zh' ? '推荐地点' : 'Featured places'}
            </h2>
            <Link
              href={`/${locale}/map`}
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              {locale === 'zh' ? '查看完整地图' : 'Open full map'}
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {localizedLocations.map((location) => (
              <Link
                key={location.id}
                href={`/${locale}/places/${getLocationSlug(location)}`}
                className="glass rounded-3xl p-6 transition-transform hover:-translate-y-1"
              >
                <p className="text-sm font-medium text-primary">
                  {location.year}
                </p>
                <h3 className="mt-2 text-xl font-serif font-semibold text-foreground">
                  {location.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-foreground/75">
                  {location.description}
                </p>
                <p className="mt-4 text-sm text-muted">
                  {location.address}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}
