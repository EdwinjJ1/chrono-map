import { locations, getLocationRegion, type Location } from '@/data/locations';
import { getLocalizedLocation } from '@/data/locations-zh';
import { getLocationSlug } from '@/lib/location-slugs';
import type { Locale } from '@/i18n/config';

/**
 * Country landing pages (GEO surfaces). Each is a curated, bilingual overview of
 * one country's historical locations, generated from the region data so it stays
 * in sync as the dataset grows. These pages give search and answer engines a
 * single authoritative, list-structured page per country.
 */

export interface CountryPageMeta {
  /** URL slug, e.g. "germany". */
  slug: string;
  /** Region key matching Location.region, e.g. "Germany". */
  region: string;
  flag: string;
  name: { en: string; zh: string };
  /** One-line hook shown as the page lede. */
  tagline: { en: string; zh: string };
  /** Short SEO/GEO description naming the country and what the page offers. */
  blurb: { en: string; zh: string };
}

export const countryPages: CountryPageMeta[] = [
  {
    slug: 'germany',
    region: 'Germany',
    flag: '🇩🇪',
    name: { en: 'Germany', zh: '德国' },
    tagline: {
      en: 'From Frederick the Great to the Berlin Wall',
      zh: '从腓特烈大帝到柏林墙',
    },
    blurb: {
      en: 'A map-based guide to historically significant places to visit in Germany — Prussian palaces, medieval old towns, WWII and Holocaust memorials, and Cold War sites — each with the story behind it.',
      zh: '一份基于地图的德国历史旅行指南——普鲁士宫殿、中世纪古城、二战与大屠杀纪念地、冷战遗址——每一处都附上背后的故事。',
    },
  },
  {
    slug: 'france',
    region: 'France',
    flag: '🇫🇷',
    name: { en: 'France', zh: '法国' },
    tagline: {
      en: 'D-Day beaches, Gothic cathedrals, and the age of Napoleon',
      zh: '诺曼底登陆滩、哥特大教堂与拿破仑时代',
    },
    blurb: {
      en: 'A curated guide to historic places to visit in France — the Normandy D-Day landings, Verdun and the Western Front, revolution-era Paris, Loire châteaux, and Roman and medieval landmarks.',
      zh: '一份精选的法国历史旅行指南——诺曼底登陆、凡尔登与西线战场、大革命时期的巴黎、卢瓦尔河城堡，以及古罗马与中世纪地标。',
    },
  },
  {
    slug: 'italy',
    region: 'Italy',
    flag: '🇮🇹',
    name: { en: 'Italy', zh: '意大利' },
    tagline: {
      en: 'Ancient Rome, the Renaissance, and everything between',
      zh: '古罗马、文艺复兴，以及其间的一切',
    },
    blurb: {
      en: 'A map-based guide to historic places to visit in Italy — the ruins of ancient Rome, Pompeii and Vesuvius, Renaissance Florence and Venice, and the battle sites of the world wars.',
      zh: '一份基于地图的意大利历史旅行指南——古罗马遗址、庞贝与维苏威、文艺复兴的佛罗伦萨与威尼斯，以及两次世界大战的战场。',
    },
  },
  {
    slug: 'spain',
    region: 'Spain',
    flag: '🇪🇸',
    name: { en: 'Spain', zh: '西班牙' },
    tagline: {
      en: 'Moorish palaces, Roman ruins, and the Civil War',
      zh: '摩尔宫殿、罗马遗址与内战',
    },
    blurb: {
      en: 'A curated guide to historic places to visit in Spain — the Alhambra and Al-Andalus, Roman aqueducts, the Reconquista, the Spanish Golden Age, and the scars of the Civil War.',
      zh: '一份精选的西班牙历史旅行指南——阿尔罕布拉宫与安达卢斯、罗马输水道、收复失地运动、西班牙黄金时代，以及内战的伤痕。',
    },
  },
  {
    slug: 'switzerland',
    region: 'Switzerland',
    flag: '🇨🇭',
    name: { en: 'Switzerland', zh: '瑞士' },
    tagline: {
      en: 'Alpine castles, the Reformation, and the birth of a confederation',
      zh: '阿尔卑斯城堡、宗教改革与联邦的诞生',
    },
    blurb: {
      en: 'A map-based guide to historic places to visit in Switzerland — the founding meadow of the confederation, lakeside castles, Reformation Geneva and Zurich, and the great Alpine passes.',
      zh: '一份基于地图的瑞士历史旅行指南——联邦的建国草地、湖畔城堡、宗教改革的日内瓦与苏黎世，以及伟大的阿尔卑斯山口。',
    },
  },
  {
    slug: 'austria',
    region: 'Austria',
    flag: '🇦🇹',
    name: { en: 'Austria', zh: '奥地利' },
    tagline: {
      en: 'The Habsburgs, Mozart, and the edge of empire',
      zh: '哈布斯堡、莫扎特与帝国的边缘',
    },
    blurb: {
      en: 'A curated guide to historic places to visit in Austria — imperial Vienna, Salzburg and Mozart, Habsburg palaces, the sieges that turned back the Ottomans, and the memory of the Anschluss.',
      zh: '一份精选的奥地利历史旅行指南——帝国维也纳、萨尔茨堡与莫扎特、哈布斯堡宫殿、击退奥斯曼的围城，以及德奥合并的记忆。',
    },
  },
  {
    slug: 'poland',
    region: 'Poland',
    flag: '🇵🇱',
    name: { en: 'Poland', zh: '波兰' },
    tagline: {
      en: 'Royal Kraków, the Holocaust, and Solidarity',
      zh: '皇家克拉科夫、大屠杀与团结工会',
    },
    blurb: {
      en: 'A map-based guide to historic places to visit in Poland — Kraków and Wawel, Auschwitz-Birkenau and the Warsaw Uprising, the Teutonic castle of Malbork, and the birthplace of Solidarity.',
      zh: '一份基于地图的波兰历史旅行指南——克拉科夫与瓦维尔、奥斯维辛-比克瑙与华沙起义、条顿骑士团的马尔堡城堡，以及团结工会的诞生地。',
    },
  },
  {
    slug: 'czechia',
    region: 'Czechia',
    flag: '🇨🇿',
    name: { en: 'Czechia', zh: '捷克' },
    tagline: {
      en: 'Golden Prague, Bohemian castles, and the Velvet Revolution',
      zh: '黄金布拉格、波希米亚城堡与天鹅绒革命',
    },
    blurb: {
      en: 'A curated guide to historic places to visit in Czechia — Prague Castle and the Old Town, the Sedlec bone church, Bohemian castles, and the sites of 1968 and 1989.',
      zh: '一份精选的捷克历史旅行指南——布拉格城堡与老城、塞德莱茨人骨教堂、波希米亚城堡，以及 1968 与 1989 年的历史现场。',
    },
  },
  {
    slug: 'hungary',
    region: 'Hungary',
    flag: '🇭🇺',
    name: { en: 'Hungary', zh: '匈牙利' },
    tagline: {
      en: 'Imperial Budapest, Ottoman sieges, and 1956',
      zh: '帝国布达佩斯、奥斯曼围城与 1956',
    },
    blurb: {
      en: 'A map-based guide to historic places to visit in Hungary — the palaces and bridges of Budapest, the memorials of the Holocaust and 1956, and the castles that held the Ottoman line.',
      zh: '一份基于地图的匈牙利历史旅行指南——布达佩斯的宫殿与桥梁、大屠杀与 1956 年的纪念地，以及守住奥斯曼防线的城堡。',
    },
  },
];

