import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.{test,spec,e2e-spec}.{ts,js}"],
    exclude: ["**/node_modules/**", "**/dist/**", ".idea/**", ".git/**"],
  },
  resolve: {
    tsconfigPaths: true,
  },
});
