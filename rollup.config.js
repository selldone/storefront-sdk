import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import url from "@rollup/plugin-url";
import terser from "@rollup/plugin-terser";

export default {
  input: "index.ts", // Your entry point
  output: [
    {
      file: "dist/bundle.js",
      format: "iife", // Immediately Invoked Function Expression for standalone bundle
      name: "storefront", // Global variable name for your library
      sourcemap: true,
    },
    {
      file: "dist/bundle.min.js",
      format: "iife", // Immediately Invoked Function Expression for standalone bundle
      name: "storefront", // Global variable name for your library
      sourcemap: true,
      plugins: [terser()], // Minify this output
    },
    {
      file: "dist/index.esm.js",  // ✅ ADD THIS FOR ES MODULE SUPPORT
      format: "esm",              // ✅ Generate ES Module
      sourcemap: true,
    },
    {
      file: "dist/index.cjs",      // ✅ ADD THIS FOR COMMONJS SUPPORT
      format: "cjs",               // ✅ Generate CommonJS Module
      sourcemap: true,
    }
  ],
  external: (id) => id.includes(".test.ts"), // ✅ Exclude test files
  plugins: [
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: "./sdk-tsconfig.json",
      exclude: ["**/*.test.ts", "**/__tests__/**/*"], // ✅ Ensure tests are excluded
    }),
    url({
      include: [
        "**/*.svg",
        "**/*.png",
        "**/*.jpg",
        "**/*.jpeg",
        "**/*.gif",
        "**/*.webp",
      ], // Include all image
      limit: 0, // Don't inline, just copy to dist
      destDir: "dist/assets/images", // Destination directory
    }),
    url({
      include: ["**/*.woff", "**/*.woff2", "**/*.ttf", "**/*.eot"], // Include all font files
      limit: 0, // Don't inline, just copy to dist
      destDir: "dist/assets/fonts", // Destination directory
    }),

    url({
      include: ["**/*.mp3"], // Include all sounds
      limit: 0, // Don't inline, just copy to dist
      destDir: "dist/assets/sound", // Destination directory
    }),
  ],
};
