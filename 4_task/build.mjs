// build.mjs
import { build } from "esbuild";
import { rmSync, mkdirSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve("dist");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

await build({
  entryPoints: ["src/server.js"],
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node20",
  outfile: path.join(outDir, "server.js"),
  minifySyntax: true,
  minifyWhitespace: true,
  minifyIdentifiers: false,
  treeShaking: true,
  legalComments: "none",
  external: ["swagger-ui-express"],

  /* 🪄 додаємо require, module, __dirname, __filename */
  banner: {
    js: `
  import { createRequire } from 'node:module';
  //Закоментовано бо вже використовується в src/server.js і викликає дублікацію
  import { fileURLToPath } from 'node:url';
  const require = createRequire(import.meta.url);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname  = path.dirname(__filename);
  `,
  },
});

console.log("✅ ESM bundle → dist/server.js");
