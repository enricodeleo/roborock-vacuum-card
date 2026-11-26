// Bundles the card into dist/, which is what the Marketplace installs.
import { readFileSync } from "node:fs";
import * as esbuild from "esbuild";

const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url)));

const options = {
  entryPoints: ["src/roborock-vacuum-card.ts"],
  outfile: "dist/roborock-vacuum-card.js",
  bundle: true,
  format: "esm",
  target: "es2022",
  minify: true,
  legalComments: "none",
  loader: { ".svg": "text" },
  define: { __VERSION__: JSON.stringify(version) },
};

if (process.argv.includes("--watch")) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log("watching…");
} else {
  await esbuild.build(options);
}
