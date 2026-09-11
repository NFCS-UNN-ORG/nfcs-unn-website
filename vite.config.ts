import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

function vercelApiDevPlugin(): Plugin {
  return {
    name: 'vercel-api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const apiName = parsedUrl.pathname.replace(/^\/api\//, '').split('/')[0].split('?')[0];
        const apiFile = path.resolve(__dirname, 'api', `${apiName}.js`);

        if (!fs.existsSync(apiFile)) {
          return next();
        }

        try {
          // Parse request body for POST/PUT/PATCH/DELETE
          let body: any = null;
          if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method || '')) {
            const chunks: Buffer[] = [];
            for await (const chunk of req) {
              chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
            }
            const rawBody = Buffer.concat(chunks).toString('utf8');
            if (rawBody) {
              try {
                body = JSON.parse(rawBody);
              } catch {
                body = rawBody;
              }
            }
          }

          (req as any).body = body;
          (req as any).query = Object.fromEntries(parsedUrl.searchParams.entries());

          // Enhance res to match Vercel Serverless Function response interface
          const enhancedRes = res as any;
          enhancedRes.status = function (statusCode: number) {
            enhancedRes.statusCode = statusCode;
            return enhancedRes;
          };
          enhancedRes.json = function (jsonBody: any) {
            if (!enhancedRes.headersSent) {
              enhancedRes.setHeader('Content-Type', 'application/json');
            }
            enhancedRes.end(JSON.stringify(jsonBody));
            return enhancedRes;
          };

          const module = await server.ssrLoadModule(apiFile);
          const handler = module.default;
          if (typeof handler === 'function') {
            await handler(req, enhancedRes);
          } else {
            enhancedRes.status(500).json({ error: `Handler in ${apiName}.js is not a default export function` });
          }
        } catch (err: any) {
          console.error(`Error in /api/${apiName}:`, err);
          if (!res.headersSent) {
            (res as any).status(500).json({ error: err.message || 'Internal Server Error' });
          }
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), vercelApiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
