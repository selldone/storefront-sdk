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

import {Customer} from "@selldone/core-js/models";
import {XapiAuthEmail} from "@selldone/sdk-storefront/auth/email/XapiAuthEmail.ts";

export default function verifyOTP(
  this: XapiAuthEmail,
  email: string,
  verification_code: string,
  source: Customer.Source,
) {
  const params = {
    email: email,
    verification_code: verification_code,
    source: source,
  };
  const url = window.XAPI.POST_SHOP_LOGIN_EMAIL_VERIFY(this.shop_name);
  return this.postNow<xapi.auth.email.verifyOTP.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.auth.email.verifyOTP {
  export interface IResponse {
    token: boolean;
    expires_in: string;
  }
}
