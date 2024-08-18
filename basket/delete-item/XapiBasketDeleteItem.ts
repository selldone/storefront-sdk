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
import {XapiBasket} from "../XapiBasket";
import {Basket} from "@selldone/core-js/index";

/**
 * Deletes an item from the basket.
 *
 * This function is used to remove a specified product variant from the basket.
 *
 * @param {number} product_id - The ID of the product to be deleted.
 * @param {number | null} variant_id - The ID of the product variant, or null if not applicable.
 * @param {XapiBasketDeleteItemTypes.IOption} [options] - Optional parameters for deleting the item.
 * @returns {Promise<XapiBasketDeleteItemTypes.IResponse>} - The response from the server after attempting to delete the item.
 *
 * @example
 * window.$storefront.basket
 *   .deleteItem(product_id, variant_id)
 *   .then(({ basket, bill }) => {
 *     this.setBasket(basket);
 *     this.setBasketBill(basket, bill);
 *     if (callbackSuccess) callbackSuccess(basket);
 *   })
 *   .catch((error) => {
 *     this.showLaravelError(error);
 *     if (callbackError) callbackError(error);
 *   });
 */
export default function XapiBasketDeleteItem(
  this: XapiBasket,
  product_id: number,
  variant_id: number | null,
  options?: XapiBasketDeleteItemTypes.IOption,
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
  return this.deleteNow<XapiBasketDeleteItemTypes.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiBasketDeleteItemTypes {
  export interface IResponse {
    success: boolean;
    basket: Basket;
    bill: Basket.ICalculatedBill;
  }

  export interface IOption {
    currency?: keyof typeof Currency;
  }
}
