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

import {XapiAuthSMS} from "@selldone/sdk-storefront/auth/sms/XapiAuthSMS";
import {Customer} from "@selldone/core-js/models";
import {XapiAuthSMSVerifyOtpTypes} from "@selldone/sdk-storefront/auth/sms/verify-otp/XapiAuthSMSVerifyOtp";

/**
 * Registers a new user based on the provided details.
 *
 * @param code - The unique verification code associated with the user, which can be a string or number.
 * @param name - The name of the user to be registered.
 * @param email - The email address of the user. This can be `null` if no email is provided or applicable.
 * @param password - The password for the user. This can be `null` if no password is chosen or required.
 * @param no_email_mode - A boolean flag indicating whether the user registration should operate in
 *                        a mode that doesn't require an email. If `true`, email becomes optional.
 * @param source - The source from which the registration is initiated, represented by the
 *                 Customer.Source enumeration.
 *
 * @returns A Promise that resolves to an `XapiAuthSMSVerifyOtpTypes.ILoginResponse` object which contains
 *          information about the registration and potential login process. This object will include
 *          the method of verification (specifically, `Method.LOGIN`), an optional token,
 *          and the expiration time for that token.
 *
 * @example
 * registerUser("1234", "John Doe", "john@example.com", "securePass123", false, Customer.Source.CUSTOMER)
 *   .then(response => {
 *     console.log(response.token);
 *   })
 *   .catch(error => {
 *     console.error("Failed to register user:", error);
 *   });
 *
 * @throws Will throw an error if the request fails or if the server responds with an error status.
 */
export default function XapiAuthSMSRegisterUser(
  this: XapiAuthSMS,
  code: string | number,
  name: string,
  email: string | null,
  password: string | null,
  no_email_mode: boolean,
  source: Customer.Source | null,
) {
  const params = {
    code: code,
    name: name,
    email: email,
    password: password,
    no_email_mode: no_email_mode,
    source: source ? source : Customer.Source.CUSTOMER,
  };
  const url = window.XAPI.SHOP_LOGIN_NEW_USER(this.shop_name);
  return this.postNow<XapiAuthSMSVerifyOtpTypes.ILoginResponse>(
    url,
    params,
  );
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiAuthSMSRegisterUserTypes {}
