import { locations } from '@/data/locations';
import { getLocationBySlug, getLocationSlug, getLocationSlugById } from '@/lib/location-slugs';

describe('location slugs', () => {
  it('creates stable slugs from the base english location name', () => {
    expect(getLocationSlug(locations[0])).toBe('the-rocks-1');
    expect(getLocationSlugById(4)).toBe('sydney-opera-house-4');
  });

  it('resolves locations from a slug', () => {
    expect(getLocationBySlug('the-rocks-1')?.id).toBe(1);
    expect(getLocationBySlug('custom-slug-4')?.name).toBe('Sydney Opera House');
  });

  it('returns null for invalid slugs', () => {
    expect(getLocationBySlug('not-a-real-slug')).toBeNull();
  });
});
