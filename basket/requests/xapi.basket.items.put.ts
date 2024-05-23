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
import {BasketItem} from "@selldone/core-js/models/shop/order/basket/basket_item.model";
import {XapiBasket} from "../XapiBasket";
import {Basket} from "@selldone/core-js/models/shop/order/basket/basket.model";

/**
 * Fetches eligible coupons for the buyer.
 * Retrieves previously entered coupon codes from local storage.
 */

export default function addItem(
  this: XapiBasket,
  product_id: number,
  variant_id: number | null,
  count: number,
  options?: xapi.basket.items.put.IOption,
) {
  const params = {
    currency: options?.currency
      ? options.currency
      : window.$storefront.currency.code,

    variant_id: variant_id,
    count: count,
    preferences: options?.preferences,

    vendor_product_id: options?.vendor_product_id, // 🟣 Marketplace 🟣

    price_id: options?.price_id, // 🎗️ Subscription
  };

  const url = window.XAPI.PUT_PHYSICAL_ITEM_IN_BASKET(
    this.shop_name,
    product_id,
  );
  return this.putNow<xapi.basket.items.put.IResponse>(url, params, {
    accept_error_response:
      true /*It can return error and error_msg and at the same time return basket and bill!*/,
  });
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.basket.items.put {
  export interface IResponse {
    error: boolean;
    error_msg: string | null;
    refresh?: boolean; // Request refresh page

    success: boolean;

    basket: Basket;
    bill: Basket.IBill;
  }

  export interface IOption {
    currency?: keyof typeof Currency;
    preferences?: BasketItem.IPreferences | null;
    vendor_product_id?: number | null;
    price_id?: number | null;
  }
}
