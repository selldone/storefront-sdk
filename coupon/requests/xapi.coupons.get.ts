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
import { Coupon } from "../../../../core/models/shop/incentives/coupon/coupon.model";
import {XapiCoupon} from "../XapiCoupon";

/**
 * Fetches eligible coupons for the buyer.
 * Retrieves previously entered coupon codes from local storage.
 */

export default function fetchAvailableCoupons(
  this: XapiCoupon,
  currency: keyof typeof Currency
) {
  const params = { currency: currency, codes: window.$storefront.database.coupon.getCouponCodes(), };

  const url = window.XAPI.GET_FETCH_COUPONS(this.shop_name);
  return this.getNow<xapi.coupons.get.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.coupons.get {
  export interface IResponse {
    coupons: Partial<Coupon>[];
  }
}
