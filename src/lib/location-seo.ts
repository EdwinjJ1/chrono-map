import type { Location } from '@/data/locations';

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
] as const;

export function getLocationCity(location: Location) {
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

export function getLocationTypeKeyword(type: Location['type'], locale: 'en' | 'zh') {
  const enLabels: Record<Location['type'], string> = {
    historical: 'historical site',
    film: 'film location',
    cultural: 'cultural landmark',
    heritage: 'heritage site',
    nature: 'nature spot',
    restaurant: 'food destination',
  };

  const zhLabels: Record<Location['type'], string> = {
    historical: '历史地点',
    film: '影视取景地',
    cultural: '文化地标',
    heritage: '文化遗产地点',
    nature: '自然地点',
    restaurant: '美食地点',
  };

  return locale === 'zh' ? zhLabels[type] : enLabels[type];
}
