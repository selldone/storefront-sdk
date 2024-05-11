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

import { Currency } from "@selldone/core-js/enums/payment/Currency";
import type {XapiAvocado} from "../XapiAvocado";
import type {Avocado} from "@selldone/core-js/models/shop/order/avocado/avocado.order";



export default function submitOrder(
  this: XapiAvocado,
  hash: string,
  currency: keyof typeof Currency,
) {
  const params = {
    currency: currency
  };

  const url = window.XAPI.POST_RESERVE_AVOCADO(
    this.shop_name,
      hash
  );
  return this.postNow<xapi.avocado.submit_order.post.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.avocado.submit_order.post {
  export interface IResponse {
    success:boolean;
    avocado: Avocado;
  }

}
