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
import {Currency} from "@selldone/core-js/enums/payment/Currency";
import {Category} from "@selldone/core-js/models/shop/category/category.model";
import type {Article} from "@selldone/core-j";

/**
 * Language of returned article determine by 'X-Localization' in the header.
 *
 * @param product_id
 * @param options
 */
export default function getInfo(
  this: XapiProduct,
  product_id: string | number,
  options?: xapi.product.get.IOptions,
): Promise<xapi.product.get.IResponse> {
  product_id = parseInt("" + product_id);
  const url = window.XAPI.GET_PRODUCT_INFO(this.shop_name, product_id);

  return this.getNow<xapi.product.get.IResponse>(url, options, (caches) => {
    // Find product in previously fetched products list:
    let foundProduct = null;

    // @ts-ignore
    for (const [cacheKey, cacheValue] of caches.entries()) {
      const products = (cacheValue?.products as Product[]) || null || undefined;

      if (Array.isArray(products)) {
        const found = products.find((p) => p.id === product_id);

        if (found) {
          // console.log('WE FIND!', product_id, found);
          foundProduct = found;
          break; // Exit the loop once the product is found
        }
      }
    }

    if (foundProduct) return { product: foundProduct };
  });
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.product.get {
  export interface IResponse {
    product: Product & {
      article_pack: {
        article?: (Article & { tags: string[] }) | null;
        can_edit?: boolean; // Current user has access to edit article.

        // Current customer interactions with article:
        liked?: boolean;
        stared?: boolean;
        follow?: boolean;
        catch_power?: boolean;
        reported?: boolean;
      };
    };

    campaign_id: number | null;
    link_id: number | null;
    comments_count: number | null;
    "preferred-language": keyof typeof Currency;

    categories?: Pick<
      Category,
      "id" | "title" | "name" | "description" | "parent_id" | "icon"
    >[];

    // ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ 🟣 Marketplace 🟣 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
    vendors?: IVendorOptions[];
  }

  export interface IVendorOptions {
    id: number; // Corresponds to 'vendor_products.id AS id'
    name: string; // Corresponds to 'vendors.name AS name'
    description: string; // Corresponds to 'vendors.description AS description'
    icon: string; // Corresponds to 'vendors.icon AS icon'
    variant_id: number;
    price: number;
    currency: string;
    commission: number;
    discount: number;
    dis_start: Date;
    dis_end: Date;
    quantity: number;
    lead: number;
    page_id: number;
  }

  /**
   * Interface representing product options.
   *
   * @see getFilteredProducts for more details.
   */
  export interface IOptions {
    "augmented-categories"?: number; // Return n categories in the parent folder of current category
    "augmented-cross-sells"?: boolean; // Return cross-selling items (max 3 items)
    no_article?: boolean; // Not return article (product description)
  }
}
