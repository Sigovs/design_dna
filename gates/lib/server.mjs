/* A static file server with no dependencies.
 *
 * It exists because the fixture runner used to spawn `python3 -m http.server`,
 * which on Windows resolves to a Store shim that exits immediately. The render
 * then failed, the runner printed "(render skipped)", and every measured
 * assertion silently fell back to the numbers recorded in the manifest — a
 * regression suite that cannot fail is worse than none, so the dependency is
 * gone. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.avif': 'image/avif', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8',
};

export async function serve(root, port = 0) {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent((req.url || '/').split('?')[0]);
    const file = join(root, normalize(path).replace(/^(\.\.[/\\])+/, ''));
    try {
      const info = await stat(file);
      if (info.isDirectory()) throw new Error('directory');
      const body = await readFile(file);
      /* range support, so a <video> can seek — the hero gate depends on it */
      const range = req.headers.range;
      const type = TYPES[extname(file).toLowerCase()] || 'application/octet-stream';
      if (range && /^bytes=\d*-\d*$/.test(range)) {
        const [s, e] = range.replace('bytes=', '').split('-');
        const start = s ? parseInt(s, 10) : 0;
        const end = e ? parseInt(e, 10) : body.length - 1;
        res.writeHead(206, {
          'content-type': type, 'accept-ranges': 'bytes',
          'content-range': `bytes ${start}-${end}/${body.length}`,
          'content-length': end - start + 1, 'cache-control': 'no-store',
        });
        return res.end(body.subarray(start, end + 1));
      }
      res.writeHead(200, { 'content-type': type, 'accept-ranges': 'bytes', 'cache-control': 'no-store' });
      res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('not found');
    }
  });
  await new Promise((r) => server.listen(port, '127.0.0.1', r));
  const { port: actual } = server.address();
  return { origin: `http://127.0.0.1:${actual}`, close: () => new Promise((r) => server.close(r)) };
}
