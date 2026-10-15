import { SITE_ORIGIN } from './lib/site.js';

const PRODUCTION_ORIGIN = SITE_ORIGIN;
const DEFAULT_PATH = '/apicalculator/';

const DEFAULT_TITLE = 'CX as Code API calculator';
const DEFAULT_DESCRIPTION =
  'Estimate monthly Genesys Cloud API on-demand allocation from fair use policy tables by billable user type, license tier, and user count.';

function pageOrigin() {
  if (typeof window === 'undefined') return PRODUCTION_ORIGIN;
  return window.location.origin;
}

function upsertMetaByName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaByProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export function applyPageSeo() {
  if (typeof document === 'undefined') return;

  const url = new URL(DEFAULT_PATH, pageOrigin()).toString();

  document.title = DEFAULT_TITLE;
  upsertCanonical(url);
  upsertMetaByName('description', DEFAULT_DESCRIPTION);
  upsertMetaByProperty('og:title', DEFAULT_TITLE);
  upsertMetaByProperty('og:description', DEFAULT_DESCRIPTION);
  upsertMetaByProperty('og:url', url);
  upsertMetaByName('twitter:title', DEFAULT_TITLE);
  upsertMetaByName('twitter:description', DEFAULT_DESCRIPTION);
}
