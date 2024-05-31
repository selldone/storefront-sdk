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

/**
 * Requests an OTP (One-Time Password) for phone-based authentication.
 *
 * This method sends a request to the specified endpoint to generate and send an OTP
 * to the user's phone. It's typically used in two-factor authentication or phone number
 * verification processes.
 *
 * @param {string | number} dial_code - The dial code of the country/region (e.g., +1 for the US).
 * @param {string} country_code - The ISO code of the country (e.g., 'US' for the United States).
 * @param {string | number} phone - The phone number to which the OTP should be sent.
 *
 * @returns {Promise<ISMSRequestOTPServerResponse>} - Returns a promise that resolves with the
 *                                                    server's response to the OTP request.
 *
 * @example
 *
 * requestOTP('+1', 'US', '1234567890')
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 *
 */

export default function XapiAuthSMSRequestOtp(
  this: XapiAuthSMS,
  dial_code: string | number,
  country_code: string,
  phone: string | number,
) {
  const params = {
    dial_code: dial_code,
    country_code: country_code,
    phone: phone,
  };
  const url = window.XAPI.SHOP_LOGIN_REQUEST(this.shop_name);
  return this.postNow<XapiAuthSMSRequestOtpTypes.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiAuthSMSRequestOtpTypes {
  /**
   * The response returned by the requestOTP function.
   */
  export interface IResponse {
    success: boolean;
    phone: string;
  }
}
