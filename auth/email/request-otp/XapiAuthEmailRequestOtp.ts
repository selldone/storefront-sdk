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

import {XapiAuthEmail} from "@selldone/sdk-storefront/auth/email/XapiAuthEmail.ts";

export default function requestOTP(this: XapiAuthEmail, email: string) {
  const params = {
    email: email,
  };
  const url = window.XAPI.POST_SHOP_LOGIN_EMAIL_REQUEST(this.shop_name);
  return this.postNow<xapi.auth.email.requestOtp.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.auth.email.requestOtp {
  export interface IResponse {
    success: boolean;
    email: string;
  }
}
