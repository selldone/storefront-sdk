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

import {XapiLottery} from "../XapiLottery";
import {Lottery} from "@selldone/core-js/models/shop/incentives/lottery/lottery.model";

/**
 * Fetches the lottery prizes that the current customer has won.
 * Allows customers to browse through their won prizes and opt to redeem one during an order placement.
 *
 * @param {xapi.lottery.get.IOptions} [options] - Options to customize the retrieval, such as limiting the number of results.
 * @returns {Promise<xapi.lottery.get.IResponse>} The prizes won by the customer.
 */

export default function fetchLotteryPrizes(
  this: XapiLottery,
  options?: xapi.lottery.get.IOptions,
): Promise<xapi.lottery.get.IResponse> {
  const params = {
    limit: options?.limit ? options.limit : 10,
  };
  const url = window.XAPI.GET_FETCH_LOTTERY_WINS(this.shop_name);
  return this.getNow<xapi.lottery.get.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.lottery.get {
  export interface IResponse {
    prizes: Partial<Lottery>[];
  }

  export interface IOptions {
    limit?: number;
  }
}
