import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');
const siteOrigin = 'https://qla.dev';

const pages = [
  {
    route: '/techpark',
    lang: 'bs',
    locale: 'bs_BA',
    alternateLocale: 'en_US',
    title: 'qla.dev Techpark - Kreativni tech prostor za djecu i mlade u Sarajevu',
    description: 'Techpark je kreativni tech prostor za djecu i mlade, sa open-space clanstvom, programima, gaming sadrzajem i maker opremom.',
    image: `${siteOrigin}/logo-techpark.png`,
  },
  {
    route: '/techpark/boot-camp',
    lang: 'bs',
    locale: 'bs_BA',
    alternateLocale: 'en_US',
    title: 'qla.dev Techpark - Boot-camp programi',
    description: 'Pregledaj Techpark boot-camp programe za web, app, AI, 3D, game development, Roblox, dizajn i video editing.',
    image: `${siteOrigin}/logo-techpark.png`,
  },
  {
    route: '/techpark/membership',
    lang: 'bs',
    locale: 'bs_BA',
    alternateLocale: 'en_US',
    title: 'qla.dev Techpark - Membership rezervacije',
    description: 'Rezervisi Techpark open-space termine od 08:00 do 16:00, sa limitom od 15 osoba i maksimalno 4 sata dnevno.',
    image: `${siteOrigin}/logo-techpark.png`,
  },
  {
    route: '/techpark/line-follower-hackathone',
    lang: 'bs',
    locale: 'bs_BA',
    alternateLocale: 'en_US',
    title: 'qla.dev Techpark - Line-Follower Hackathon',
    description: '48h roboticki sprint sa istim kitom za sve timove, Beginner i Advanced trackovima, i mapama koje se otkrivaju na startu.',
    image: `${siteOrigin}/logo-techpark.png`,
  },
  {
    route: '/techpark/sign-in',
    lang: 'bs',
    locale: 'bs_BA',
    alternateLocale: 'en_US',
    title: 'qla.dev Techpark - Prijava clanova',
    description: 'Visekorak prijava za Techpark clanove, rezervacije, programe i buduci attendance check-in.',
    image: `${siteOrigin}/logo-techpark.png`,
  },
];

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const replaceOrThrow = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) {
    throw new Error(`Could not find ${label} in dist/index.html`);
  }

  return html.replace(pattern, replacement);
};

const setMetaTag = (html, attrName, attrValue, content) =>
  replaceOrThrow(
    html,
    new RegExp(`<meta\\s+${attrName}="${attrValue}"\\s+content="[^"]*">`, 'i'),
    `<meta ${attrName}="${attrValue}" content="${escapeHtml(content)}">`,
    `meta ${attrName}=${attrValue}`,
  );

const setLinkTag = (html, rel, href) =>
  replaceOrThrow(
    html,
    new RegExp(`<link\\s+rel="${rel}"\\s+href="[^"]*">`, 'i'),
    `<link rel="${rel}" href="${escapeHtml(href)}">`,
    `link rel=${rel}`,
  );

const setTitleTag = (html, title) =>
  replaceOrThrow(
    html,
    /<title>[^<]*<\/title>/i,
    `<title>${escapeHtml(title)}</title>`,
    'title tag',
  );

const setHtmlLang = (html, lang) =>
  replaceOrThrow(
    html,
    /<html\s+lang="[^"]+"/i,
    `<html lang="${lang}"`,
    'html lang',
  );

const buildPageHtml = (template, page) => {
  const url = `${siteOrigin}${page.route}`;
  let html = template;

  html = setHtmlLang(html, page.lang);
  html = setTitleTag(html, page.title);
  html = setMetaTag(html, 'name', 'title', page.title);
  html = setMetaTag(html, 'name', 'description', page.description);
  html = setLinkTag(html, 'canonical', url);
  html = setMetaTag(html, 'property', 'og:url', url);
  html = setMetaTag(html, 'property', 'og:title', page.title);
  html = setMetaTag(html, 'property', 'og:description', page.description);
  html = setMetaTag(html, 'property', 'og:image', page.image);
  html = setMetaTag(html, 'property', 'og:locale', page.locale);
  html = setMetaTag(html, 'property', 'og:locale:alternate', page.alternateLocale);
  html = setMetaTag(html, 'property', 'twitter:url', url);
  html = setMetaTag(html, 'property', 'twitter:title', page.title);
  html = setMetaTag(html, 'property', 'twitter:description', page.description);
  html = setMetaTag(html, 'property', 'twitter:image', page.image);

  return html;
};

const main = async () => {
  const template = await readFile(templatePath, 'utf8');

  await Promise.all(
    pages.map(async (page) => {
      const outputDir = path.join(distDir, page.route.replace(/^\//, ''));
      const outputPath = path.join(outputDir, 'index.html');
      const html = buildPageHtml(template, page);

      await mkdir(outputDir, { recursive: true });
      await writeFile(outputPath, html, 'utf8');
    }),
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