const countryPagesBySlug = new Map(countryPages.map((page) => [page.slug, page]));
const countryPagesByRegion = new Map(countryPages.map((page) => [page.region, page]));

export const countryPageSlugs = countryPages.map((page) => page.slug);

/** Country-page slug for a region key (e.g. "Germany" -> "germany"), or null. */
export function getCountryPageSlugForRegion(region: string): string | null {
  return countryPagesByRegion.get(region)?.slug ?? null;
}

export function isCountryPageSlug(value: string): boolean {
  return countryPagesBySlug.has(value);
}

export function getCountryPageMeta(slug: string): CountryPageMeta | undefined {
  return countryPagesBySlug.get(slug);
}

export interface CountryPageLocation {
  id: number;
  name: string;
  slug: string;
  type: Location['type'];
  year: string;
  description: string;
  image?: string;
}

export interface LocalizedCountryPage {
  slug: string;
  region: string;
  flag: string;
  name: string;
  tagline: string;
  blurb: string;
  count: number;
  locations: CountryPageLocation[];
}

/**
 * Build the localized country page: metadata plus every location in that region,
 * sorted historical-first by year so the timeline reads chronologically.
 */
export function getLocalizedCountryPage(
  locale: Locale,
  slug: string
): LocalizedCountryPage | null {
  const meta = countryPagesBySlug.get(slug);
  if (!meta) return null;

  const regionLocations = locations
    .filter((location) => getLocationRegion(location) === meta.region)
    .slice()
    .sort((a, b) => {
      const yearA = Number.parseInt(a.year, 10);
      const yearB = Number.parseInt(b.year, 10);
      if (Number.isFinite(yearA) && Number.isFinite(yearB) && yearA !== yearB) {
        return yearA - yearB;
      }
      return a.name.localeCompare(b.name);
    });

  const isZh = locale === 'zh';

  return {
    slug: meta.slug,
    region: meta.region,
    flag: meta.flag,
    name: isZh ? meta.name.zh : meta.name.en,
    tagline: isZh ? meta.tagline.zh : meta.tagline.en,
    blurb: isZh ? meta.blurb.zh : meta.blurb.en,
    count: regionLocations.length,
    locations: regionLocations.map((location) => {
      const localized = getLocalizedLocation(location, locale);
      return {
        id: location.id,
        name: localized.name,
        slug: getLocationSlug(location),
        type: location.type,
        year: location.year,
        description: localized.description,
        image: localized.modernImage ?? localized.historicalImage,
      };
    }),
  };
}
