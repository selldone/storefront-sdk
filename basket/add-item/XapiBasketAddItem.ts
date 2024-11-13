/*
 * Copyright (c) 2023-2024. Selldone® Business OS™
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
 * Adds an item to the basket.
 *
 * This function is used to add a specified product variant to the basket with the given quantity and optional parameters.
 *
 * @param {number} product_id - The ID of the product to be added.
 * @param {number | null} variant_id - The ID of the product variant, or null if not applicable.
 * @param {number} count - The quantity of the item to be added.
 * @param {XapiBasketAddItemTypes.IOption} [options] - Optional parameters for adding the item.
 * @returns {Promise<XapiBasketAddItemTypes.IResponse>} - The response from the server after attempting to add the item.
 *
 * @example
 * window.$storefront.basket
 *   .addItem(product_id, variant_id, count, {
 *     preferences: preferences,
 *     vendor_product_id: vendor_product_id, // 🟣 Marketplace 🟣
 *     price_id: subscription_price_id, // 🎗️ Subscription
 *   })
 *   .then(({ basket, bill, refresh, error, error_msg }) => {
 *     if (basket) {
 *       this.setBasket(basket);
 *       this.setBasketBill(basket, bill);
 *       if (callbackSuccess) callbackSuccess(basket);
 *     }
 *
 *     if (error) {
 *       NotificationService.showErrorAlert(null, error_msg);
 *       if (callbackError) callbackError(error_msg!);
 *     }
 *
 *     if (refresh) this.fetchBasketAndShop(); // Important! Fetch data from server. (Ex. Remove item automatically from basket)
 *   })
 *   .catch((error) => {
 *     this.showLaravelError(error);
 *     if (callbackError) callbackError(error);
 *   });
 */
export default function XapiBasketAddItem(
  this: XapiBasket,
  product_id: number,
  variant_id: number | null,
  count: number,
  options?: XapiBasketAddItemTypes.IOption,
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
  return this.putNow<XapiBasketAddItemTypes.IResponse>(url, params, {
    accept_error_response:
      true /* It can return error and error_msg and at the same time return basket and bill! */,
  });
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiBasketAddItemTypes {
  export interface IResponse {
    error: boolean;
    error_msg: string | null;
    refresh?: boolean; // Request refresh page

    success: boolean;

    basket: Basket;
    bill: Basket.ICalculatedBill;
  }

  export interface IOption {
    currency?: keyof typeof Currency;
    preferences?: BasketItem.IPreferences | null;
    vendor_product_id?: number | null;
    price_id?: number | null;
  }
}
