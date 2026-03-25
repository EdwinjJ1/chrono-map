import type { Metadata } from "next";
import AiPlannerPageClient from "@/components/pages/AiPlannerPageClient";
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
  const path = `/${locale}/ai-planner`;

  return {
    metadataBase: new URL(siteUrl),
    title: isZh
      ? "AI 旅行规划 | 时光地图 Chrono-Map"
      : "AI Travel Planner | Chrono-Map",
    description: isZh
      ? "Chrono-Map AI 旅行规划功能预览页。该功能仍在开发中，目前不作为主要搜索落地页。"
      : "Preview the upcoming Chrono-Map AI travel planner. This feature is still in development and is not intended as a primary search landing page yet.",
    alternates: {
      canonical: path,
      languages: {
        en: '/en/ai-planner',
        zh: '/zh/ai-planner',
      },
    },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: isZh
        ? "AI 旅行规划 | 时光地图 Chrono-Map"
        : "AI Travel Planner | Chrono-Map",
      description: isZh
        ? "正在开发中的 AI 路线规划功能预览。"
        : "Preview of the AI route-planning feature currently in development.",
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

export default function AiPlannerPage() {
  return <AiPlannerPageClient />;
}
