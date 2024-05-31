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
import {XapiAuthEmail} from "@selldone/sdk-storefront/auth/email/XapiAuthEmail";

/**
 * STEP 2.
 * Verifies the OTP (One-Time Password) sent to the provided email.
 *
 * This function constructs the necessary parameters and URL to send a POST request
 * to the XAPI endpoint for verifying the OTP. It then sends the request and returns
 * the response containing the authentication token and its expiration time.
 *
 * @param this - The XapiAuthEmail instance, bound to the function.
 * @param email - The email address to verify with the OTP.
 * @param verification_code - The OTP sent to the email address.
 * @param source - The source from which the verification is requested.
 * @returns A Promise that resolves to an IResponse object containing the token and expiration time.
 *
 * @example
 * ```typescript
 * verifyOTP() {
 *   this.busy = true;
 *
 *   window.$storefront.auth.email
 *     .verifyOTP(this.email, this.otp, this.source)
 *     .then(({ token, expires_in }) => {
 *       // Success verifying OTP and Login
 *       this.token = token;
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
export default function XapiAuthEmailVerifyOtp(
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
  return this.postNow<XapiAuthEmailVerifyOtpTypes.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiAuthEmailVerifyOtpTypes {
  /**
   * The response returned by the verifyOTP function.
   */
  export interface IResponse {
    /**
     * The authentication token returned upon successful OTP verification.
     */
    token: string;
    /**
     * The time in seconds until the token expires.
     */
    expires_in: string;
  }
}
