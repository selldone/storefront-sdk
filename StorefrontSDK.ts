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

import SetupService from "@core/server/SetupService";
import { XapiUser } from "./user/XapiUser";
import XAPI from "./apis/XAPI";
import { XapiShop } from "./shop/XapiShop";
import CDN from "@core/server/CDN";
import URLS from "@core/server/URLS";
import { XapiAuth } from "./auth/XapiAuth";
import { Shop } from "@core/models/shop/shop.model";
import { StorefrontAxiosSetup } from "./plugins/axios/StorefrontAxiosSetup";
import { XapiProduct } from "./product/XapiProduct";
import { XapiLottery } from "./lottery/XapiLottery";
import { StorefrontDatabase } from "./database/StorefrontDatabase";
import { XapiCoupon } from "./coupon/XapiCoupon";
import { XapiOffer } from "./offer/XapiOffer";
import { Currency, type ICurrency } from "@core/enums/payment/Currency";

import { XapiBasket } from "./basket/XapiBasket";
import { XapiVendor } from "./vendor/XapiVendor";
import { XapiAvocado } from "./avocado/XapiAvocado";
import { XapiArticle } from "./article/XapiArticle";

const SDK_VERSION = "0.01";
//█████████████████████████████████████████████████████████████
//―――――――――――――― Global Types ―――――――――――――――
//█████████████████████████████████████████████████████████████

// Extend the Window interface to recognize the properties you add to the global window object.
declare global {
  interface Window {
    NativeApp?: boolean;
    axios: any;
    SelldoneUser?: {
      access_token: string;
      /**
       * The expires_in field specifies the time at which the access token expires, represented in seconds since the token was issued.
       */
      expires_in: number;
      refresh_token?: string | null;
    };

    /**
     *  🚀 Preloaded Shop Information
     *
     *  When the shop page loads, the backend might already populate `window.shop` with relevant shop data.
     *
     *  Example:
     *      window.shop = {!! json_encode(\App\Shop\Shop::GetPublicInfo($shop->name, null, false)) !!};
     */

    shop: Partial<Shop>;

    // APIs
    CDN: CDN;
    XAPI: XAPI;
    URLS: URLS;
    ADDRESS_API: XAPI;
    ARTICLE_API: XAPI;

    // Global SDK Interface
    $storefront: {
      name: string;
      prefix_url: string; // Ex. '/@pajuhaan' or ''
      local_storage_path: string; // Local storage base path.
      database: StorefrontDatabase;
      currency: ICurrency; // Current selected currency

      home: Shop.Home | null;
      user: XapiUser;
      shop: XapiShop;
      auth: XapiAuth;
      products: XapiProduct;
      lottery: XapiLottery;
      coupon: XapiCoupon;
      offer: XapiOffer;
      basket: XapiBasket;
      vendor: XapiVendor;
      avocado: XapiAvocado;

      article: XapiArticle;
    };
  }
}

//█████████████████████████████████████████████████████████████
//――――――――――― Selldone® Storefront SDK ―――――――――――
//█████████████████████████████████████████████████████████████
export class StorefrontSDK {
  /**
   * Initializes and sets up the Selldone Storefront SDK.
   * It configures essential SDK parameters, either by taking them from provided arguments or by
   * fetching them from meta tags. Additionally, it logs the SDK version to the console and
   * handles different environments, specifically the back office.
   *
   * @param _shop_name Optional shop name. If not provided, the function attempts to retrieve the
   * shop name from a meta tag with the attribute name "shop-name".
   *
   * @throws Will throw an error if the shop name is not provided and is also not available
   * in the meta tag when not in the backoffice environment.
   *
   * @returns void
   *
   * @constructor
   *
   * @example
   * // Usage in the backoffice environment
   * StorefrontSDK.Setup("exampleShop");
   *
   * // Typical usage without providing shop name (relies on meta tag)
   * StorefrontSDK.Setup();
   */
  static Setup(_shop_name?: string): void {
    console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓");
    console.log(`┣━━━━ Selldone® Storefront SDK | V${SDK_VERSION} ━━━━┫`);
    console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛");

    this.CheckDependencies();

    let shop_name: string;
    let shop_prefix_address: string;
    let custom_home: Shop.Home | null;

    if (window.$backoffice) {
      console.style(
        "You are using Storefront SDK within <b='color:#673AB7'>BACKOFFICE ENVIRONMENT</b>. So we initial it automatically compatible with Back Office SDK!"
      );

      if (!_shop_name)
        throw "❌ Please set shop_name in the StorefrontSDK.Setup(...)!";
      shop_name = _shop_name;
      shop_prefix_address = "";
      custom_home = null;

      //――――――――――――――――――――――――― Initialize Resources Origin ―――――――――――――――――――――――――
      // Define API repositories:
      window.XAPI = new XAPI();
    } else {
      //――――――――――――――――――――――――― Shop Meta Tags ―――――――――――――――――――――――――

      shop_name = _shop_name
        ? _shop_name
        : SetupService.GetMetaValue("shop-name");
      if (!shop_name)
        throw "❌ The shop name is not specified in the meta tag with the name 'shop-name'.";

      shop_prefix_address = SetupService.GetMetaValue(
        "shop-prefix-address",
        ""
      );

      custom_home = SetupService.GetMetaValue("custom-home") as Shop.Home;

      //――――――――――――――――――――――――― Axios ―――――――――――――――――――――――――
      StorefrontAxiosSetup();

      //――――――――――――――――――――――――― Initialize Resources Origin ―――――――――――――――――――――――――

      // Define API repositories:
      window.CDN = new CDN();
      window.XAPI = new XAPI();
      window.URLS = new URLS();

      window.ADDRESS_API = window.XAPI;
      window.ARTICLE_API = window.XAPI;
    }

    //――――――――――――――――――――――――― Create Instance ―――――――――――――――――――――――――
    const _LOCAL_STORAGE_BASE_PATH = `shop/@${shop_name}/`;

    const _database = new StorefrontDatabase(shop_name);

    window.$storefront = {
      name: shop_name,
      prefix_url: shop_prefix_address,
      local_storage_path: _LOCAL_STORAGE_BASE_PATH,
      database: _database,
      currency: _database.currency.getCurrency(),

      home: custom_home,
      user: new XapiUser(shop_name),
      shop: new XapiShop(shop_name),
      auth: new XapiAuth(shop_name),
      products: new XapiProduct(shop_name),
      lottery: new XapiLottery(shop_name),
      coupon: new XapiCoupon(shop_name),
      offer: new XapiOffer(shop_name),
      basket: new XapiBasket(shop_name),
      vendor: new XapiVendor(shop_name),
      avocado: new XapiAvocado(shop_name),

      article: new XapiArticle(shop_name),
    };

    Object.defineProperty(window.$storefront, "currency", {
      get: function () {
        return _database.currency.getCurrency();
      },
      set: function (value: ICurrency | keyof typeof Currency) {
        if (typeof value === "string") {
          value = Currency[value];
        }
        _database.currency.saveCurrency(value);
      },
    });

    window.$storefront.currency = _database.currency.getCurrency();

    console.style(
      `✅ Selldone® Storefront SDK [<b='color:#009688'>@${shop_name}</b>] initialized successfully.`
    );
  }

  static CheckDependencies() {
    if (typeof console.style !== "function") {
      throw new Error(
        "❌ console.style not found. Please initialize 'SelldoneCore.Setup()' before initializing the Storefront SDK."
      );
    }
  }
}
