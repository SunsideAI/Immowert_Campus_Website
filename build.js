#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');

// Read a file, return empty string if not found
function read(filePath) {
  try { return fs.readFileSync(filePath, 'utf-8'); }
  catch { return ''; }
}

// Write file, creating directories as needed
function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

// Copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

// Parse frontmatter from HTML comment: <!-- { "key": "value" } -->
function parseFrontmatter(content) {
  const match = content.match(/^<!--\s*(\{[\s\S]*?\})\s*-->/);
  if (!match) return { meta: {}, body: content };
  try {
    const meta = JSON.parse(match[1]);
    const body = content.slice(match[0].length).trim();
    return { meta, body };
  } catch {
    return { meta: {}, body: content };
  }
}

// Build a single page
function buildPage(srcFile, distFile) {
  const raw = read(srcFile);
  const { meta, body } = parseFrontmatter(raw);

  const layout = meta.layout === 'seminar' ? 'seminar' : 'base';
  const layoutHtml = read(path.join(SRC, '_layouts', `${layout}.html`));
  const baseHtml = layout === 'seminar' ? read(path.join(SRC, '_layouts', 'base.html')) : null;

  const head = read(path.join(SRC, '_partials', 'head.html'));
  const nav = read(path.join(SRC, '_partials', 'nav.html'));
  const footer = read(path.join(SRC, '_partials', 'footer.html'));

  // Replace meta tokens in head partial
  const headFilled = head
    .replace(/{{TITLE}}/g, meta.title || 'ImmoWert Campus')
    .replace(/{{DESCRIPTION}}/g, meta.description || '')
    .replace(/{{CANONICAL}}/g, meta.canonical || '');

  // Fill layout with content
  let page = layoutHtml
    .replace(/{{CONTENT}}/g, body)
    .replace(/{{SEMINAR_TITLE}}/g, meta.title || '');

  // If seminar layout, embed into base layout
  if (layout === 'seminar' && baseHtml) {
    page = baseHtml
      .replace(/{{HEAD}}/g, headFilled)
      .replace(/{{NAV}}/g, nav)
      .replace(/{{CONTENT}}/g, page)
      .replace(/{{FOOTER}}/g, footer);
  } else {
    page = page
      .replace(/{{HEAD}}/g, headFilled)
      .replace(/{{NAV}}/g, nav)
      .replace(/{{FOOTER}}/g, footer);
  }

  write(distFile, page);
  console.log(`  Built: ${path.relative(__dirname, distFile)}`);
}

// Find all source pages
function findPages(dir, base = dir) {
  const pages = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) pages.push(...findPages(full, base));
    else if (entry.name.endsWith('.html')) pages.push(full);
  }
  return pages;
}

// Determine output path (use /index.html pattern for clean URLs)
function getDistPath(srcFile) {
  const rel = path.relative(path.join(SRC, 'pages'), srcFile);
  if (rel === 'index.html') return path.join(DIST, 'index.html');
  // e.g. seminare/foo.html → dist/seminare/foo/index.html
  const noExt = rel.replace(/\.html$/, '');
  return path.join(DIST, noExt, 'index.html');
}

// Main build
function build() {
  console.log('Building ImmoWert Campus...');
  fs.mkdirSync(DIST, { recursive: true });

  // Build pages
  const pagesDir = path.join(SRC, 'pages');
  for (const srcFile of findPages(pagesDir)) {
    buildPage(srcFile, getDistPath(srcFile));
  }

  // Copy static assets
  copyDir(path.join(SRC, 'css'), path.join(DIST, 'css'));
  copyDir(path.join(SRC, 'js'), path.join(DIST, 'js'));
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));

  console.log('Done.');
}

build();

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('Watching for changes...');
  fs.watch(SRC, { recursive: true }, (event, filename) => {
    if (filename) {
      console.log(`Changed: ${filename}`);
      try { build(); } catch (e) { console.error(e.message); }
    }
  });
}
