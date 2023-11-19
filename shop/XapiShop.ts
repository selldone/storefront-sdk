import { APIAbstract } from "@core/server/APIAbstract";
import { XapiExchangeRate } from "./exchange-rates/XapiExchangeRate";
import { ExchangeRate } from "@core/models/shop/payment/exchange_rate.model";
import { LocalStorages } from "@core/helper/local-storage/LocalStorages";
import { Shop } from "@core/models/shop/shop.model";
import type { Basket } from "@core/models/shop/order/basket/basket.model";
import { XapiLanguage } from "./language/XapiLanguage";
import { Popup } from "@core/models/shop/popup/popup.model";
import type { GatewayQue } from "@core/models/shop/payment/gateway-que.model";
import {Club} from "@core/models/shop/club/club.model";

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
    const guest_codes = LocalStorages.GetShopHistoryGuestAllCodes().limit(10); // We use it to get pending transactions!
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
    [key: number]: string; // Date format
    last: string; // Date format
  }
}
