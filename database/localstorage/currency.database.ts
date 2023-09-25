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

import { LocalStorages } from "../../../../core/helper/local-storage/LocalStorages";
import { StorefrontDatabase } from "../StorefrontDatabase";
import { Currency, ICurrency } from "../../../../core/enums/payment/Currency";
import SetupService from "../../../../core/server/SetupService";
import { TrackConfig } from "@/Applications/Selldone/plugins/gtag/TrackConfig";

export class CurrencyDatabase {
  /** Name of the shop for which the API operations will be performed. */
  public shop_name: string;

  constructor(shop_name: string) {
    this.shop_name = shop_name;
  }

  getCurrency(): ICurrency {
    const _base_path = `shop/@${this.shop_name}/`;

    // Try to read from local storage:
    const user_currency = localStorage.getItem(
      LocalStorages.GetUserCurrencyPath(_base_path)
    );
    if (user_currency && Currency[user_currency]) {
      return Currency[user_currency];
    }

    // Get from meta header (set by server side)
    const _default_code = SetupService.DefaultCurrency();
    if (!_default_code) return Currency.USD;
    return Currency[_default_code];
  }
  saveCurrency(currency: ICurrency | keyof typeof Currency) {
    let currencyCode: string;

    if (typeof currency === "string") {
      currencyCode = currency;
    } else {
      currencyCode = currency.code;
    }
    const _base_path = `shop/@${this.shop_name}/`;

    localStorage.setItem(
      // @ts-ignore
      LocalStorages.GetUserCurrencyPath(_base_path),
      currencyCode
    );
    TrackConfig.SetCurrency(currencyCode);
  }
}
