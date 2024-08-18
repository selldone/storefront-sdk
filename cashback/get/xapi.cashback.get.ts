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

import {Currency} from "@selldone/core-js/enums/payment/Currency";
import {Cashback} from "@selldone/core-js";
import {XapiCashback} from "@selldone/sdk-storefront/cashback/XapiCashback";

/**
 * Fetches eligible cashback for the buyer.
 */

export default function XapiCashbackGet(
  this: XapiCashback,
  currency: keyof typeof Currency,
  amount: number,
) {
  const params = {
    currency: currency,
    amount: amount,
  };

  const url = window.XAPI.GET_SHOP_CASHBACK_PROGRAM(this.shop_name);
  return this.getNow<XapiCashbackGetTypes.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiCashbackGetTypes {
  export interface IResponse {
    cashback: Partial<Cashback>[];
  }
}
