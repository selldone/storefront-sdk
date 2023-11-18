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
import type {ProductContent} from "@core/models/shop/product/product-content.model";
import type {ProductFile} from "@core/models/shop/product/product-file.model";


export default function getContents(
  this: XapiProductSubscription,
  product_id: string | number,
  offset:number,
  limit:number,

  options: xapi.product.subscription.contents.get.IOptions
) {
  const url = window.XAPI.GET_PRODUCT_MEMBERSHIP_CONTENTS(this.shop_name, product_id);
  const params = { offset: offset,limit:limit ,...options};
  return this.getNow<xapi.product.subscription.contents.get.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.product.subscription.contents.get {
  export interface IResponse {
    contents:(Pick<ProductContent, 'id'| 'shop_id'| 'product_id'| 'title'| 'description'|'rate'|'rate_count'|'created_at'|'updated_at'> &{
      files:Pick<ProductFile, 'id'| 'product_id'| 'content_id'| 'name'| 'size'>
    })[];
    total: number;
  }

  export interface IOptions {
    search?: string;
    sortBy?: string;
    sortDesc?: boolean;
  }


}
