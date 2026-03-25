import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getSiteUrl } from '@/lib/site-url';
import "./globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: isZh ? "时光地图 (Chrono-Map) | 用一张地图，看懂每个地点背后的故事" : "Chrono-Map | Stories of Place - City Walk & Travel Planning",
    description: isZh
      ? "用一张地图，看懂每个地点背后的故事。Chrono-Map 是您绝佳的 City Walk（城市漫游）与旅游准备工具，带您探索跨越时间的历史地标、影视取景地与文化遗产。"
      : "Use one map to understand the story behind every place. Chrono-Map is your ultimate city walk companion and travel preparation tool to explore historical landmarks, film locations, and cultural heritage.",
    keywords: isZh
      ? ["city walk", "旅游准备", "用一张地图，看懂每个地点背后的故事", "历史地图", "地点故事", "文化遗产", "影视取景地", "旅行", "城市探索", "文化"]
      : ["city walk", "travel preparation", "history map", "place stories", "heritage", "film locations", "travel", "city exploration", "culture"],
    authors: [{ name: "Evan Lin" }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
    openGraph: {
      title: isZh ? "时光地图 (Chrono-Map) | 用一张地图，看懂每个地点背后的故事" : "Chrono-Map | Stories of Place - City Walk & Travel Planning",
      description: isZh
        ? "用一张地图，看懂每个地点背后的故事。为您的 City Walk 与旅游准备提供最翔实的历史街区地图指南。"
        : "Use one map to understand the story behind every place. Your ultimate guide for city walks and travel preparation.",
      type: "website",
      url: `${siteUrl}/${locale}`,
      locale: isZh ? 'zh_CN' : 'en_AU',
      siteName: isZh ? "时光地图 (Chrono-Map)" : "Chrono-Map",
    },
    twitter: {
      card: "summary_large_image",
      title: isZh ? "时光地图 (Chrono-Map) | 用一张地图，看懂每个地点背后的故事" : "Chrono-Map | Stories of Place - City Walk & Travel Planning",
      description: isZh
        ? "为您的 City Walk 与旅游准备提供最翔实的历史街区地图指南。用一张地图，看懂每个地点背后的故事。"
        : "Your ultimate guide for city walks and travel preparation. Use one map to understand the story behind every place.",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isZh = locale === 'zh';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebSite", "SoftwareApplication"],
    "name": isZh ? "时光地图 (Chrono-Map)" : "Chrono-Map",
    "alternateName": "Chrono-Map: Stories of Place",
    "url": siteUrl,
    "description": isZh 
      ? "用一张地图，看懂每个地点背后的故事。一款为 City Walk 与旅游准备打造的互动地图应用。"
      : "Use one map to understand the story behind every place. An interactive map application designed for city walks and travel preparation.",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Any",
    "keywords": isZh ? "city walk, 旅游准备, 地图, 故事" : "city walk, travel preparation, map, stories"
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
