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
 * Set rate for purchased product.
 *
 * @param product_id
 * @param user_rating
 */
export default function submitMyRate(
  this: XapiProductRate,
  product_id: string | number,
  user_rating: Record<string, number>
): Promise<xapi.product.rate.submit.post.IResponse> {
  const url = window.XAPI.POST_SET_PRODUCT_RATING(this.shop_name, product_id);
  const params = { user_rating: user_rating };
  return this.postNow<xapi.product.rate.submit.post.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.product.rate.submit.post {
  export interface IResponse {
    success:boolean;
    my_ratings: {rate_id:number,value:number}[];
    ratings: Pick<ProductRating, 'id'| 'name'| 'value'| 'count'>[] ;
    rate_count: number ;
    rate: number ;

  }


}
