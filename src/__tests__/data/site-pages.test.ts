import { describe, expect, it } from '@jest/globals';
import {
  getLocalizedSitePage,
  isSitePageSlug,
  sitePageSlugs,
} from '@/data/site-pages';

describe('site pages', () => {
  it('should expose all expected static page slugs', () => {
    expect(sitePageSlugs).toEqual([
      'about',
      'how-it-works',
      'business',
      'contact',
      'legal',
      'privacy',
      'terms',
      'cookies',
    ]);
  });

  it('should validate known slugs', () => {
    expect(isSitePageSlug('legal')).toBe(true);
    expect(isSitePageSlug('unknown-page')).toBe(false);
  });

  it('should localize page content in English and Chinese', () => {
    const enPage = getLocalizedSitePage('en', 'terms');
    const zhPage = getLocalizedSitePage('zh', 'terms');

    expect(enPage.title).toBe('Terms of Service');
    expect(zhPage.title).toBe('服务条款');
    expect(enPage.sections.length).toBeGreaterThan(0);
    expect(zhPage.sections.length).toBeGreaterThan(0);
  });
});
