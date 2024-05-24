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

import {APIAbstract} from "@selldone/core-js";
import {XapiExchangeRate} from "./exchange-rates/XapiExchangeRate";
import {ExchangeRate} from "@selldone/core-js";
import {StorefrontLocalStorages} from "@selldone/core-js/helper/local-storage/StorefrontLocalStorages";
import {Shop} from "@selldone/core-js/models/shop/shop.model";
import type {Basket} from "@selldone/core-js/models/shop/order/basket/basket.model";
import {XapiLanguage} from "./language/XapiLanguage";
import {Popup} from "@selldone/core-js/models/shop/popup/popup.model";
import type {GatewayQue} from "@selldone/core-js/models/shop/payment/gateway-que.model";
import {Club} from "@selldone/core-js/models/shop/club/club.model";
import {Transportation} from "@selldone/core-js/models/shop/transportation/transportation.model";
import {Gateway} from "@selldone/core-js/models/shop/gateway/gateway.model";
import {ShopMenu} from "@selldone/core-js/models/shop/design/menu.model";
import {ProductBadge} from "@selldone/core-js/models/shop/product/badge.model";

/**
 * The `XapiShop` class provides an interface to interact with the shop-related
 * services on the backend, particularly around retrieving shop information.
 * It extends the base `APIAbstract` class.
 *
 * @extends APIAbstract
 */
export class XapiShop extends APIAbstract {
  /** Name of the shop for which the API operations will be performed. */
  public shop_name: string;

  /**
   * API abstraction for exchange rate related operations.
   */
  public exchange: XapiExchangeRate;

  /**
   * API abstraction for language related operations.
   */
  public language: XapiLanguage;

  /**
   * Creates an instance of the `XapiShop`.
   *
   * @param shop_name - Name of the shop.
   */
  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;

    this.exchange = new XapiExchangeRate(shop_name);
    this.language = new XapiLanguage(shop_name);
  }

  /**
   * Fetches information about a shop.
   *
   * @returns Promise that resolves with shop information.
   */
  public fetchShop(): Promise<XapiShop.IGetShopInfoResponse> {
    const url = window.XAPI.GET_SHOP_INFO(this.shop_name);
    // @ts-ignore
    const guest_codes = StorefrontLocalStorages.GetShopHistoryGuestAllCodes().limit(10); // We use it to get pending transactions!
    const params = { guest_codes: guest_codes };
    return this.getNow<XapiShop.IGetShopInfoResponse>(url, params);
  }
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiShop {
  /**
   * Represents the response returned when fetching shop information.
   */
  export interface IGetShopInfoResponse {
    success: boolean;
    shop: Shop & {
      transportations: Transportation[];
      shop_exchange_rates: ExchangeRate[];
      gateways: Gateway[];
      menus: ShopMenu[];
      product_badges: ProductBadge[];

      /**
       * The currently active popup intended for the customer's display.
       * It's determined by the [S-Pops] header sent by the client (webapp).
       * [S-Pops] follows a JSON structure: {key(popup_id):Date, last:Current Date}.
       * The backend also appends this popup's ID with the current date to the `seen_pops` in the response.
       */
      popup?: Partial<Popup>;

      /**
       * 🥶 Guest code (use for guest basket)
       */
      guest_code?: string | null;
    };

    baskets?: Basket[];

    /**
     * Pending payments for the current customer.
     */
    pending_transactions?: GatewayQue[] | null;

    /**
     * Current customer club.
     */
    club: Club | null;

    /**
     * Represents the state of an order.
     */
    orders_state: OrdersState[];

    /**
     * Represents a location with longitude and latitude.
     */
    initial_location: ILocation;

    /**
     * List of viewed popups. Their stringified values should be included in the [S-Pops] header of requests.
     */
    seen_pops?: ISeenPopup;
  }

  export interface OrdersState {
    count: number;
    delivery_state: string;
    type: string;
  }

  export interface ILocation {
    lng: number;
    lat: number;
  }

  export interface ISeenPopup {
    last: string; // Date format

    [key: number]: string; // Date format
  }
}
