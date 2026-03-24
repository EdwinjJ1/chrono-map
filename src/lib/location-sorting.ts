import { locationTypes, type Location } from '@/data/locations';

const typeOrder = Object.keys(locationTypes).reduce<Record<Location['type'], number>>(
  (acc, type, index) => ({
    ...acc,
    [type as Location['type']]: index,
  }),
  {} as Record<Location['type'], number>
);

function compareNames(a: Location, b: Location, locale: string) {
  return a.name.localeCompare(b.name, locale, {
    sensitivity: 'base',
    numeric: true,
  });
}

function compareHistoricalByYear(a: Location, b: Location, locale: string) {
  const yearA = Number(a.year);
  const yearB = Number(b.year);

  if (yearA !== yearB) {
    return yearA - yearB;
  }

  return compareNames(a, b, locale);
}

export function sortLocations(
  locations: Location[],
  filterType: 'all' | Location['type'],
  locale: string
) {
  return [...locations].sort((a, b) => {
    if (filterType === 'historical') {
      return compareHistoricalByYear(a, b, locale);
    }

    if (filterType !== 'all') {
      return compareNames(a, b, locale);
    }

    if (a.type !== b.type) {
      return typeOrder[a.type] - typeOrder[b.type];
    }

    if (a.type === 'historical') {
      return compareHistoricalByYear(a, b, locale);
    }

    return compareNames(a, b, locale);
  });
}
