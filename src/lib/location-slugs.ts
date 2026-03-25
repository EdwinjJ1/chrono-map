import { locations, type Location } from '@/data/locations';

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function getLocationSlug(location: Location) {
  return `${slugify(location.name)}-${location.id}`;
}

export function getLocationSlugById(locationId: number) {
  const location = locations.find((entry) => entry.id === locationId);

  return location ? getLocationSlug(location) : String(locationId);
}

export function getLocationBySlug(slug: string) {
  const idMatch = slug.match(/-(\d+)$/);

  if (!idMatch) {
    return null;
  }

  const locationId = Number(idMatch[1]);

  return locations.find((location) => location.id === locationId) ?? null;
}
