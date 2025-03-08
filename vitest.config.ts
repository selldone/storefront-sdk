import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
    test: {
        environment: "jsdom", // ✅ Simulates a browser environment with `window`
        include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'], // ✅ Correct test file pattern
        exclude: [...configDefaults.exclude], // ✅ Do not exclude .test.ts files
    },
});
