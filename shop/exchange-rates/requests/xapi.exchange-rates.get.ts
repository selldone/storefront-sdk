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

import { IErrorResponse } from "@selldone/core-js/server/APIAbstract";
import { AxiosError } from "axios";
import { StorefrontLocalStorages } from "@selldone/core-js/helper/local-storage/StorefrontLocalStorages";
import { ExchangeRate } from "@selldone/core-js/models/shop/payment/exchange_rate.model";

export default function fetchRates(
  this: any,
  onSuccess: (
    data: xapi.exchange_rates.get.IExchangeRatesServerResponse
  ) => void,
  onError?: (error: IErrorResponse | AxiosError) => void
): void {
  const params = {
    codes: StorefrontLocalStorages.GetShopHistoryGuestAllCodes(),
    guest_code: StorefrontLocalStorages.GetShopGuestCode(),
  };
  const url = window.XAPI.GET_EXCHANGE_RATES(this.shop_name);
  this.getDebounce(url, params, onSuccess, onError, {
    debounce_time: 2000,
  });
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.exchange_rates.get {
  export interface IExchangeRatesServerResponse {
    rates: ExchangeRate[];
  }
}
