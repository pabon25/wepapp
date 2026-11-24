const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

function createServer() {
  return http.createServer((req, res) => {
    const requestedPath = req.url === '/login' ? '/login.html' :
      (req.url === '/' ? '/index.html' : req.url.split('?')[0]);
    const filePath = path.join(PUBLIC_DIR, path.basename(requestedPath));

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('404 - Page not found');
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(content);
    });
  });
}

if (require.main === module) {
  createServer().listen(PORT, '0.0.0.0', () =>
    console.log(`CODERWANDA WebApp running on port ${PORT}`));
}

module.exports = { createServer };
