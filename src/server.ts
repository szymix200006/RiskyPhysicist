import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * ✅ Serve static files (for performance)
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * 🚀 **Skip SSR for `/game` to prevent Netlify timeout**
 */
app.get('/game', (req, res) => {
  res.sendFile(resolve(browserDistFolder, 'index.html'));
});

/**
 * ✅ Handle other requests with SSR
 */
app.use('/*', async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);
    if (response) {
      writeResponseToNodeResponse(response, res);
    } else {
      next();
    }
  } catch (error) {
    console.error('SSR Error:', error);
    next(error);
  }
});

/**
 * ✅ Start Express server
 */
if (isMainModule(import.meta.url)) {
  const port = process.env["PORT"] || 4000;
  app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
}

/**
 * ✅ Export request handler for Netlify
 */
export const reqHandler = createNodeRequestHandler(app);
