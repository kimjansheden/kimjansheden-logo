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

  // Drop console/debugger in build to avoid runtime noise
  esbuildOptions(options) {
    options.drop = ["console", "debugger"];
  },

  // Ensure .js files use .mjs extension for ESM
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".js",
    };
  },

  // Minify output for smaller bundle size
  minify: true,

  // Copy packaged CSS to dist and package root after build
  // Root copy provides a stable import path: 'kimjansheden-logo/styles.css'
  onSuccess:
    "cp src/styles.css dist/styles.css && cp src/styles.css styles.css",
});
