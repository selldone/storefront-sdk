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

import {XapiAuthSMS,} from "@selldone/sdk-storefront/auth/sms/XapiAuthSMS.ts";
import {Customer} from "@selldone/core-js/models";

/**
 * Verifies the OTP (One-Time Password) received by the user.
 *
 * This method sends the user's OTP to the specified endpoint for verification. It's typically
 * used to confirm the user's phone number in processes like two-factor authentication or
 * phone number verification.
 *
 * @param {string | number} dial_code - The dial code of the country/region (e.g., +1 for the US).
 * @param {string} country_code - The ISO code of the country (e.g., 'US' for the United States).
 * @param {string | number} phone - The phone number for which the OTP was requested.
 * @param {string | number} verification_code - The OTP received by the user.
 * @param {Customer.Source} source - The origin of the OTP request, either 'customer' or 'vendor'.
 *
 * @returns {Promise<ISMSVerifyOTPServerResponse>} - Returns a promise that resolves with the
 *                                                    server's response to the OTP verification.
 *
 * @example
 *
 * verifyOTP('+1', 'US', '1234567890', '123456', Customer.Source.CUSTOMER)
 *   .then(response => console.log(response))
 *   .catch(error => console.error(error));
 *
 */
export default function XapiAuthSMSVerifyOtp(
  this: XapiAuthSMS,
  dial_code: string | number,
  country_code: string,
  phone: string | number,
  verification_code: string | number,
  source: Customer.Source | null,
) {
  const params = {
    dial_code: dial_code,
    country_code: country_code,
    phone: phone,
    verification_code: verification_code,
    source: source ? source : Customer.Source.CUSTOMER,
  };
  const url = window.XAPI.SHOP_LOGIN_VERIFY(this.shop_name);
  return this.postNow<
    | XapiAuthSMSVerifyOtpTypes.IRegisterResponse
    | XapiAuthSMSVerifyOtpTypes.ISelectUserResponse
    | XapiAuthSMSVerifyOtpTypes.ILoginResponse
  >(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiAuthSMSVerifyOtpTypes {
  export interface IRegisterResponse
    extends ISMSVerifyOTPServerResponse {
    method: Method.REGISTER;
    code: string;
  }

  export interface ISelectUserResponse
    extends ISMSVerifyOTPServerResponse {
    method: Method.SELECT;
    // More than one user with same phone number:
    users: IUser[];
  }

  export interface ILoginResponse
    extends ISMSVerifyOTPServerResponse {
    method: Method.LOGIN;
    // Single user with this phone number:
    token: string;
    expires_in: number;
  }

  export interface ISMSVerifyOTPServerResponse {
    method: Method;
  }

  /**
   * Interface representing the server's response to an OTP (One-Time Password) verification request.
   *
   * The response provides details on the verification method (e.g., whether it led to registration,
   * login, or required user selection due to multiple users with the same phone number).
   * Depending on the method, additional fields such as `token`, `expires_in`, or `users` may be included.
   *
   * @property {Method} method - Indicates the method of OTP verification.
   *
   * @property {string} [token] - Access token provided for authentication.
   *                              Typically available when `method` is `LOGIN`.
   *
   * @property {string} expires_in - Specifies the duration (often in seconds)
   *                                 for which the provided `token` remains valid.
   *
   * @property {Array<{id:number, name:string, email:string|number, code:string}>} [users] -
   *           List of users associated with the phone number used for verification.
   *           This is typically provided when multiple users are associated with the same phone number,
   *           and the `method` is `SELECT`.
   *
   * @example
   *
   * const response: ISMSVerifyOTPServerResponse = {
   *   method: Method.LOGIN,
   *   token: 'abcdef123456',
   *   expires_in: '3600'
   * };
   *
   */

  interface IUser {
    id: number;
    name: string;
    email: string | number;
    code: string;
  }

  /**
   * Enum representing the possible methods of OTP (One-Time Password) verification success.
   *
   * The methods include:
   * - `REGISTER`: A new user has been registered. The next step typically requires the user to enter their email.
   * - `SELECT`: There are multiple users with the same phone number, and the user needs to select one.
   * - `LOGIN`: The user is authenticated, and an access token is returned.
   *
   */
  export enum Method {
    REGISTER = "register",
    SELECT = "select",
    LOGIN = "login",
  }
}
