import { createServer as createViteServer } from "vite";
import { createReadStream, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const log = (message) => {
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  console.log(`${timestamp} [express] ${message}`);
};

export async function setupVite(app, server) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const template = await vite.transformIndexHtml(url, `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Portfolio Manager</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
      `);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

export function serveStatic(app) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");
  
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    const filePath = path.join(distPath, req.path === "/" ? "index.html" : req.path);
    
    try {
      const stat = statSync(filePath);
      if (stat.isFile()) {
        return createReadStream(filePath).pipe(res);
      }
    } catch {
      // File doesn't exist, serve index.html for SPA routing
    }
    
    try {
      const indexPath = path.join(distPath, "index.html");
      const stat = statSync(indexPath);
      if (stat.isFile()) {
        res.set("Content-Type", "text/html");
        return createReadStream(indexPath).pipe(res);
      }
    } catch {
      res.status(404).send("Not Found");
    }
  });
}