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

import {APIAbstract} from "@core/server/APIAbstract";
import fetchProducts from "./requests/xapi.products.get";
import getInfo from "./requests/xapi.product.get";
import {XapiProductRate} from "./rate/XapiProductRate";
import {XapiProductSubscription} from "./subscription/XapiProductSubscription";

export class XapiProduct extends APIAbstract {
  public shop_name: string;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
    this.rate = new XapiProductRate(shop_name);
    this.subscription = new XapiProductSubscription(shop_name);
  }

  public rate: XapiProductRate;
  public subscription: XapiProductSubscription;

  public fetchProducts = fetchProducts;
  public getInfo = getInfo;
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiProduct {}
