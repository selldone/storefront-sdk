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

import {XapiLanguage} from "../XapiLanguage";

export default function fetchLanguagePack(
  this: XapiLanguage,
  local: string,
): Promise<xapi.language.get.IResponse> {
  const url = window.XAPI.GET_SHOP_LANGUAGE_PACK(this.shop_name, local);
  return this.getNow<xapi.language.get.IResponse>(url);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.language.get {
  export interface IResponse {
    [key: string]: string | any[] | Record<string, any> | null | number;
  }
}
