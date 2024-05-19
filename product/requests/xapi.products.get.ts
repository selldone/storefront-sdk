/*
 * Copyright (c) 2023. Selldone® Business OS™
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

import {XapiProduct} from "../XapiProduct";
import {Product} from "@selldone/core-js/models/shop/product/product.model";
import {Category} from "@selldone/core-js/models/shop/category/category.model";

export default function fetchProducts(
  this: XapiProduct,
  dir: string | null = null,
  offset: number = 0,
  limit: number = 10,
  options?: xapi.products.get.IOptions,
): Promise<xapi.products.get.IResponse> {
  const url = window.XAPI.GET_PRODUCTS(this.shop_name);

  return this.getNow<xapi.products.get.IResponse>(url, {
    dir,
    offset,
    limit,
    ...options,
  });
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.products.get {
  export interface IResponse {
    products: Product.IProduct[];
    folders: Category.ICategory[];
    parent: Category.ICategory;

    // Add search info about limited timespan:
    after?: string | null;
    before?: string | null;

    // With total (if query with_total=true)
    total?: number;
    // Related list mode
    "relation-mode": string[] | "same-category";

    //Extra search objects
    tax_profile?: object | null;
    valuation?: object | null;
    time_filter?: object | null;
  }

  /**
   * Interface representing product options.
   *
   * @see getFilteredProducts for more details.
   */
  export interface IOptions {
    /**
     * Types of the product.
     */
    types?: Product.ProductType[] | null;

    /**
     * Statuses of the product.
     */
    statuses?: Product.ProductStatus[] | null;

    /**
     * Show only available products.
     * @default false
     * @example false
     */
    available?: boolean;

    /**
     * Limit number of categories.
     */
    categories_count?: number;

    /**
     * Return parent category of current category.
     * @default false
     * @example true
     */
    with_parent?: boolean;

    /**
     * Sort type of the list.
     * @example newest
     */
    sort?:
      | "most_visited"
      | "most_popular"
      | "newest"
      | "bestselling"
      | "cheapest"
      | "most_expensive"
      | "random"
      | "related";

    /**
     * Search text.
     * @example "example search text"
     *
     * User value '*' : It will return all products.
     */
    search?: string;

    /**
     * Search type. Can be null or category.
     * @example category
     */
    search_type?: "exact" | "quote" | "tax" | "valuation" | "new";

    /**
     * Multiple category IDs.
     */
    dirs?: string[];

    /**
     * Product filtering criteria.
     */
    filter?: IFilter | null;

    /**
     * Return only products.
     * @default false
     * @example true
     */
    products_only?: boolean;

    /**
     * Return only categories.
     * @default false
     * @example true
     */
    categories_only?: boolean;

    /**
     * Location constraints.
     *
     * Bounding coordinates for product location constraints.
     * Consists of [Lng1, Lat1, Lng2, Lat2].
     */
    bounds?: [number, number, number, number];

    /**
     * Filter products by tags.
     */
    tags?: string[];

    /**
     * Show products only for this vendor.
     */
    vendor_id?: string;

    /**
     * Controls category visibility.
     * true: Show only selected categories.
     * false: Show items inside selected categories.
     */
    surrounded?: boolean;

    /**
     * Only for this map tag ID.
     */
    map?: number | null;

    /**
     * Filter for starred products.
     */
    only_stared?: boolean;

    /**
     * Filter for wishlist products.
     */
    only_in_wishlist?: boolean;

    /**
     * Only return page if with_parent be true! It returns linked custom page of current category (parent).
     */
    with_page?: boolean;

    with_total?: boolean;
  }

  /**
   * IFilter interface represents the structure for filtering products.
   */
  export interface IFilter {
    /**
     * A flag indicating if only original products should be retrieved.
     */
    only_is_original?: boolean | null;

    /**
     * A flag indicating if only products with a discount should be retrieved.
     */
    only_has_discount?: boolean | null;

    /**
     * An array of price ranges for filtering products.
     */
    prices?: [number, number][] | null;

    /**
     * Brands to filter products by.
     */
    brands?: (string | null)[];

    /**
     * Selected product variants for filtering.
     */
    selected_variants?: any[][] | null;

    /**
     * Selected specifications for filtering products.
     */
    selected_spec?: any[][] | null;
  }
}
