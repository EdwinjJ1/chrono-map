import { describe, expect, it } from '@jest/globals';
import { sortLocations } from '@/lib/location-sorting';
import type { Location } from '@/data/locations';

const makeLocation = (
  id: number,
  name: string,
  type: Location['type'],
  year: string
): Location => ({
  id,
  name,
  type,
  year,
  coordinates: { lat: -33.86, lng: 151.21 },
  description: `${name} description`,
  fullDescription: `${name} full description`,
  historicalImage: '/historical.jpg',
  modernImage: '/modern.jpg',
  facts: ['Fact'],
  address: `${name} address`,
});

describe('sortLocations', () => {
  it('sorts historical locations by year ascending', () => {
    const locations = [
      makeLocation(1, 'Late Site', 'historical', '1900'),
      makeLocation(2, 'Early Site', 'historical', '1788'),
      makeLocation(3, 'Middle Site', 'historical', '1850'),
    ];

    const result = sortLocations(locations, 'historical', 'en');

    expect(result.map((location) => location.name)).toEqual([
      'Early Site',
      'Middle Site',
      'Late Site',
    ]);
  });

  it('sorts non-historical filtered results alphabetically', () => {
    const locations = [
      makeLocation(1, 'Zulu Film', 'film', '1999'),
      makeLocation(2, 'Alpha Film', 'film', '1998'),
      makeLocation(3, 'Bravo Film', 'film', '2000'),
    ];

    const result = sortLocations(locations, 'film', 'en');

    expect(result.map((location) => location.name)).toEqual([
      'Alpha Film',
      'Bravo Film',
      'Zulu Film',
    ]);
  });

  it('sorts all results by type and then by type-specific rules', () => {
    const locations = [
      makeLocation(1, 'Zulu Film', 'film', '1999'),
      makeLocation(2, 'Late Site', 'historical', '1900'),
      makeLocation(3, 'Alpha Film', 'film', '1998'),
      makeLocation(4, 'Early Site', 'historical', '1788'),
    ];

    const result = sortLocations(locations, 'all', 'en');

    expect(result.map((location) => location.name)).toEqual([
      'Early Site',
      'Late Site',
      'Alpha Film',
      'Zulu Film',
    ]);
  });
});
