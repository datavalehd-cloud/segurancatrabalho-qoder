import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.argv[2] || process.cwd();
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.ico': 'image/x-icon' };

http.createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const safe = normalize(p).replace(/^[.]+[/\\]/, '');
  const fp = join(root, safe);
  try {
    const buf = await readFile(fp);
    res.writeHead(200, { 'content-type': types[extname(fp)] || 'application/octet-stream' });
    res.end(buf);
  } catch {
    try {
      const buf = await readFile(join(root, 'index.html'));
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end(buf);
    } catch { res.writeHead(404); res.end('nf'); }
  }
}).listen(4173, () => console.log('serving ' + root + ' on http://127.0.0.1:4173'));
