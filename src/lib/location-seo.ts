import type { Location } from '@/data/locations';
import { getLocationRegion } from '@/data/locations';

/**
 * ISO 3166-1 alpha-2 country codes per region, used for structured-data
 * addressCountry. Legacy Australian entries default to AU.
 */
const regionCountryCodes: Record<string, string> = {
  Australia: 'AU',
  Germany: 'DE',
  France: 'FR',
  Italy: 'IT',
  Spain: 'ES',
  Switzerland: 'CH',
  Austria: 'AT',
  Poland: 'PL',
  Czechia: 'CZ',
  Hungary: 'HU',
};

/** Localized country display names for titles/metadata. */
const regionCountryNames: Record<string, { en: string; zh: string }> = {
  Australia: { en: 'Australia', zh: '澳大利亚' },
  Germany: { en: 'Germany', zh: '德国' },
  France: { en: 'France', zh: '法国' },
  Italy: { en: 'Italy', zh: '意大利' },
  Spain: { en: 'Spain', zh: '西班牙' },
  Switzerland: { en: 'Switzerland', zh: '瑞士' },
  Austria: { en: 'Austria', zh: '奥地利' },
  Poland: { en: 'Poland', zh: '波兰' },
  Czechia: { en: 'Czechia', zh: '捷克' },
  Hungary: { en: 'Hungary', zh: '匈牙利' },
};

const knownCities = [
  'Sydney',
  'Melbourne',
  'Brisbane',
  'Canberra',
  'Darwin',
  'Adelaide',
  'Perth',
  'Hobart',
  'Gold Coast',
  'Ballarat',
  'Bendigo',
  'Geelong',
  'Newcastle',
  'Wollongong',
  'Parramatta',
  'Byron Bay',
  'Broken Hill',
  'Surfers Paradise',
  'Palm Beach',
  'Kiama',
  'Shellharbour',
  'Stanwell Park',
  'Thirroul',
  'Austinmer',
  'Bulli',
  'Mount Kembla',
  'Mount Keira',
  'Port Kembla',
] as const;

/**
 * Best-effort city/locality for a location. Australian entries match the curated
 * city list; European entries derive the city from their address, which follows
 * a "..., <postcode> <City>, <Country>" or "..., <City>, <Country>" shape.
 */
export function getLocationCity(location: Location) {
  const region = getLocationRegion(location);

  if (region !== 'Australia') {
    const derived = deriveCityFromAddress(location.address);
    return derived ?? region;
  }

  const haystacks = [location.address, location.name];

  for (const city of knownCities) {
    if (haystacks.some((value) => value.includes(city))) {
      return city;
    }
  }

  if (location.address.includes('ACT')) {
    return 'Canberra';
  }

  return 'Australia';
}

/**
 * Pull the city out of a European-style address. Addresses end in
 * "<City>, <Country>", often with a postcode prefix on the city segment
 * (e.g. "Maulbeerallee, 14469 Potsdam, Germany" -> "Potsdam").
 */
function deriveCityFromAddress(address: string): string | null {
  const parts = address
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 2) return null;

  // The last segment is the country; the one before it holds the city.
  const citySegment = parts[parts.length - 2];

  // Strip a leading postcode (numbers, optional letters) from "14469 Potsdam".
  const withoutPostcode = citySegment.replace(/^[0-9][0-9A-Za-z-]*\s+/, '').trim();
  return withoutPostcode || citySegment || null;
}

/** Localized country name for a location's region (e.g. "Germany" / "德国"). */
export function getLocationCountryName(location: Location, locale: 'en' | 'zh') {
  const region = getLocationRegion(location);
  return regionCountryNames[region]?.[locale] ?? region;
}

/** ISO 3166-1 alpha-2 country code for structured data (e.g. "DE"). */
export function getLocationCountryCode(location: Location) {
  const region = getLocationRegion(location);
  return regionCountryCodes[region] ?? 'AU';
}

export function getLocationTypeKeyword(type: Location['type'], locale: 'en' | 'zh') {
  const enLabels: Record<Location['type'], string> = {
    historical: 'historical site',
    film: 'film location',
    cultural: 'cultural landmark',
    heritage: 'heritage site',
    nature: 'nature spot',
    restaurant: 'food destination',
    photography: 'photography spot',
  };

  const zhLabels: Record<Location['type'], string> = {
    historical: '历史地点',
    film: '影视取景地',
    cultural: '文化地标',
    heritage: '文化遗产地点',
    nature: '自然地点',
    restaurant: '美食地点',
    photography: '摄影地点',
  };

  return locale === 'zh' ? zhLabels[type] : enLabels[type];
}
