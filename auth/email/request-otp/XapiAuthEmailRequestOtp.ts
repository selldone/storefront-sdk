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

import {XapiAuthEmail} from "@selldone/sdk-storefront/auth/email/XapiAuthEmail";

/**
 * STEP 1.
 * Sends a request for an OTP (One-Time Password) to the provided email.
 *
 * This function constructs the necessary parameters and URL to send a POST request
 * to the XAPI endpoint for requesting an OTP. It then sends the request and returns
 * the response.
 *
 * @param this - The XapiAuthEmail instance, bound to the function.
 * @param email - The email address to which the OTP should be sent.
 * @returns A Promise that resolves to an IResponse object containing the success status and email.
 *
 * @example
 * ```typescript
 * requestOTP() {
 *   this.busy = true;
 *
 *   window.$storefront.auth.email
 *     .requestOtp(this.email)
 *     .then(({ success }) => {
 *       // Success sending OTP
 *     })
 *     .catch((error) => {
 *       console.error(error);
 *     })
 *     .finally(() => {
 *       this.busy = false;
 *     });
 * }
 * ```
 */

export default function XapiAuthEmailRequestOtp(this: XapiAuthEmail, email: string) {
  const params = {
    email: email,
  };
  const url = window.XAPI.POST_SHOP_LOGIN_EMAIL_REQUEST(this.shop_name);
  return this.postNow<XapiAuthEmailRequestOtpTypes.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiAuthEmailRequestOtpTypes {
  /**
   * The response returned by the requestOTP function.
   */
  export interface IResponse {
    /**
     * Indicates whether the request was successful.
     */
    success: boolean;
    /**
     * The email address to which the OTP was sent.
     */
    email: string;
  }
}
