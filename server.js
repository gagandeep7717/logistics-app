import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createServer } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

async function createDevServer() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      const template = await vite.transformIndexHtml(url, '');
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });
}

async function createProdServer() {
  app.use(express.static(resolve(__dirname, 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'dist', 'index.html'));
  });
}

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  createDevServer();
} else {
  createProdServer();
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 