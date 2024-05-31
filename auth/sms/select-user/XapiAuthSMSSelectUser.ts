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

import {XapiAuthSMS} from "@selldone/sdk-storefront/auth/sms/XapiAuthSMS.ts";
import {Customer} from "@selldone/core-js/models";
import {XapiAuthSMSVerifyOtpTypes} from "@selldone/sdk-storefront/auth/sms/verify-otp/XapiAuthSMSVerifyOtp.ts";

/**
 * Initiates the user selection process based on the provided code and source.
 *
 * @param code - The unique code associated with the user. This can be a string or number.
 * @param source - The source from which the login is initiated (e.g., customer, vendor, etc.),
 *                 represented by the Customer.Source enumeration.
 *
 * @returns A Promise that resolves to an `XapiAuthSMSVerifyOtpTypes.ILoginResponse` object which contains
 *          information about the login process. This object can include the method of verification
 *          (specifically, `Method.LOGIN`), an optional token, and the expiration time
 *          for that token.
 *
 * @example
 * selectUser("1234", Customer.Source.CUSTOMER)
 *   .then(response => {
 *     console.log(response.token);
 *   })
 *   .catch(error => {
 *     console.error("Failed to select user:", error);
 *   });
 *
 */
export default function XapiAuthSMSSelectUser(
  this: XapiAuthSMS,
  code: string | number,
  source: Customer.Source | null,
) {
  const params = {
    code: code,
    source: source ? source : Customer.Source.CUSTOMER,
  };
  const url = window.XAPI.SHOP_LOGIN_SELECT_USER(this.shop_name);
  return this.postNow<XapiAuthSMSVerifyOtpTypes.ILoginResponse>(
    url,
    params,
  );
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiAuthSMSSelectUserTypes {}
