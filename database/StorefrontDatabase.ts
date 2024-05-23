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

import {CouponDatabase} from "./localstorage/coupon.database";
import {CurrencyDatabase} from "./localstorage/currency.database";
import {LanguageDatabase} from "./localstorage/language.database";

export class StorefrontDatabase {
  /** Name of the shop for which the API operations will be performed. */
  public shop_name: string;

  public coupon: CouponDatabase;
  public currency: CurrencyDatabase;
  public language: LanguageDatabase;

  constructor(shop_name: string) {
    this.shop_name = shop_name;

    this.coupon = new CouponDatabase(this.shop_name);
    this.currency = new CurrencyDatabase(this.shop_name);
    this.language = new LanguageDatabase(this.shop_name);
  }
}
