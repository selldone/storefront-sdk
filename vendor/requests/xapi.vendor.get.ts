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


import {XapiVendor} from "../XapiVendor";
import type {Vendor} from "../../../../core/models/shop/vendor/vendor.model";

export default function getVendor(
  this: XapiVendor,
  vendor_id: string|number
) {

  const url = window.XAPI.GET_VENDOR_INFO(this.shop_name,vendor_id);
  return this.getNow<xapi.vendor.get.IResponse>(url);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.vendor.get{
  export interface IResponse {

    vendor: Pick<Vendor, 'id' | 'status' | 'enable' | 'name' | 'description' | 'icon'>;
  }
}
