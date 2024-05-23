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
import {XapiBasket} from "../XapiBasket";
import {Basket} from "@selldone/core-js/models/shop/order/basket/basket.model";

/**
 * Fetches eligible coupons for the buyer.
 * Retrieves previously entered coupon codes from local storage.
 */

export default function removeItem(
  this: XapiBasket,
  product_id: number,
  variant_id: number | null,
  options?: xapi.basket.items.remove.IOption,
) {
  const params = {
    currency: options?.currency
      ? options.currency
      : window.$storefront.currency.code,

    variant_id: variant_id,
  };

  const url = window.XAPI.DELETE_PHYSICAL_ITEM_FROM_BASKET(
    this.shop_name,
    product_id,
  );
  return this.deleteNow<xapi.basket.items.remove.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.basket.items.remove {
  export interface IResponse {
    success: boolean;
    basket: Basket;
    bill: Basket.IBill;
  }

  export interface IOption {
    currency?: keyof typeof Currency;
  }
}
