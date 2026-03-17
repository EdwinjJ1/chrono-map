import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

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

  return {
    title: isZh ? "时光地图 | 悉尼层次" : "Chrono-Map | Sydney Layers",
    description: isZh
      ? "穿越时空探索悉尼的隐秘故事。通过我们的互动时光地图，发现历史地标、电影取景地和文化遗产。"
      : "Explore Sydney's hidden stories through time. Discover historical landmarks, film locations, and cultural heritage with our interactive time-travel map.",
    keywords: isZh
      ? ["悉尼", "历史", "地图", "遗产", "电影取景地", "旅游", "文化"]
      : ["Sydney", "history", "map", "heritage", "film locations", "travel", "culture"],
    authors: [{ name: "Evan Lin" }],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
      },
    },
    openGraph: {
      title: isZh ? "时光地图 | 悉尼层次" : "Chrono-Map | Sydney Layers",
      description: isZh
        ? "穿越时空探索悉尼的隐秘故事"
        : "Explore Sydney's hidden stories through time",
      type: "website",
      locale: isZh ? 'zh_CN' : 'en_AU',
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

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
