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

import { APIAbstract } from "@core/server/APIAbstract";
import fetchRates from "./requests/xapi.exchange-rates.get";

export class XapiExchangeRate extends APIAbstract {
  public shop_name: string;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
  }

  public fetchRates = fetchRates;
}

export namespace XapiExchangeRate {}
