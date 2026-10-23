// Static preview with Vercel-style cleanUrls: /about -> about.html, unknown paths -> 404.html
const http = require('http'), fs = require('fs'), path = require('path'), zlib = require('zlib');
const root = path.resolve(process.argv[2]), port = +process.argv[3] || 8811;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain' };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const tries = [p, p + '.html', path.join(p, 'index.html')];
  for (const t of tries) {
    const f = path.join(root, t);
    if (f.startsWith(root) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      const type = types[path.extname(f)] || 'application/octet-stream';
      if (/text|javascript|svg|json|xml/.test(type) && /br/.test(req.headers['accept-encoding'] || '')) {
        res.writeHead(200, { 'Content-Type': type, 'Content-Encoding': 'br' });
        return fs.createReadStream(f).pipe(zlib.createBrotliCompress()).pipe(res);
      }
      res.writeHead(200, { 'Content-Type': type });
      return fs.createReadStream(f).pipe(res);
    }
  }
  res.writeHead(404, { 'Content-Type': types['.html'] });
  fs.createReadStream(path.join(root, '404.html')).pipe(res);
}).listen(port, () => console.log('serving', root, 'on', port));
