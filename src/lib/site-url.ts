const DEFAULT_SITE_URL = 'https://chronomap.site';

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return DEFAULT_SITE_URL;
  }

  return configuredUrl.endsWith('/')
    ? configuredUrl.slice(0, -1)
    : configuredUrl;
}

