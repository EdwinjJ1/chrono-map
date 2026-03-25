import type { Metadata } from "next";
import MapPageClient from "@/components/pages/MapPageClient";
import { locales } from "@/i18n/config";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = getSiteUrl();
  const isZh = locale === 'zh';
  const path = `/${locale}/map`;

  return {
    metadataBase: new URL(siteUrl),
    title: isZh
      ? "探索地图 | 时光地图 Chrono-Map"
      : "Explore the Map | Chrono-Map",
    description: isZh
      ? "浏览 Chrono-Map 的互动地图，按历史、影视、文化与遗产等分类探索地点故事。"
      : "Browse the interactive Chrono-Map and explore place stories by history, film, culture, heritage, nature, and food.",
    alternates: {
      canonical: path,
      languages: {
        en: '/en/map',
        zh: '/zh/map',
      },
    },
    openGraph: {
      title: isZh
        ? "探索地图 | 时光地图 Chrono-Map"
        : "Explore the Map | Chrono-Map",
      description: isZh
        ? "按主题浏览地点故事，查看每个地点背后的历史与文化线索。"
        : "Browse place stories by theme and explore the history and context behind each location.",
      url: `${siteUrl}${path}`,
      type: "website",
      locale: isZh ? "zh_CN" : "en_AU",
      siteName: "Chrono-Map",
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function MapPage() {
  return <MapPageClient />;
}
