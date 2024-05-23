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
import {XapiOffer} from "../XapiOffer";
import {Offer} from "@selldone/core-js/models/shop/incentives/offer/offer.model";

export default function fetchOffers(
  this: XapiOffer,
  currency: keyof typeof Currency,
): Promise<xapi.offer.get.IResponse> {
  const params = {
    currency: currency,
  };
  const url = window.XAPI.GET_FETCH_OFFERS(this.shop_name);
  return this.getNow<xapi.offer.get.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.offer.get {
  export interface IResponse {
    offers: Partial<Offer>[];
  }

  export interface IOptions {
    limit?: number;
  }
}
