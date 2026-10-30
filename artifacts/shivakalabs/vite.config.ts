import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// PORT and BASE_PATH are set by Replit and by the GitHub Pages workflow.
// Sensible defaults let a plain `pnpm build` / `pnpm dev` work anywhere.
const port = Number(process.env.PORT ?? 5173);
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

const basePath = process.env.BASE_PATH ?? "/";
const base = basePath.endsWith("/") ? basePath : `${basePath}/`;

// Public URL of the deployed site (no trailing slash). Used for canonical
// links, Open Graph tags, structured data and the sitemap.
process.env.VITE_SITE_URL = (
  process.env.VITE_SITE_URL ?? "https://teddylumidi.github.io/shivakalabs"
).replace(/\/+$/, "");

export default defineConfig({
  base,
  plugins: [
    react(),
    runtimeErrorOverlay(),
    // Fix root-relative paths in index.html (preload, favicon) to use the correct base
    {
      name: 'rewrite-html-asset-paths',
      transformIndexHtml(html) {
        return html
          .replace(/href="\/img\//g, `href="${base}img/`)
          .replace(/href="\/apple-touch-icon\.png"/g, `href="${base}apple-touch-icon.png"`);
      },
    },
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    target: "es2020",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Bundle react + react-dom together in one vendor chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Router in its own chunk — shared by all pages
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    // Inline tiny assets (< 4 KB) as base64 to save round trips
    assetsInlineLimit: 4096,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
