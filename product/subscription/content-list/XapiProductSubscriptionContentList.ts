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

import type {XapiProductSubscription} from "../XapiProductSubscription";
import type {ProductContent} from "@selldone/core-js/models/shop/product/product-content.model";
import type {ProductFile} from "@selldone/core-js/models/shop/product/product-file.model";

/**
 * Fetches a list of content for a subscribed product.
 *
 * @param product_id - The ID of the product whose content is being fetched.
 * @param offset - The offset for pagination.
 * @param limit - The number of items to fetch.
 * @param options - Additional options for fetching the content, such as search, sorting, and sort direction.
 * @returns A promise that resolves to the response containing the content list and total count.
 *
 * @example
 * ```typescript
 * // Assuming you have an instance of XapiProductSubscription
 * const xapiProductSubscription = new XapiProductSubscription();
 *
 * // Fetch product contents
 * xapiProductSubscription.getContents(12345, 0, 10, { search: "example", sortBy: "title", sortDesc: true })
 *   .then(response => {
 *     console.log('Contents fetched successfully:', response);
 *   })
 *   .catch(error => {
 *     console.error('Error fetching contents:', error);
 *   });
 * ```
 */
export default function XapiProductSubscriptionContentList(
  this: XapiProductSubscription,
  product_id: string | number,
  offset: number,
  limit: number,
  options: XapiProductSubscriptionContentListTypes.IOptions,
) {
  const url = window.XAPI.GET_PRODUCT_MEMBERSHIP_CONTENTS(
    this.shop_name,
    product_id,
  );
  const params = {  ...options,offset: offset, limit: limit };
  return this.getNow<XapiProductSubscriptionContentListTypes.IResponse>(
    url,
    params,
  );
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiProductSubscriptionContentListTypes {
  /**
   * Response interface for the product subscription content list.
   */
  export interface IResponse {
    contents: (Pick<
      ProductContent,
      | "id"
      | "shop_id"
      | "product_id"
      | "title"
      | "description"
      | "rate"
      | "rate_count"
      | "created_at"
      | "updated_at"
    > & {
      files: Pick<
        ProductFile,
        "id" | "product_id" | "content_id" | "name" | "size"
      >;
    })[];
    total: number;
  }

  /**
   * Options interface for fetching the product subscription content list.
   */
  export interface IOptions {
    search?: string;
    sortBy?: string;
    sortDesc?: boolean;
  }
}
