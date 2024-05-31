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

import type {XapiProductRate} from "../XapiProductRate";
import type {ProductRating} from "@selldone/core-js/models/shop/product/product-rating.model";

/**
 * Submits a rating for a purchased product.
 *
 * @param product_id - The ID of the product being rated.
 * @param user_rating - An object where the key is a string representing the user and the value is a number between 1 and 5.
 * @returns A promise that resolves to the response of the rating submission.
 *
 * @example
 * ```typescript
 * // Assuming you have an instance of XapiProductRate
 * const xapiProductRate = new XapiProductRate();
 *
 * // Submit a rating
 * window.$storefront.products.rate.submitMyRate(12345, { "user123": 5 })
 *   .then(response => {
 *     console.log('Rating submitted successfully:', response);
 *   })
 *   .catch(error => {
 *     console.error('Error submitting rating:', error);
 *   });
 * ```
 */
export default function XapiProductRateSubmit(
  this: XapiProductRate,
  product_id: string | number,
  user_rating: Record<string, number>,
) {
  const url = window.XAPI.POST_SET_PRODUCT_RATING(this.shop_name, product_id);
  const params = { user_rating: user_rating };
  return this.postNow<XapiProductRateSubmitTypes.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiProductRateSubmitTypes {
  /**
   * The response structure for the product rating submission.
   */
  export interface IResponse {
    /**
     * Indicates if the rating submission was successful.
     */
    success: boolean;

    /**
     * An array of the user's ratings, each containing the rate ID and the value given.
     */
    my_ratings: { rate_id: number; value: number }[];

    /**
     * An array of overall product ratings, each including the rating ID, name, value, and count.
     */
    ratings: Pick<ProductRating, "id" | "name" | "value" | "count">[];

    /**
     * The total number of ratings the product has received.
     */
    rate_count: number;

    /**
     * The average rating of the product.
     */
    rate: number;
  }
}
