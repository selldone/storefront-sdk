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

import { Currency } from "../../../../core/enums/payment/Currency";
import { XapiUser } from "../XapiUser";

export default function setUserCurrency(
  this: XapiUser,
  currency: keyof typeof Currency
) {
  const params = { currency: currency };
  const url = window.XAPI.PUT_SET_USER_CURRENCY(this.shop_name);
  return this.putNow<xapi.user.currency.put.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.user.currency.put {
  export interface IResponse {
    success: boolean;
    currency: keyof typeof Currency;
  }
}
