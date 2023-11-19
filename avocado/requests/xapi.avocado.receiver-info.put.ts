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
import type {Avocado} from "@core/models/shop/order/avocado/avocado.order";
import type {Basket} from "@core/models/shop/order/basket/basket.model";



export default function updateReceiverInfo(
  this: XapiAvocado,
  hash: string,
  receiver_info: Basket.IReceiverInfo,
) {
  const params = {
    receiver_info: receiver_info
  };

  const url = window.XAPI.PUT_SET_CUSTOMER_INFO_FOR_AVOCADO(
    this.shop_name,
      hash
  );
  return this.putNow<xapi.avocado.receiver_info.put.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.avocado.receiver_info.put{
  export interface IResponse {
    success:boolean;
    avocado: Avocado;
  }

}
