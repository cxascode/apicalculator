import fs from 'node:fs/promises';
import path from 'node:path';

const SITE_ORIGIN = 'https://cxascode.github.io';
const BASE_PATH = '/apicalculator';
const PUBLIC_DIR = path.resolve('public');
const lastmod = new Date().toISOString().slice(0, 10);

const urls = [`${SITE_ORIGIN}${BASE_PATH}/`];

function buildSitemap(urlList) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlList
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  const txt = `${urlList.join('\n')}\n`;
  return { xml, txt };
}

async function write() {
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  const { xml, txt } = buildSitemap(urls);
  await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
  await fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.txt'), txt, 'utf8');
}

write();
