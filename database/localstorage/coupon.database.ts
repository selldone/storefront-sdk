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

import { LocalStorages } from "../../../../core/helper/local-storage/LocalStorages";
import { StorefrontDatabase } from "../StorefrontDatabase";

export class CouponDatabase {
  /** Name of the shop for which the API operations will be performed. */
  public shop_name: string;

  constructor(shop_name: string) {
    this.shop_name = shop_name;
  }

  getCouponCodes() {
    const raw = localStorage.getItem(
      LocalStorages.GetShopCouponsCodes(window.$storefront.local_storage_path)
    );
    if (raw)
      try {
        const arr = JSON.parse(raw);
        if (arr && Array.isArray(arr)) return arr;
      } catch (e) {
        console.error(e);
      }
    return [];
  }

  addCouponCode(code:string) {
    const codes = window.$storefront.database.coupon.getCouponCodes();
    if (!codes.includes(code)) codes.push(code);

    localStorage.setItem(
        LocalStorages.GetShopCouponsCodes(window.$storefront.local_storage_path),
        JSON.stringify(codes)
    );
  }

  removeCouponCode(code:string) {
    const codes =  window.$storefront.database.coupon.getCouponCodes();
    if (codes.includes(code)) codes.splice(codes.indexOf(code), 1);

    localStorage.setItem(
        LocalStorages.GetShopCouponsCodes(window.$storefront.local_storage_path),
        JSON.stringify(codes)
    );
  }



}
