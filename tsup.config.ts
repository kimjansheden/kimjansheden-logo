import { defineConfig } from "tsup";

export default defineConfig({
  // Define entry points
  entry: ["src/index.ts"],

  // Generate both ESM and CommonJS formats for maximum compatibility
  format: ["esm", "cjs"],

  // Generate declaration files (.d.ts)
  dts: true,

  // Clean output directory before build
  clean: true,

  // External dependencies that shouldn't be bundled
  external: ["react", "react-dom"],

  // JavaScript target version
  target: "es2020",

  // Source maps for debugging
  sourcemap: true,

  // Ensure .js files use .mjs extension for ESM
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".js",
    };
  },

  // Minify output for smaller bundle size
  minify: true,
});
