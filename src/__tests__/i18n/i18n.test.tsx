import { describe, it, expect } from '@jest/globals';
import { locales, defaultLocale, localeNames, localeLabels, type Locale } from '@/i18n/config';

describe('i18n Configuration', () => {
  describe('locales', () => {
    it('should have en and zh locales', () => {
      expect(locales).toContain('en');
      expect(locales).toContain('zh');
      expect(locales).toHaveLength(2);
    });
  });

  describe('defaultLocale', () => {
    it('should be en', () => {
      expect(defaultLocale).toBe('en');
    });
  });

  describe('localeNames', () => {
    it('should have names for all locales', () => {
      expect(localeNames.en).toBe('English');
      expect(localeNames.zh).toBe('中文');
    });
  });

  describe('localeLabels', () => {
    it('should have native and english labels for all locales', () => {
      expect(localeLabels.en.native).toBe('English');
      expect(localeLabels.en.english).toBe('English');
      expect(localeLabels.zh.native).toBe('中文');
      expect(localeLabels.zh.english).toBe('Chinese');
    });
  });

  describe('Locale type', () => {
    it('should be typed correctly', () => {
      const testLocale: Locale = 'en';
      expect(testLocale).toBe('en');
    });
  });
});
