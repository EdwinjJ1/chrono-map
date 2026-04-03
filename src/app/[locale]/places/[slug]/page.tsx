import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TimelineCompare from "@/components/TimelineCompare";
import PhotographyInfoPanel from "@/components/PhotographyInfoPanel";
import { locations, locationTypes } from "@/data/locations";
import { getLocalizedLocation } from "@/data/locations-zh";
import { locales, type Locale } from "@/i18n/config";
import { getLocationBySlug, getLocationSlug } from "@/lib/location-slugs";
import { getLocationCity, getLocationTypeKeyword } from "@/lib/location-seo";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    locations.map((location) => ({
      locale,
      slug: getLocationSlug(location),
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const location = getLocationBySlug(slug);

  if (!location) {
    return {};
  }

  const localizedLocation = getLocalizedLocation(location, locale);
  const siteUrl = getSiteUrl();
  const path = `/${locale}/places/${slug}`;
  const city = getLocationCity(location);
  const typeKeyword = getLocationTypeKeyword(location.type, locale === 'zh' ? 'zh' : 'en');
  const description = localizedLocation.description.length > 160
    ? localizedLocation.description.slice(0, 157).concat("...")
    : localizedLocation.description;

  return {
    metadataBase: new URL(siteUrl),
    title: locale === 'zh'
      ? `${localizedLocation.name} | ${city}${typeKeyword} | Chrono-Map`
      : `${localizedLocation.name} History | ${city} ${typeKeyword} | Chrono-Map`,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/places/${slug}`,
        zh: `/zh/places/${slug}`,
      },
    },
    openGraph: {
      title: locale === 'zh'
        ? `${localizedLocation.name} | ${city}${typeKeyword} | Chrono-Map`
        : `${localizedLocation.name} History | ${city} ${typeKeyword} | Chrono-Map`,
      description,
      url: `${siteUrl}${path}`,
      type: "article",
      locale: locale === 'zh' ? 'zh_CN' : 'en_AU',
      images: localizedLocation.modernImage
        ? [{ url: localizedLocation.modernImage, alt: localizedLocation.name }]
        : undefined,
      siteName: "Chrono-Map",
    },
    twitter: {
      card: "summary_large_image",
      title: locale === 'zh'
        ? `${localizedLocation.name} | ${city}${typeKeyword} | Chrono-Map`
        : `${localizedLocation.name} History | ${city} ${typeKeyword} | Chrono-Map`,
      description,
      images: localizedLocation.modernImage ? [localizedLocation.modernImage] : undefined,
    },
  };
}

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const localizedLocation = getLocalizedLocation(location, locale);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/places/${slug}`;
  const placeImages = [localizedLocation.modernImage, localizedLocation.historicalImage]
    .filter(Boolean)
    .map((image) => image?.startsWith('http') ? image : `${siteUrl}${image}`);
  const zhTypeLabels = {
    historical: '历史遗迹',
    film: '影视取景地',
    cultural: '文化景点',
    heritage: '文化遗产',
    nature: '自然景观',
    restaurant: '特色餐厅',
    photography: '摄影地点',
  } as const;
  const typeLabel = locale === 'zh'
    ? zhTypeLabels[location.type]
    : locationTypes[location.type].label;
  const storyParagraphs = localizedLocation.fullDescription
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Place",
        "name": localizedLocation.name,
        "alternateName": locale === 'zh' ? location.name : location.nameZh,
        "description": localizedLocation.description,
        "url": pageUrl,
        "image": placeImages,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": localizedLocation.address,
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": location.coordinates.lat,
          "longitude": location.coordinates.lng,
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": locale === 'zh' ? '首页' : 'Home',
            "item": `${siteUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": locale === 'zh' ? '探索地图' : 'Explore Map',
            "item": `${siteUrl}/${locale}/map`,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": localizedLocation.name,
            "item": pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden border-b border-border bg-background-alt pt-32 pb-16">
        <div className="aurora-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-5 text-sm">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                {typeLabel}
              </span>
              <span className="rounded-full bg-white/80 px-3 py-1 text-foreground/70">
                {localizedLocation.year}
              </span>
            </div>

            <h1 className="text-4xl font-serif font-bold text-foreground sm:text-5xl">
              {localizedLocation.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              {localizedLocation.description}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/80">
              {localizedLocation.address}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/map`}
                className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-light"
              >
                {locale === 'zh' ? '回到地图' : 'Back to map'}
              </Link>
              {localizedLocation.visitInfo?.website && (
                <a
                  href={localizedLocation.visitInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {locale === 'zh' ? '官方网站' : 'Official website'}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {(localizedLocation.historicalImage || localizedLocation.modernImage) && (
          <div className="mb-12">
            <TimelineCompare
              historicalImage={localizedLocation.historicalImage}
              modernImage={localizedLocation.modernImage}
              historicalYear={localizedLocation.year}
              locationName={localizedLocation.name}
            />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          <article className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              {locale === 'zh' ? '地点故事' : 'The story of this place'}
            </h2>
            <div className="mt-5 space-y-5 text-base leading-8 text-foreground/80">
              {storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <section className="glass rounded-3xl p-6">
              <h2 className="text-xl font-serif font-semibold text-foreground">
                {locale === 'zh' ? '关键信息' : 'Key details'}
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-muted">{locale === 'zh' ? '地点类型' : 'Type'}</dt>
                  <dd className="mt-1 font-medium text-foreground">{typeLabel}</dd>
                </div>
                <div>
                  <dt className="text-muted">{locale === 'zh' ? '相关年份' : 'Year'}</dt>
                  <dd className="mt-1 font-medium text-foreground">{localizedLocation.year}</dd>
                </div>
                <div>
                  <dt className="text-muted">{locale === 'zh' ? '地址' : 'Address'}</dt>
                  <dd className="mt-1 font-medium text-foreground">{localizedLocation.address}</dd>
                </div>
                {localizedLocation.visitInfo?.hours && (
                  <div>
                    <dt className="text-muted">{locale === 'zh' ? '开放时间' : 'Hours'}</dt>
                    <dd className="mt-1 font-medium text-foreground">{localizedLocation.visitInfo.hours}</dd>
                  </div>
                )}
                {localizedLocation.visitInfo?.admission && (
                  <div>
                    <dt className="text-muted">{locale === 'zh' ? '门票' : 'Admission'}</dt>
                    <dd className="mt-1 font-medium text-foreground">{localizedLocation.visitInfo.admission}</dd>
                  </div>
                )}
              </dl>
            </section>

            <section className="glass rounded-3xl p-6">
              <h2 className="text-xl font-serif font-semibold text-foreground">
                {locale === 'zh' ? '你可能想知道' : 'Did you know?'}
              </h2>
              <ul className="mt-4 space-y-3">
                {localizedLocation.facts.map((fact) => (
                  <li key={fact} className="flex gap-3 text-sm text-foreground/80">
                    <span className="mt-2 h-2 w-2 rounded-full bg-accent" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </section>

            {location.photographyInfo && (
              <PhotographyInfoPanel location={location} />
            )}

            {localizedLocation.relatedFilms && localizedLocation.relatedFilms.length > 0 && (
              <section className="glass rounded-3xl p-6">
                <h2 className="text-xl font-serif font-semibold text-foreground">
                  {locale === 'zh' ? '相关影视作品' : 'Related films'}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {localizedLocation.relatedFilms.map((film) => (
                    <span
                      key={film}
                      className="rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent-dark"
                    >
                      {film}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
