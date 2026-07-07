import { getLocationById, getLocationsByType, locations, locationTypes, Location } from '@/data/locations';
import { getLocalizedLocation } from '@/data/locations-zh';

describe('locations data', () => {
  describe('Location interface', () => {
    it('should have correct structure for The Rocks', () => {
      const rocks = locations[0];
      expect(rocks).toMatchObject({
        id: 1,
        name: 'The Rocks',
        nameZh: '岩石区',
        type: 'historical',
        year: '1788',
        coordinates: expect.any(Object),
        description: expect.any(String),
        fullDescription: expect.any(String),
        facts: expect.any(Array),
        address: expect.any(String),
      });
    });

    it('should include optional fields when present', () => {
      const operaHouse = locations[3];
      expect(operaHouse).toHaveProperty('visitInfo');
      expect(operaHouse).toHaveProperty('relatedFilms');
      expect(operaHouse.relatedFilms).toEqual([
        'Mission: Impossible 2 (2000)',
        'Finding Nemo (2003)',
      ]);
    });

    it('should allow undefined optional fields', () => {
      const circularQuay = locations[4];
      expect(circularQuay.visitInfo).toBeDefined();
      expect(circularQuay.relatedFilms).toBeUndefined();
    });
  });

  describe('locationTypes', () => {
    it('should have all required types', () => {
      expect(locationTypes).toHaveProperty('historical');
      expect(locationTypes).toHaveProperty('film');
      expect(locationTypes).toHaveProperty('cultural');
      expect(locationTypes).toHaveProperty('heritage');
      expect(locationTypes).toHaveProperty('nature');
    });

    it('should have correct structure for each type', () => {
      Object.entries(locationTypes).forEach(([, config]) => {
        expect(config).toHaveProperty('label');
        expect(config).toHaveProperty('color');
        expect(config).toHaveProperty('icon');
        expect(typeof config.label).toBe('string');
        expect(typeof config.color).toBe('string');
        expect(typeof config.icon).toBe('string');
      });
    });

    it('historical type should have navy color', () => {
      expect(locationTypes.historical.color).toBe('#1E3A5F');
    });

    it('nature type should have green color', () => {
      expect(locationTypes.nature.color).toBe('#2E7D32');
    });
  });

  describe('locations array', () => {
    it('should have a substantial seed dataset', () => {
      expect(locations.length).toBeGreaterThan(100);
    });

    it('should have unique IDs', () => {
      const ids = locations.map(loc => loc.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have at least one of each type', () => {
      const types = locations.map(loc => loc.type);
      expect(types).toContain('historical');
      expect(types).toContain('film');
      expect(types).toContain('cultural');
      expect(types).toContain('heritage');
      expect(types).toContain('nature');
    });

    it('all locations should have required fields', () => {
      locations.forEach(location => {
        expect(location).toHaveProperty('id');
        expect(location).toHaveProperty('name');
        expect(location).toHaveProperty('type');
        expect(location).toHaveProperty('year');
        expect(location).toHaveProperty('coordinates');
        expect(location).toHaveProperty('description');
        expect(location).toHaveProperty('fullDescription');
        expect(location).toHaveProperty('facts');
        expect(location).toHaveProperty('address');

        // Validate coordinates structure
        expect(location.coordinates).toHaveProperty('lat');
        expect(location.coordinates).toHaveProperty('lng');
        expect(typeof location.coordinates.lat).toBe('number');
        expect(typeof location.coordinates.lng).toBe('number');
        // Coordinates must be within valid geographic bounds
        expect(location.coordinates.lat).toBeGreaterThanOrEqual(-90);
        expect(location.coordinates.lat).toBeLessThanOrEqual(90);
        expect(location.coordinates.lng).toBeGreaterThanOrEqual(-180);
        expect(location.coordinates.lng).toBeLessThanOrEqual(180);

        // Validate type is one of the allowed types
        expect([
          'historical',
          'film',
          'cultural',
          'heritage',
          'nature',
          'restaurant',
          'photography',
        ]).toContain(location.type);
      });
    });

    it('all location IDs should be unique', () => {
      const ids = locations.map((loc) => loc.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('all locations should have non-empty facts array', () => {
      locations.forEach(location => {
        expect(location.facts).toBeInstanceOf(Array);
        expect(location.facts.length).toBeGreaterThan(0);
      });
    });

    it('historical type locations with Chinese name should have nameZh', () => {
      const historicalLocs = locations.filter(loc => loc.type === 'historical');
      historicalLocs.forEach(loc => {
        expect(loc.nameZh).toBeDefined();
      });
    });
  });

  describe('getLocationById', () => {
    it('should return correct location for valid ID', () => {
      expect(getLocationById(1)).toEqual(locations[0]);
      expect(getLocationById(27)).toEqual(locations[26]);
    });

    it('should return undefined for invalid ID', () => {
      expect(getLocationById(999)).toBeUndefined();
      expect(getLocationById(0)).toBeUndefined();
      expect(getLocationById(-1)).toBeUndefined();
    });

    it('should handle boundary IDs', () => {
      const maxId = Math.max(...locations.map((location) => location.id));

      expect(getLocationById(1)).toBeDefined();
      expect(getLocationById(maxId)).toBeDefined();
      expect(getLocationById(maxId + 1)).toBeUndefined();
    });
  });

  describe('getLocationsByType', () => {
    it('should return all historical locations', () => {
      const historicalLocs = getLocationsByType('historical');
      expect(historicalLocs.length).toBeGreaterThan(0);
      historicalLocs.forEach(loc => {
        expect(loc.type).toBe('historical');
      });
    });

    it('should return all film locations', () => {
      const filmLocs = getLocationsByType('film');
      expect(filmLocs.length).toBeGreaterThan(0);
      filmLocs.forEach(loc => {
        expect(loc.type).toBe('film');
      });
    });

    it('should return all cultural locations', () => {
      const culturalLocs = getLocationsByType('cultural');
      expect(culturalLocs.length).toBeGreaterThan(0);
      culturalLocs.forEach(loc => {
        expect(loc.type).toBe('cultural');
      });
    });

    it('should return all heritage locations', () => {
      const heritageLocs = getLocationsByType('heritage');
      expect(heritageLocs.length).toBeGreaterThan(0);
      heritageLocs.forEach(loc => {
        expect(loc.type).toBe('heritage');
      });
    });

    it('should return all nature locations', () => {
      const natureLocs = getLocationsByType('nature');
      expect(natureLocs.length).toBeGreaterThan(0);
      natureLocs.forEach(loc => {
        expect(loc.type).toBe('nature');
      });
    });

    it('should return empty array for type with no locations', () => {
      // Assuming we don't have a 'nightlife' type
      const result = getLocationsByType('nightlife' as Location['type']);
      expect(result).toEqual([]);
    });
  });

  describe('getLocalizedLocation', () => {
    it('should localize zh regional locales', () => {
      const localized = getLocalizedLocation(locations[0], 'zh-CN');

      expect(localized.name).toBe(locations[0].nameZh);
      expect(localized.description).not.toBe(locations[0].description);
    });

    it('should trim localized addresses', () => {
      const operaHouse = locations.find((location) => location.id === 4);

      expect(operaHouse).toBeDefined();

      const localized = getLocalizedLocation(operaHouse!, 'zh');
      expect(localized.address).toBe('Bennelong Point，悉尼 NSW 2000');
    });
  });
});
