import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import mysql from 'mysql2/promise';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const uploadsDir = path.join(rootDir, 'uploads');
const port = Number(process.env.PORT || 3000);

fs.mkdirSync(uploadsDir, { recursive: true });

const requiredDatabaseVariables = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
for (const variable of requiredDatabaseVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
});

const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
await pool.query(schema);

const slugify = (value) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 220) || 'news';

const [slugColumns] = await pool.query(
  `SELECT COLUMN_NAME
   FROM information_schema.COLUMNS
   WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'blog_posts' AND COLUMN_NAME = 'slug'`,
  [process.env.DB_NAME],
);

if (!slugColumns.length) {
  await pool.query('ALTER TABLE blog_posts ADD COLUMN slug VARCHAR(255) NULL AFTER id');
}

const [postsMissingSlugs] = await pool.query(
  `SELECT id, title FROM blog_posts WHERE slug IS NULL OR slug = '' ORDER BY id`,
);
const [existingSlugRows] = await pool.query(
  `SELECT slug FROM blog_posts WHERE slug IS NOT NULL AND slug <> ''`,
);
const reservedSlugs = new Set(existingSlugRows.map((row) => row.slug));

for (const post of postsMissingSlugs) {
  const baseSlug = slugify(post.title);
  let slug = baseSlug;
  let suffix = 2;
  while (reservedSlugs.has(slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
  await pool.execute('UPDATE blog_posts SET slug = ? WHERE id = ?', [slug, post.id]);
  reservedSlugs.add(slug);
}

const [slugIndexes] = await pool.query(
  `SELECT INDEX_NAME
   FROM information_schema.STATISTICS
   WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'blog_posts' AND COLUMN_NAME = 'slug' AND NON_UNIQUE = 0`,
  [process.env.DB_NAME],
);
if (!slugIndexes.length) {
  await pool.query('ALTER TABLE blog_posts ADD UNIQUE KEY uq_blog_posts_slug (slug)');
}
await pool.query('ALTER TABLE blog_posts MODIFY slug VARCHAR(255) NOT NULL');

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

const safeEqual = (left, right) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const requireAdmin = (request, response, next) => {
  const authorization = request.get('authorization') || '';
  const [scheme, encodedCredentials] = authorization.split(' ');

  if (scheme === 'Basic' && encodedCredentials) {
    const decoded = Buffer.from(encodedCredentials, 'base64').toString('utf8');
    const separator = decoded.indexOf(':');
    const username = separator >= 0 ? decoded.slice(0, separator) : '';
    const password = separator >= 0 ? decoded.slice(separator + 1) : '';

    if (
      safeEqual(username, process.env.ADMIN_USERNAME || 'qla.dev') &&
      safeEqual(password, process.env.ADMIN_PASSWORD || 'password123')
    ) {
      next();
      return;
    }
  }

  response.set('WWW-Authenticate', 'Basic realm="qla.dev admin", charset="UTF-8"');
  response.status(401).send('Authentication required.');
};

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_request, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase() || '.jpg';
    callback(null, `${Date.now()}-${crypto.randomUUID()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    callback(null, ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.mimetype));
  },
});

app.use('/uploads', express.static(uploadsDir, { maxAge: '7d', immutable: true }));

app.get('/api/blog-posts', async (_request, response, next) => {
  try {
    const [posts] = await pool.query(
      `SELECT id, slug, title, excerpt, content, image_url AS imageUrl,
              published_at AS publishedAt
       FROM blog_posts
       WHERE published_at <= NOW()
       ORDER BY published_at DESC, id DESC`,
    );
    response.json(posts);
  } catch (error) {
    next(error);
  }
});

app.get('/api/blog-posts/:slug', async (request, response, next) => {
  try {
    const [posts] = await pool.execute(
      `SELECT id, slug, title, excerpt, content, image_url AS imageUrl,
              published_at AS publishedAt
       FROM blog_posts
       WHERE slug = ? AND published_at <= NOW()
       LIMIT 1`,
      [request.params.slug],
    );
    if (!posts.length) {
      response.status(404).json({ error: 'Post not found.' });
      return;
    }
    response.json(posts[0]);
  } catch (error) {
    next(error);
  }
});

app.get('/admin', requireAdmin, (_request, response) => {
  response.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/api/admin/blog-posts', requireAdmin, async (_request, response, next) => {
  try {
    const [posts] = await pool.query(
      `SELECT id, slug, title, excerpt, content, image_url AS imageUrl,
              published_at AS publishedAt
       FROM blog_posts
       ORDER BY published_at DESC, id DESC`,
    );
    response.json(posts);
  } catch (error) {
    next(error);
  }
});

app.post('/api/admin/blog-posts', requireAdmin, upload.single('image'), async (request, response, next) => {
  try {
    const title = String(request.body.title || '').trim();
    const excerpt = String(request.body.excerpt || '').trim();
    const content = String(request.body.content || '').trim();
    const publishedAt = request.body.publishedAt || new Date();

    if (!title || !excerpt || !content) {
      if (request.file) fs.unlink(request.file.path, () => {});
      response.status(400).json({ error: 'Title, excerpt, and content are required.' });
      return;
    }

    const imageUrl = request.file ? `/uploads/${request.file.filename}` : null;
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let suffix = 2;
    while (true) {
      const [matchingSlugs] = await pool.execute('SELECT id FROM blog_posts WHERE slug = ? LIMIT 1', [slug]);
      if (!matchingSlugs.length) break;
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }
    const [result] = await pool.execute(
      `INSERT INTO blog_posts (slug, title, excerpt, content, image_url, published_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [slug, title, excerpt, content, imageUrl, publishedAt],
    );
    response.status(201).json({ id: result.insertId, slug, title, excerpt, content, imageUrl, publishedAt });
  } catch (error) {
    if (request.file) fs.unlink(request.file.path, () => {});
    next(error);
  }
});

