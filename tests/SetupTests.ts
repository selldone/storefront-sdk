/**
 * Injects necessary meta tags into JSDOM for Vitest testing.
 * These meta tags simulate the required environment for Selldone SDK, ensuring that
 * API endpoints, CDN paths, and shop-specific configurations are available during testing.
 *
 * ## How to Use:
 * - This function should be called before running tests in a JSDOM environment.
 * - It automatically inserts necessary `<meta>` tags into the document's `<head>`.
 * - You can import this function in your test setup or define it in `vitest.config.ts` under `setupFiles`.
 *
 * ## Example:
 * ```ts
 * import { setupMetaTags } from "../setupTests";
 * setupMetaTags();
 * ```
 *
 * Alternatively, configure Vitest to always run this before tests:
 * ```ts
 * // vitest.config.ts
 * export default defineConfig({
 *   test: {
 *     environment: "jsdom",
 *     setupFiles: "./setupTests.ts", // Ensures meta tags are available globally
 *   },
 * });
 * ```
 *
 * ## Purpose:
 * - **Service Configuration:** Defines the main service origin URL.
 * - **API Endpoints:** Specifies backend service URLs required for API interactions.
 * - **CDN URLs:** Configures paths for assets, images, and temporary files.
 * - **Storage Configuration:** Controls data storage redirection behavior.
 * - **Shop-Specific Settings:** Defines shop-related metadata such as name and prefix.
 * - **Custom Homepage:** Sets a default homepage route for the shop.
 */
export function setupMetaTags() {
    const metaTags = [
        // 🪁 Service Configuration
        { name: "service-url", content: "https://selldone.com" },

        // 🎯 API Endpoints
        { name: "selldone-gapi", content: "https://gapi.selldone.com" },
        { name: "selldone-xapi", content: "https://xapi.selldone.com" },
        { name: "selldone-iframe", content: "https://iframe.selldone.com" },
        { name: "selldone-capi", content: "https://capi.selldone.com" },

        // 🌍 CDN URLs
        { name: "selldone-cdn-images", content: "https://selldone.com/cdn-shop-images-1" },
        { name: "selldone-cdn-jsons", content: "https://selldone.com/cdn-shop-jsons-1" },
        { name: "selldone-cdn-videos", content: "https://selldone.com/cdn-videos" },
        { name: "selldone-cdn-temp-files", content: "https://selldone.com/cdn-shop-temp-files" },
        { name: "selldone-cdn-ar", content: "https://selldone.com/cdn-ar" },
        { name: "selldone-cdn-id", content: "https://selldone.com/cdn-id" },

        // 📦 Storage Configuration
        { name: "storage-redirect", content: "true" },
        { name: "storage-redirect-host", content: "https://cdn.selldone.com" },
        { name: "storage-redirect-thumbnails", content: "true" },

        // 🏬 Shop-Specific Settings
        { name: "shop-name", content: "my-sample" }, // Defines the name of the shop 'mega-store': for normal shop 'my-sample': for marketplace

        // 🎗 Shop Prefix Configuration
        { name: "shop-prefix-address", content: "" }, // Specifies the shop's URL prefix (e.g., "/my-shop-path")

        // 📰 Custom Homepage Setting
        { name: "custom-home", content: "shop" }, // Defines a custom homepage route for the shop
    ];

    // Inject each meta tag into the document head
    metaTags.forEach(({ name, content }) => {
        const meta = document.createElement("meta");
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
    });
}


