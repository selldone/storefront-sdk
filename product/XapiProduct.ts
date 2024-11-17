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

import {APIAbstract} from "@selldone/core-js/server/APIAbstract";
import XapiProductList from "./list/XapiProductList";
import XapiProductGet from "./get/XapiProductGet";
import {XapiProductRate} from "./rate/XapiProductRate";
import {XapiProductSubscription} from "./subscription/XapiProductSubscription";

export class XapiProduct extends APIAbstract {
  public shop_name: string;
  public rate: XapiProductRate;
  public subscription: XapiProductSubscription;

  /**
   * window.$storefront.products.list()
   */
  public list = XapiProductList;

  /** @deprecated fetchProducts*/
  public fetchProducts = XapiProductList;

  /**
   * window.$storefront.products.get()
   */
  public get = XapiProductGet;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
    this.rate = new XapiProductRate(shop_name);
    this.subscription = new XapiProductSubscription(shop_name);
  }
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiProductTypes {}