app.delete('/api/admin/blog-posts/:id', requireAdmin, async (request, response, next) => {
  try {
    const [rows] = await pool.execute('SELECT image_url AS imageUrl FROM blog_posts WHERE id = ?', [request.params.id]);
    if (!rows.length) {
      response.status(404).json({ error: 'Post not found.' });
      return;
    }

    await pool.execute('DELETE FROM blog_posts WHERE id = ?', [request.params.id]);
    const imageUrl = rows[0].imageUrl;
    if (imageUrl?.startsWith('/uploads/')) {
      const imagePath = path.join(uploadsDir, path.basename(imageUrl));
      fs.unlink(imagePath, () => {});
    }
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const setMetaTag = (html, attribute, key, value) => {
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${key}["'][^>]*>`, 'i');
  const replacement = `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`;
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace('</head>', `  ${replacement}\n</head>`);
};

app.get('/blog/:slug', async (request, response, next) => {
  try {
    const [posts] = await pool.execute(
      `SELECT slug, title, excerpt, content, image_url AS imageUrl, published_at AS publishedAt
       FROM blog_posts
       WHERE slug = ? AND published_at <= NOW()
       LIMIT 1`,
      [request.params.slug],
    );
    if (!posts.length) {
      response.status(404).sendFile(path.join(distDir, 'index.html'));
      return;
    }

    const post = posts[0];
    const publicOrigin = (process.env.PUBLIC_URL || `${request.protocol}://${request.get('host')}`).replace(/\/$/, '');
    const canonicalUrl = `${publicOrigin}/blog/${encodeURIComponent(post.slug)}`;
    const imageUrl = post.imageUrl
      ? new URL(post.imageUrl, `${publicOrigin}/`).toString()
      : `${publicOrigin}/favicon.png`;
    const pageTitle = `${post.title} | qla.dev`;
    let html = await fs.promises.readFile(path.join(distDir, 'index.html'), 'utf8');

    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`);
    html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`);
    html = setMetaTag(html, 'name', 'title', pageTitle);
    html = setMetaTag(html, 'name', 'description', post.excerpt);
    html = setMetaTag(html, 'property', 'og:type', 'article');
    html = setMetaTag(html, 'property', 'og:url', canonicalUrl);
    html = setMetaTag(html, 'property', 'og:title', pageTitle);
    html = setMetaTag(html, 'property', 'og:description', post.excerpt);
    html = setMetaTag(html, 'property', 'og:image', imageUrl);
    html = setMetaTag(html, 'property', 'twitter:card', 'summary_large_image');
    html = setMetaTag(html, 'property', 'twitter:url', canonicalUrl);
    html = setMetaTag(html, 'property', 'twitter:title', pageTitle);
    html = setMetaTag(html, 'property', 'twitter:description', post.excerpt);
    html = setMetaTag(html, 'property', 'twitter:image', imageUrl);
    html = html.replace(
      '</head>',
      `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: imageUrl,
        datePublished: new Date(post.publishedAt).toISOString(),
        mainEntityOfPage: canonicalUrl,
        publisher: { '@type': 'Organization', name: 'qla.dev', url: publicOrigin },
      }).replaceAll('<', '\\u003c')}</script>\n</head>`,
    );
    response.type('html').send(html);
  } catch (error) {
    next(error);
  }
});

app.use(express.static(distDir));
app.use((request, response, next) => {
  if (request.method !== 'GET') {
    next();
    return;
  }
  response.sendFile(path.join(distDir, 'index.html'));
});

app.use((error, _request, response, _next) => {
  console.error(error);
  if (error instanceof multer.MulterError) {
    response.status(400).json({ error: error.message });
    return;
  }
  response.status(500).json({ error: 'The server could not complete this request.' });
});

app.listen(port, () => {
  console.log(`qla.dev server listening on http://localhost:${port}`);
});
