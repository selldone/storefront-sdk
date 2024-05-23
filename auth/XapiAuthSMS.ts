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

import {APIAbstract} from "@selldone/core-js/server/APIAbstract";
import {Customer} from "@selldone/core-js/models/shop/customer/customer.model";

export class XapiAuthSMS extends APIAbstract {
  public shop_name: string;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
  }

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
  public requestOTP(
    dial_code: string | number,
    country_code: string,
    phone: string | number,
  ): Promise<ISMSRequestOTPServerResponse> {
    const params = {
      dial_code: dial_code,
      country_code: country_code,
      phone: phone,
    };
    const url = window.XAPI.SHOP_LOGIN_REQUEST(this.shop_name);
    return this.postNow<ISMSRequestOTPServerResponse>(url, params);
  }

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
  public verifyOTP(
    dial_code: string | number,
    country_code: string,
    phone: string | number,
    verification_code: string | number,
    source: Customer.Source | null,
  ): Promise<
    | ISMSVerifyOTPServerResponse_Register
    | ISMSVerifyOTPServerResponse_Select
    | ISMSVerifyOTPServerResponse_Login
  > {
    const params = {
      dial_code: dial_code,
      country_code: country_code,
      phone: phone,
      verification_code: verification_code,
      source: source ? source : Customer.Source.CUSTOMER,
    };
    const url = window.XAPI.SHOP_LOGIN_VERIFY(this.shop_name);
    return this.postNow<
      | ISMSVerifyOTPServerResponse_Register
      | ISMSVerifyOTPServerResponse_Select
      | ISMSVerifyOTPServerResponse_Login
    >(url, params);
  }

  /**
   * Initiates the user selection process based on the provided code and source.
   *
   * @param code - The unique code associated with the user. This can be a string or number.
   * @param source - The source from which the login is initiated (e.g., customer, vendor, etc.),
   *                 represented by the Customer.Source enumeration.
   *
   * @returns A Promise that resolves to an `ISMSVerifyOTPServerResponse_Login` object which contains
   *          information about the login process. This object can include the method of verification
   *          (specifically, `SuccessVerifyMethod.LOGIN`), an optional token, and the expiration time
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
  public selectUser(
    code: string | number,
    source: Customer.Source | null,
  ): Promise<ISMSVerifyOTPServerResponse_Login> {
    const params = {
      code: code,
      source: source ? source : Customer.Source.CUSTOMER,
    };
    const url = window.XAPI.SHOP_LOGIN_SELECT_USER(this.shop_name);
    return this.postNow<ISMSVerifyOTPServerResponse_Login>(url, params);
  }

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
   * @returns A Promise that resolves to an `ISMSVerifyOTPServerResponse_Login` object which contains
   *          information about the registration and potential login process. This object will include
   *          the method of verification (specifically, `SuccessVerifyMethod.LOGIN`), an optional token,
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
  public registerUser(
    code: string | number,
    name: string,
    email: string | null,
    password: string | null,
    no_email_mode: boolean,
    source: Customer.Source | null,
  ): Promise<ISMSVerifyOTPServerResponse_Login> {
    const params = {
      code: code,
      name: name,
      email: email,
      password: password,
      no_email_mode: no_email_mode,
      source: source ? source : Customer.Source.CUSTOMER,
    };
    const url = window.XAPI.SHOP_LOGIN_NEW_USER(this.shop_name);
    return this.postNow<ISMSVerifyOTPServerResponse_Login>(url, params);
  }
}

interface ISMSRequestOTPServerResponse {
  success: boolean;
  phone: string;
}

/**
 * Interface representing the server's response to an OTP (One-Time Password) verification request.
 *
 * The response provides details on the verification method (e.g., whether it led to registration,
 * login, or required user selection due to multiple users with the same phone number).
 * Depending on the method, additional fields such as `token`, `expires_in`, or `users` may be included.
 *
 * @property {SuccessVerifyMethod} method - Indicates the method of OTP verification.
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
 *   method: SuccessVerifyMethod.LOGIN,
 *   token: 'abcdef123456',
 *   expires_in: '3600'
 * };
 *
 */
interface ISMSVerifyOTPServerResponse {
  method: SuccessVerifyMethod;
}

interface ISMSVerifyOTPServerResponse_Register
  extends ISMSVerifyOTPServerResponse {
  method: SuccessVerifyMethod.REGISTER;
  code: string;
}

interface ISMSVerifyOTPServerResponse_Select
  extends ISMSVerifyOTPServerResponse {
  method: SuccessVerifyMethod.SELECT;
  // More than one user with same phone number:
  users: ISMSVerifyOTPServerResponse_Select_User[];
}

export interface ISMSVerifyOTPServerResponse_Select_User {
  id: number;
  name: string;
  email: string | number;
  code: string;
}

interface ISMSVerifyOTPServerResponse_Login
  extends ISMSVerifyOTPServerResponse {
  method: SuccessVerifyMethod.LOGIN;
  // Single user with this phone number:
  token: string;
  expires_in: number;
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
export enum SuccessVerifyMethod {
  REGISTER = "register",
  SELECT = "select",
  LOGIN = "login",
}
