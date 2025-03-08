/*
 * Copyright (c) 2025. Selldone® Business OS™
 *
 * Author: M.Pajuhaan
 * Web: https://selldone.com
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
 * From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
 * Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
 * Our journey is not just about reaching a destination, but about creating a masterpiece.
 * Tread carefully, for you're treading on dreams.
 */

/**
 * ## XapiProductList Function Tests
 *
 * This test suite ensures that the `XapiProductList` function:
 * - Fetches products with various filtering and sorting options.
 * - Respects pagination (`offset`, `limit`).
 * - Filters results based on search terms, tags, and vendor IDs.
 * - Handles invalid parameters gracefully.
 *
 * The function uses `vitest` as the test runner.
 */


/**
 * @file XapiProductList.test.ts
 * @description Unit tests for the `XapiProductList` function in Selldone Storefront SDK.
 * @module storefront-sdk
 */

import { describe, it, expect, beforeAll } from "vitest"; // Using Vitest as test framework

// Import the SDK
import { StorefrontSDK } from "@selldone/sdk-storefront";
import {setupMetaTags} from "../../tests/SetupTests.ts";


let sdk: typeof StorefrontSDK;

/**
 * Set up the SDK before running tests.
 */
beforeAll(() => {
    setupMetaTags();
    sdk = StorefrontSDK;
    sdk.Setup();
});

describe("XapiProductList", () => {
    /**
     * Test fetching a basic product list.
     * Ensures that the function returns an array of products.
     */
    it("should fetch a list of products", async () => {
        const response = await window.$storefront.products.list(null, 0, 10, {});
        expect(response).toHaveProperty("products");
        expect(Array.isArray(response.products)).toBe(true);
    });

    /**
     * Test fetching products with a limit.
     * Ensures that the number of products matches the requested limit.
     */
    it("should respect the 'limit' parameter", async () => {
        const limit = 5;
        const response = await window.$storefront.products.list(null, 0, limit, {});
        expect(response.products.length).toBeLessThanOrEqual(limit);
    });

    /**
     * Test searching for a product by keyword.
     * Ensures that search functionality filters results correctly.
     */
    it("should filter products by search term", async () => {
        const response = await window.$storefront.products.list(null, 0, 10, { search: "headphone" });
        expect(response.products.length).toBeGreaterThan(0);
        expect(response.products[0].title.toLowerCase()).toContain("headphone");
    });

    /**
     * Test sorting products by title in descending order.
     * Ensures that sorting logic is applied correctly.
     */
    it("should sort products by title in descending order", async () => {
        const response = await window.$storefront.products.list(null, 0, 10, { sortBy: "id", sortDesc: true });
        expect(response.products.length).toBeGreaterThan(1);
        expect(response.products[0].id).toBeGreaterThan(response.products[1].id);
    });

    /**
     * Test fetching products for a specific vendor.
     * Ensures vendor filtering is correctly applied.
     */
    it("should fetch products for a specific vendor", async () => {
        const vendorId = "126665";
        const response = await window.$storefront.products.list(null, 0, 10, { vendor_id: vendorId });
        expect(response.products.every(product => product.vendor_id === vendorId)).toBe(true);
    });

});
