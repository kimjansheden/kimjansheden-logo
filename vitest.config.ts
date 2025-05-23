import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    // Use jsdom environment for React component testing
    environment: "jsdom",

    // Setup files to run before each test
    setupFiles: ["./src/test-setup.ts"],

    // Coverage configuration for test coverage reports
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}", "src/test-setup.ts"],
    },

    // Global test configurations
    globals: true,
  },

  // Configure path aliases for imports
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
