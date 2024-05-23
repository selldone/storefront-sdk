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

import type {XapiAvocado} from "../XapiAvocado";
import type {Avocado} from "@selldone/core-js/models/shop/order/avocado/avocado.order";

export default function getOrder(this: XapiAvocado, hash: string) {
  const url = window.XAPI.GET_CUSTOMER_INFO_FOR_AVOCADO(this.shop_name, hash);

  return this.getNow<xapi.avocado.order.get.IResponse>(url);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.avocado.order.get {
  export interface IResponse {
    avocado: Avocado;
  }
}
