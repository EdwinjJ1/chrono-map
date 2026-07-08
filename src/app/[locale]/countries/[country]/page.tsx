import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locationTypes } from '@/data/locations';
import {
  countryPageSlugs,
  getCountryPageMeta,
  getLocalizedCountryPage,
  isCountryPageSlug,
} from '@/data/country-pages';
import { locales, type Locale } from '@/i18n/config';
import { getSiteUrl } from '@/lib/site-url';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    countryPageSlugs.map((country) => ({ locale, country }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}): Promise<Metadata> {
  const { locale, country } = await params;

  if (!locales.includes(locale as Locale) || !isCountryPageSlug(country)) {
    return {};
  }

  const siteUrl = getSiteUrl();
  const page = getLocalizedCountryPage(locale as Locale, country);
  const meta = getCountryPageMeta(country);
  if (!page || !meta) return {};

  const isZh = locale === 'zh';
  const path = `/${locale}/countries/${country}`;
  const title = isZh
    ? `${page.name}历史地点地图 | ${page.count} 处 | 时光地图 Chrono-Map`
    : `Historic Places in ${page.name} | ${page.count} Sites to Visit | Chrono-Map`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description: page.blurb,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/countries/${country}`,
        zh: `/zh/countries/${country}`,
      },
    },
    openGraph: {
      title,
      description: page.blurb,
      url: `${siteUrl}${path}`,
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_AU',
      siteName: 'Chrono-Map',
    },
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country } = await params;

  if (!locales.includes(locale as Locale) || !isCountryPageSlug(country)) {
    notFound();
  }

  const page = getLocalizedCountryPage(locale as Locale, country);
  if (!page) {
    notFound();
  }

  const isZh = locale === 'zh';
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/countries/${country}`;

  const typeLabel = (type: keyof typeof locationTypes) => {
    const zhLabels: Record<string, string> = {
      historical: '历史遗迹',
      film: '影视取景地',
      cultural: '文化景点',
      heritage: '文化遗产',
      nature: '自然景观',
      restaurant: '特色餐厅',
      photography: '摄影地点',
    };
    return isZh ? zhLabels[type] : locationTypes[type].label;
  };

  // GEO-friendly structured data: a CollectionPage wrapping an ItemList of every
  // place, so answer engines can enumerate the country's sites directly.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isZh ? `${page.name}历史地点` : `Historic Places in ${page.name}`,
    description: page.blurb,
    url: pageUrl,
    inLanguage: isZh ? 'zh-CN' : 'en',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: page.count,
      itemListElement: page.locations.map((location, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TouristAttraction',
          name: location.name,
          url: `${siteUrl}/${locale}/places/${location.slug}`,
        },
      })),
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden border-b border-border bg-background-alt pt-32 pb-16">
        <div className="aurora-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              <span aria-hidden className="text-base">{page.flag}</span>
              {isZh ? `${page.count} 处历史地点` : `${page.count} historic places`}
            </p>
            <h1 className="text-4xl font-serif font-bold text-foreground sm:text-5xl">
              {isZh ? `${page.name}历史地点地图` : `Historic Places in ${page.name}`}
            </h1>
            <p className="mt-4 text-lg text-primary/90 font-medium">{page.tagline}</p>
            <p className="mt-4 text-lg text-muted">{page.blurb}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/map`}
                className="inline-flex items-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                {isZh ? '在地图上探索' : 'Explore on the map'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {page.locations.map((location) => (
            <Link
              key={location.id}
              href={`/${locale}/places/${location.slug}`}
              className="group glass rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"
            >
              <div className="relative h-40 bg-background-alt">
                {location.image ? (
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${locationTypes[location.type].color}dd, ${locationTypes[location.type].color}99)`,
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {typeLabel(location.type)}
                </span>
                <span className="absolute right-3 top-3 rounded bg-black/20 px-2 py-0.5 text-xs text-white/90 backdrop-blur-sm">
                  {location.year}
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors">
                  {location.name}
                </h2>
                <p className="mt-1 text-sm text-muted line-clamp-2">{location.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
