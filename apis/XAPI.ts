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

import {SetupService} from "@selldone/core-js/server/SetupService";
import {Currency} from "@selldone/core-js/enums/payment/Currency";
import type {Product, ProductImage, ProductVariant} from "@selldone/core-js/models/shop/product";
import type {Category} from "@selldone/core-js/models/shop/category";
import type {Shop} from "@selldone/core-js/models/shop/shop.model";

export class XAPI {
  selldone_xapi_url: string = "";

  /**
   * When creating an instance of the class containing this constructor, it will automatically search the HTML document's `<head>` section for a `<meta>` tag with the `name` attribute set to "selldone-xapi".
   *
   * If this tag is found, its `content` value (which should be a URL) will be assigned to the `selldone_xapi_url` property of the instance.
   *
   * ex: <meta name="selldone-xapi" content="https://xapi.example.com">
   *
   */
  constructor() {
    this.selldone_xapi_url = SetupService.GetMetaValue("selldone-xapi");
  }

  //―――――――――――――――――――――― Login By SMS ――――――――――――――――――――

  /**
   * Build the XAPI URL for shop login request.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/sms-login/request
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Login request payload is validated by the auth controller; use the exact phone/email fields required by the selected login flow.
   *
   * Response:
   * - Authentication flow payload; successful verify/select/new-user responses can include candidate users and Passport/customer token data as defined by the auth controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.SHOP_LOGIN_REQUEST("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  SHOP_LOGIN_REQUEST(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/sms-login/request`;
  }

  /**
   * Build the XAPI URL for shop login verify.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/sms-login/verify
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Verification payload is validated by the auth controller; includes the OTP/session fields for the selected login flow.
   *
   * Response:
   * - Authentication flow payload; successful verify/select/new-user responses can include candidate users and Passport/customer token data as defined by the auth controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.SHOP_LOGIN_VERIFY("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  SHOP_LOGIN_VERIFY(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/sms-login/verify`;
  }

  /**
   * Build the XAPI URL for shop login select user.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/sms-login/select-user
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Authentication flow payload; successful verify/select/new-user responses can include candidate users and Passport/customer token data as defined by the auth controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.SHOP_LOGIN_SELECT_USER("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  SHOP_LOGIN_SELECT_USER(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/sms-login/select-user`;
  }

  /**
   * Build the XAPI URL for shop login new user.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/sms-login/new-user
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Authentication flow payload; successful verify/select/new-user responses can include candidate users and Passport/customer token data as defined by the auth controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.SHOP_LOGIN_NEW_USER("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  SHOP_LOGIN_NEW_USER(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/sms-login/new-user`;
  }

  //―――――――――――――――――――――― Login By Email ――――――――――――――――――――
  /**
   * Build the XAPI URL for shop login email request.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/email-login/request
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Login request payload is validated by the auth controller; use the exact phone/email fields required by the selected login flow.
   *
   * Response:
   * - Authentication flow payload; successful verify/select/new-user responses can include candidate users and Passport/customer token data as defined by the auth controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SHOP_LOGIN_EMAIL_REQUEST("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SHOP_LOGIN_EMAIL_REQUEST(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/email-login/request`;
  }

  /**
   * Build the XAPI URL for shop login email verify.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/email-login/verify
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Verification payload is validated by the auth controller; includes the OTP/session fields for the selected login flow.
   *
   * Response:
   * - Authentication flow payload; successful verify/select/new-user responses can include candidate users and Passport/customer token data as defined by the auth controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SHOP_LOGIN_EMAIL_VERIFY("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SHOP_LOGIN_EMAIL_VERIFY(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/email-login/verify`;
  }

  //―――――――――――――――――――――― User ――――――――――――――――――――

  /**
   * Retrieves the URL for getting user information.
   *
   * Note: This method only works when authenticated by passport.
   *
   * @returns {string} The URL for fetching user information.
   */
  /**
   * Build the XAPI URL for user.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /me
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - None.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_USER();
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_USER(): string {
    return `${this.selldone_xapi_url}/me`;
  }

  /**
   * Build the XAPI URL for logout.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/logout
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.LOGOUT("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  LOGOUT(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/logout`;
  }

  /**
   * Build the XAPI URL for exchange rates.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/exchange/rates
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_EXCHANGE_RATES("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_EXCHANGE_RATES(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/exchange/rates`;
  }

  /**
   * Build the XAPI URL for leave shop.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/leave
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_LEAVE_SHOP("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_LEAVE_SHOP(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/leave`;
  }

  /**
   * Build the XAPI URL for subscribe.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/subscribe
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SUBSCRIBE("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SUBSCRIBE(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/subscribe`;
  }

  /**
   * Build the XAPI URL for save my customer profile.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/customer
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SAVE_MY_CUSTOMER_PROFILE("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SAVE_MY_CUSTOMER_PROFILE(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/customer`;
  }

  //―――――――――――――――――――――― Shop ――――――――――――――――――――

  /**
   * Build the XAPI URL for shop info.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/info
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - `shop`: {@link Shop} public shop fields selected by `Shop::DefaultPublicShopSelectKeys`, plus public apps/gateways when loaded.
   * - `total`: documented backend count value.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_INFO("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_INFO(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/info`;
  }

  /**
   * Build the XAPI URL for shop profile.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/profiles/{type}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_PROFILE("my-shop", "PHYSICAL");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_PROFILE(shop_name: string, type: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/profiles/${type}`;
  }

  //―――――――――――――――――――――― Product ――――――――――――――――――――

  /**
   * Build the XAPI URL for products.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/products/all
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - `offset` (default `0`), `limit` (default `20`, max `250`), `sortBy`, `sortDesc`, `search`, `search_type`, `dir`, `vendor_id`, `with_category`, `with_category_translations`, and JSON `filter` values are read by `ProductController::getFilteredProducts`.
   * - `dir` accepts category id/name or `*`; search supports exact id, quoted search, `tax:`, `valuation:`, and `new` controller branches.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - `products`: {@link Product}[] storefront product records.
   * - `folders` / category collections: {@link Category}[] when category navigation is returned.
   * - `total`: total matched products when returned by the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PRODUCTS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PRODUCTS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/all`;
  }

  /**
   * Build the XAPI URL for products list.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/products/list
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - `offset` (default `0`), `limit` (default `20`, max `250`), `sortBy`, `sortDesc`, `search`, `search_type`, `dir`, `vendor_id`, `with_category`, `with_category_translations`, and JSON `filter` values are read by `ProductController::getFilteredProducts`.
   * - `dir` accepts category id/name or `*`; search supports exact id, quoted search, `tax:`, `valuation:`, and `new` controller branches.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - `products`: {@link Product}[] storefront product records.
   * - `folders` / category collections: {@link Category}[] when category navigation is returned.
   * - `total`: total matched products when returned by the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PRODUCTS_LIST("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PRODUCTS_LIST(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/list`;
  }

  /**
   * Build the XAPI URL for product info.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/products/{product_id}/info
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - `product`: {@link Product} with loaded storefront relations such as `productVariants`, `images`, `ratings`, `category`, `page`, `files`, `extraPricings`, `includes`, `vendor_products`, or subscription prices depending on product type and controller.
   * - Authenticated requests may also include `my_ratings` and `informs` arrays.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PRODUCT_INFO("my-shop", 123);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PRODUCT_INFO(shop_name: string, product_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/info`;
  }

  /**
   * Build the XAPI URL for product info card.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/products/{product_id}/info-card
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - `product`: {@link Product} with loaded storefront relations such as `productVariants`, `images`, `ratings`, `category`, `page`, `files`, `extraPricings`, `includes`, `vendor_products`, or subscription prices depending on product type and controller.
   * - Authenticated requests may also include `my_ratings` and `informs` arrays.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PRODUCT_INFO_CARD("my-shop", 123);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PRODUCT_INFO_CARD(
    shop_name: string,
    product_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/info-card`;
  }

  /**
   * Build the XAPI URL for product info instagram.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/products/{product_id}/info-instagram
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - `product`: {@link Product} with loaded storefront relations such as `productVariants`, `images`, `ratings`, `category`, `page`, `files`, `extraPricings`, `includes`, `vendor_products`, or subscription prices depending on product type and controller.
   * - Authenticated requests may also include `my_ratings` and `informs` arrays.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PRODUCT_INFO_INSTAGRAM("my-shop", 123);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PRODUCT_INFO_INSTAGRAM(
    shop_name: string,
    product_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/info-instagram`;
  }

  /**
   * Build the XAPI URL for product info hyper.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/products/{product_id}/info-hyper
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - `product`: {@link Product} with loaded storefront relations such as `productVariants`, `images`, `ratings`, `category`, `page`, `files`, `extraPricings`, `includes`, `vendor_products`, or subscription prices depending on product type and controller.
   * - Authenticated requests may also include `my_ratings` and `informs` arrays.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PRODUCT_INFO_HYPER("my-shop", 123);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PRODUCT_INFO_HYPER(
    shop_name: string,
    product_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/info-hyper`;
  }

  /**
   * Build the XAPI URL for set product rating.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/products/{product_id}/set-my-rating
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SET_PRODUCT_RATING("my-shop", 123);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SET_PRODUCT_RATING(
    shop_name: string,
    product_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/set-my-rating`;
  }

  //―――――――――――――――――――――― Basket > 🥵 User & 🥶 Guest ――――――――――――――――――――

  /**
   * Build the XAPI URL for physical item in basket.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/basket/{product_id}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_PHYSICAL_ITEM_IN_BASKET("my-shop", 123);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_PHYSICAL_ITEM_IN_BASKET(
    shop_name: string,
    product_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${product_id}`;
  }

  /**
   * Build the XAPI URL for physical item from basket.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /shops/@{shop}/basket/{product_id}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_PHYSICAL_ITEM_FROM_BASKET("my-shop", 123);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_PHYSICAL_ITEM_FROM_BASKET(
    shop_name: string,
    product_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${product_id}`;
  }

  /**
   * Build the XAPI URL for basket item message.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/basket/{product_id}/message
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_BASKET_ITEM_MESSAGE("my-shop", 123);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_BASKET_ITEM_MESSAGE(
    shop_name: string,
    product_id: string | number,
  ): string {
    // Also support PUT!
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${product_id}/message`;
  }

  /**
   * Build the XAPI URL for basket item file.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /shops/@{shop}/baskets/{basket_id}/files/{file_id}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   * - `file_id`: Product file id or uploaded file id, depending on endpoint.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_BASKET_ITEM_FILE("my-shop", 789, 10);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_BASKET_ITEM_FILE(
    shop_name: string,
    basket_id: string | number,
    file_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/files/${file_id}`;
  }

  /**
   * Build the XAPI URL for basket item preferences.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/basket/{product_id}/preferences
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_BASKET_ITEM_PREFERENCES("my-shop", 123);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_BASKET_ITEM_PREFERENCES(
    shop_name: string,
    product_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${product_id}/preferences`;
  }

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ Basket > 🥵 User & 🥶 Guest ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  /**
   * Build the XAPI URL for set basket config.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/baskets/{basket_id}/config
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_SET_BASKET_CONFIG("my-shop", 789);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_SET_BASKET_CONFIG(shop_name: string, basket_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/config`;
  }

  /**
   * Build the XAPI URL for basket bill.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/basket/{type}/bill
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_BASKET_BILL("my-shop", "PHYSICAL");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_BASKET_BILL(shop_name: string, type: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${type}/bill`;
  }

  /**
   * Build the XAPI URL for buy basket.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/basket/{type}/buy/{gateway_code}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   * - `gateway`: Payment gateway code. Basket payment backend routes name this parameter `{gateway_code}`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_BUY_BASKET("my-shop", "PHYSICAL", "stripe");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_BUY_BASKET(shop_name: string, type: string, gateway: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${type}/buy/${gateway}`;
  }

  /**
   * Build the XAPI URL for pay bill.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/basket/{basket_id}/bills/{bill_id}/pay/{gateway_code}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   * - `bill_id`: Bill id attached to the basket.
   * - `gateway`: Payment gateway code. Basket payment backend routes name this parameter `{gateway_code}`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Gateway/payment payload such as transaction status, redirect data, client token, receipt upload metadata, or `success` flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_PAY_BILL("my-shop", 789, 55, "stripe");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_PAY_BILL(
    shop_name: string,
    basket_id: string | number,
    bill_id: string | number,
    gateway: string,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${basket_id}/bills/${bill_id}/pay/${gateway}`;
  }

  /**
   * Build the XAPI URL for submit service basket.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/basket/{type}/submit
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SUBMIT_SERVICE_BASKET("my-shop", "PHYSICAL");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SUBMIT_SERVICE_BASKET(shop_name: string, type: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${type}/submit`;
  }

  /**
   * Build the XAPI URL for set my location.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/baskets/{basket_type}/my-location
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SET_MY_LOCATION("my-shop", "PHYSICAL");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SET_MY_LOCATION(shop_name: string, type: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${type}/my-location`;
  }

  /**
   * Build the XAPI URL for order edit receiver info.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/baskets/{basket_id}/receiver-info
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_ORDER_EDIT_RECEIVER_INFO("my-shop", 789);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_ORDER_EDIT_RECEIVER_INFO(
    shop_name: string,
    basket_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/receiver-info`;
  }

  /**
   * Build the XAPI URL for basket generate share link.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/baskets/{basket_id}/share
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_BASKET_GENERATE_SHARE_LINK("my-shop", 789);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_BASKET_GENERATE_SHARE_LINK(
    shop_name: string,
    basket_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/share`;
  }

  /**
   * Build the XAPI URL for basket import.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/basket/{type}/import
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_BASKET_IMPORT("my-shop", "PHYSICAL");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_BASKET_IMPORT(shop_name: string, type: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${type}/import`;
  }

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ Basket > 🎗️ Subscription > 🥵 User ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  /**
   * Build the XAPI URL for basket create subscription portal url.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/baskets/{basket_id}/portal
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_BASKET_CREATE_SUBSCRIPTION_PORTAL_URL("my-shop", 789);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_BASKET_CREATE_SUBSCRIPTION_PORTAL_URL(
    shop_name: string,
    basket_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/portal`;
  }

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  /**
   * Build the XAPI URL for order basket info.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/baskets/{basket_id}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_ORDER_BASKET_INFO("my-shop", 789);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_ORDER_BASKET_INFO(shop_name: string, basket_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}`;
  }

  /**
   * Build the XAPI URL for order pos basket info.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/pos-baskets/{basket_id}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_ORDER_POS_BASKET_INFO("my-shop", 789);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_ORDER_POS_BASKET_INFO(
    shop_name: string,
    basket_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/pos-baskets/${basket_id}`;
  }

  /**
   * Build the XAPI URL for order basket confirm received.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/baskets/{basket_id}/confirm-received
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_ORDER_BASKET_CONFIRM_RECEIVED("my-shop", 789);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_ORDER_BASKET_CONFIRM_RECEIVED(
    shop_name: string,
    basket_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/confirm-received`;
  }

  /**
   * Build the XAPI URL for order edit billing.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/baskets/{basket_id}/billing
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_ORDER_EDIT_BILLING("my-shop", 789);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_ORDER_EDIT_BILLING(
    shop_name: string,
    basket_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/billing`;
  }

  /**
   * Build the XAPI URL for my orders history physical.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/basket/orders-{type}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_MY_ORDERS_HISTORY_PHYSICAL("my-shop", "PHYSICAL");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_MY_ORDERS_HISTORY_PHYSICAL(shop_name: string, type: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/orders-${type}`;
  }

  /**
   * Build the XAPI URL for my basket item returns.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/basket/orders/return-requests
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_MY_BASKET_ITEM_RETURNS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_MY_BASKET_ITEM_RETURNS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/orders/return-requests`;
  }

  /**
   * Build the XAPI URL for basket item return request.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/baskets/{basket_id}/return/{item_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   * - `item_id`: Listing item id or basket item id according to endpoint path.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_BASKET_ITEM_RETURN_REQUEST("my-shop", 789, 456);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_BASKET_ITEM_RETURN_REQUEST(
    shop_name: string,
    basket_id: string | number,
    item_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/return/${item_id}`;
  }

  /**
   * Build the XAPI URL for generate download product file temp url.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/products/{product_id}/files/{file_id}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   * - `file_id`: Product file id or uploaded file id, depending on endpoint.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GENERATE_DOWNLOAD_PRODUCT_FILE_TEMP_URL("my-shop", 123, 10);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GENERATE_DOWNLOAD_PRODUCT_FILE_TEMP_URL(
    shop_name: string,
    product_id: string | number,
    file_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/files/${file_id}`;
  }

  /**
   * Build the XAPI URL for tax regions.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/tax/{country}/regions
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `country`: Country code used for tax region lookup.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_TAX_REGIONS("my-shop", "US");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_TAX_REGIONS(shop_name: string, country: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/tax/${country}/regions`;
  }

  //―――――――――――――――――――――― Search ――――――――――――――――――――

  /**
   * Build the XAPI URL for search query.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/search/suggestion/{text}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `query`: Search text path segment.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SEARCH_QUERY("my-shop", "shoes");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SEARCH_QUERY(shop_name: string, query: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/search/suggestion/${query}`;
  }

  //―――――――――――――――――――――― Product inform ――――――――――――――――――――

  /**
   * Build the XAPI URL for to waiting for be available.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/products/{product_id}/waiting-be-available
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_TO_WAITING_FOR_BE_AVAILABLE(123, 123);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_TO_WAITING_FOR_BE_AVAILABLE(
    shop_id: string | number,
    product_id: string | number,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_id}/products/${product_id}/waiting-be-available`;
  }

  /**
   * Build the XAPI URL for from waiting for be available.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /shops/@{shop}/products/{product_id}/waiting-be-available
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_FROM_WAITING_FOR_BE_AVAILABLE(123, 123);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_FROM_WAITING_FOR_BE_AVAILABLE(
    shop_id: string | number,
    product_id: string | number,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_id}/products/${product_id}/waiting-be-available`;
  }

  /**
   * Build the XAPI URL for to waiting for auction.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/products/{product_id}/waiting-auction
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_TO_WAITING_FOR_AUCTION(123, 123);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_TO_WAITING_FOR_AUCTION(
    shop_id: string | number,
    product_id: string | number,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_id}/products/${product_id}/waiting-auction`;
  }

  /**
   * Build the XAPI URL for from waiting for auction.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /shops/@{shop}/products/{product_id}/waiting-auction
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_FROM_WAITING_FOR_AUCTION(123, 123);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_FROM_WAITING_FOR_AUCTION(
    shop_id: string | number,
    product_id: string | number,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_id}/products/${product_id}/waiting-auction`;
  }

  //―――――――――――――――――――――― Product Wish list ――――――――――――――――――――
  /**
   * Build the XAPI URL for wishlist product.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/products/{product_id}/wishlist
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_WISHLIST_PRODUCT("my-shop", 123);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_WISHLIST_PRODUCT(shop_name: string, product_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/wishlist`;
  }

  /**
   * Build the XAPI URL for wishlist product.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /shops/@{shop}/products/{product_id}/wishlist
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_WISHLIST_PRODUCT("my-shop", 123);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_WISHLIST_PRODUCT(
    shop_name: string,
    product_id: string | number,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/wishlist`;
  }

  //―――――――――――――――――――――― Comments ――――――――――――――――――――

  /**
   * Build the XAPI URL for my comments.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/comments
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_MY_COMMENTS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_MY_COMMENTS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/comments`;
  }

  //―――――――――――――――――――――― Gift Cards ――――――――――――――――――――

  /**
   * Build the XAPI URL for my gift cards.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/giftcards
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_MY_GIFT_CARDS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_MY_GIFT_CARDS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/giftcards`;
  }

  /**
   * Build the XAPI URL for my gift cards list.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/giftcards/list
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_MY_GIFT_CARDS_LIST("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_MY_GIFT_CARDS_LIST(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/giftcards/list`;
  }

  /**
   * Build the XAPI URL for add gift cards.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/giftcards
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_ADD_GIFT_CARDS("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_ADD_GIFT_CARDS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/giftcards`;
  }

  //―――――――――――――――――――――― Wallet ――――――――――――――――――――

  /**
   * Build the XAPI URL for my wallets.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/wallets
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_MY_WALLETS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_MY_WALLETS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/wallets`;
  }


  //―――――――――――――――――――――― Discount Code ――――――――――――――――――――

  /**
   * Build the XAPI URL for discount code.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/discount-code
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_DISCOUNT_CODE("my-shop");
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_DISCOUNT_CODE(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/discount-code`;
  }

  //―――――――――――――――――――――― Shop > Blogs ――――――――――――――――――――

  /**
   * Build the XAPI URL for shop blogs.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/blogs
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_BLOGS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_BLOGS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/blogs`;
  }

  //―――――――――――――――――――――― FCM ――――――――――――――――――――

  /**
   * Build the XAPI URL for set fcm token.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/fcm/token
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SET_FCM_TOKEN("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SET_FCM_TOKEN(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/fcm/token`;
  }

  //―――――――――――――――――――――― Payment ――――――――――――――――――――

  /**
   * Build the XAPI URL for pending payment info.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/gateways/{gateway_code}/{transaction_id}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `gateway`: Payment gateway code. Basket payment backend routes name this parameter `{gateway_code}`.
   * - `transaction_id`: Gateway transaction id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Gateway/payment payload such as transaction status, redirect data, client token, receipt upload metadata, or `success` flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PENDING_PAYMENT_INFO("my-shop", "stripe", "txn_123");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PENDING_PAYMENT_INFO(
    shop_name: string,
    gateway: string,
    transaction_id: string,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/gateways/${gateway}/${transaction_id}`;
  }

  /**
   * Build the XAPI URL for payment status interval.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/gateways/{gateway_code}/transactions/{transaction_id}/{unique_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `gateway`: Payment gateway code. Basket payment backend routes name this parameter `{gateway_code}`.
   * - `transaction_id`: Gateway transaction id.
   * - `unique_id`: Gateway-specific polling id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Gateway/payment payload such as transaction status, redirect data, client token, receipt upload metadata, or `success` flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PAYMENT_STATUS_INTERVAL("my-shop", "stripe", "txn_123", "poll_123");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PAYMENT_STATUS_INTERVAL(
    shop_name: string,
    gateway: string,
    transaction_id: string,
    unique_id: string,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/gateways/${gateway}/transactions/${transaction_id}/${unique_id}`;
  }

  /**
   * Build the XAPI URL for set shop app status by customer.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/apps/{app_code}/status
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `app_code`: Shop app code.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SET_SHOP_APP_STATUS_BY_CUSTOMER("my-shop", "reviews");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SET_SHOP_APP_STATUS_BY_CUSTOMER(shop_name: string, app_code: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/apps/${app_code}/status`;
  }

  //―――――――――――――――――――――― Return request ――――――――――――――――――――

  /**
   *
   * @param shop_name
   * @param basket_id
   * @param basketItem_id
   * @param type            image , video , voice
   * @returns {string}
   * @constructor
   */
  /**
   * Build the XAPI URL for upload return request file.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/baskets/{basket_id}/return/{item_id}/temp/upload/{type}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   * - `basketItem_id`: Basket item id used for return-request uploads.
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Multipart/form-data upload. Accepted file field, image constraints, and optimization middleware are defined by the cited backend method.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_UPLOAD_RETURN_REQUEST_FILE("my-shop", 789, 321, "PHYSICAL");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_UPLOAD_RETURN_REQUEST_FILE(
    shop_name: string,
    basket_id: string | number,
    basketItem_id: string | number,
    type: string,
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/return/${basketItem_id}/temp/upload/${type}`;
  }

  //―――――――――――――――――――――― Contact Us ――――――――――――――――――――

  /**
   * Build the XAPI URL for contact us form.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/contact-us
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - `name`, `email`, `phone`, `url`, `category`, and `message` are validated/read by `ShopContactCustomersController::api_sendShopMessage`.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_CONTACT_US_FORM("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_CONTACT_US_FORM(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contact-us`;
  }

  //―――――――――――――――――――――― FAQ ――――――――――――――――――――
  /**
   * Build the XAPI URL for faq tags.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/faqs/tags
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_FAQ_TAGS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_FAQ_TAGS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/faqs/tags`;
  }

  /**
   * Build the XAPI URL for faq.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/faqs
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_FAQ("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_FAQ(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/faqs`;
  }

  /**
   * Build the XAPI URL for send question.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/faqs
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SEND_QUESTION("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SEND_QUESTION(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/faqs`;
  }

  //―――――――――――――――――――――― Page Builder ――――――――――――――――――――
  /**
   * Build the XAPI URL for custom home page.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/home/default
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `page_id`: Page builder page id sent in query string.
   *
   * Query parameters:
   * - `page_id` is appended by this SDK method as a query string.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_CUSTOM_HOME_PAGE("my-shop", 101);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_CUSTOM_HOME_PAGE(shop_name: string, page_id: string | number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/home/default?page_id=${page_id}`;
  }

  /**
   * We can send page id in query (page_id) with empty page_name
   * @param shop_name
   * @param page_name
   * @constructor
   */
  /**
   * Build the XAPI URL for page data.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/pages/{page_name?}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `page_name`: Optional page builder slug. Use an empty value and send `page_id` query to fetch by id.
   *
   * Query parameters:
   * - Optional `page_id` may be sent by caller when `page_name` is empty.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PAGE_DATA("my-shop", "about-us");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PAGE_DATA(shop_name: string, page_name:string|null = "") {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/pages${
      page_name ? "/" + page_name : ""
    }`;
  }

  /**
   * Build the XAPI URL for page statistic.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/pages/{page_id}/statistic
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `page_name`: Optional page builder slug. Use an empty value and send `page_id` query to fetch by id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PAGE_STATISTIC("my-shop", "about-us");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PAGE_STATISTIC(shop_name: string, page_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/pages/${page_name}/statistic`;
  }

  /**
   * Build the XAPI URL for include page data.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/includes/{include_id}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `include_id`: Page builder include id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_INCLUDE_PAGE_DATA("my-shop", "header");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_INCLUDE_PAGE_DATA(shop_name: string, include_id = "") {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/includes/${include_id}`;
  }


  //―――――――――――――――――――――― Stripe ――――――――――――――――――――
  /**
   * Build the XAPI URL for check shop stripe payment intent.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/gateways/stripe/{payment_id}/check
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `paymentIntent_id`: Stripe payment intent id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Gateway/payment payload such as transaction status, redirect data, client token, receipt upload metadata, or `success` flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_CHECK_SHOP_STRIPE_PAYMENT_INTENT("my-shop", "pi_123");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_CHECK_SHOP_STRIPE_PAYMENT_INTENT(
    shop_name: string,
    paymentIntent_id: string,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/gateways/stripe/${paymentIntent_id}/check`;
  }

  //―――――――――――――――――――――― PayPal ――――――――――――――――――――
  /**
   * Build the XAPI URL for paypal client token.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/gateways/paypal/client-token/{currency}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `currency`: Currency code from Selldone `Currency` enum.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Gateway/payment payload such as transaction status, redirect data, client token, receipt upload metadata, or `success` flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PAYPAL_CLIENT_TOKEN("my-shop", "USD");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  GET_PAYPAL_CLIENT_TOKEN(shop_name: string, currency: keyof typeof Currency) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/gateways/paypal/client-token/${currency}`;
  }

  //―――――――――――――――――――――― Direct payment upload payment receipt ――――――――――――――――――――

  /**
   * Build the XAPI URL for upload direct payment receipt.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/transactions/{transaction_id}/receipt/{currency}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `transaction_id`: Gateway transaction id.
   * - `currency`: Currency code from Selldone `Currency` enum.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Multipart/form-data upload. Accepted file field, image constraints, and optimization middleware are defined by the cited backend method.
   *
   * Response:
   * - Gateway/payment payload such as transaction status, redirect data, client token, receipt upload metadata, or `success` flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_UPLOAD_DIRECT_PAYMENT_RECEIPT("my-shop", "txn_123", "USD");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_UPLOAD_DIRECT_PAYMENT_RECEIPT(
    shop_name: string,
    transaction_id: number | string,
    currency: keyof typeof Currency,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/transactions/${transaction_id}/receipt/${currency}`;
  }

  //―――――――――――――――――――――― Address Book (Shared!) ――――――――――――――――――――

  /**
   * Build the XAPI URL for my addresses.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /address/all
   * @auth Customer token (`auth:api`); route is imported from `routes/modules/address.php`.
   *
   * Path parameters:
   * - None.
   *
   * Query parameters:
   * - `offset` and `count` are read by `AddressController::api_addressesGetAll`.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_MY_ADDRESSES();
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_MY_ADDRESSES() {
    return `${this.selldone_xapi_url}/address/all`;
  }

  /**
   * Build the XAPI URL for my addresses.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /address/{address_id}
   * @auth Customer token (`auth:api`); route is imported from `routes/modules/address.php`.
   *
   * Path parameters:
   * - `address_id`: Authenticated user address id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_MY_ADDRESSES(12);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_MY_ADDRESSES(address_id: string | number) {
    return `${this.selldone_xapi_url}/address/${address_id}`;
  }

  /**
   * Build the XAPI URL for address.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /address/{address_id}
   * @auth Customer token (`auth:api`); route is imported from `routes/modules/address.php`.
   *
   * Path parameters:
   * - `address_id`: Authenticated user address id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Address fields validated by `AddressController`: `title`, `address`, `location`, `no`, `unit`, `name`, `phone`, `message`, `postal`, `country`, `state`, and `city`.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_ADDRESS(12);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_ADDRESS(address_id: string | number) {
    return `${this.selldone_xapi_url}/address/${address_id}`;
  }

  /**
   * Build the XAPI URL for address.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /address
   * @auth Customer token (`auth:api`); route is imported from `routes/modules/address.php`.
   *
   * Path parameters:
   * - None.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Address fields validated by `AddressController`: `title`, `address`, `location`, `no`, `unit`, `name`, `phone`, `message`, `postal`, `country`, `state`, and `city`.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_ADDRESS();
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_ADDRESS() {
    return `${this.selldone_xapi_url}/address`;
  }

  /**
   * Build the XAPI URL for geo to address.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /address/gto-to-address
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - None.
   *
   * Query parameters:
   * - `lat`, `lon`, and optional `local` are validated by `AddressController::api_geoToAddress`.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_GEO_TO_ADDRESS();
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_GEO_TO_ADDRESS() {
    return `${this.selldone_xapi_url}/address/gto-to-address`;
  }

  /**
   * Build the XAPI URL for autocomplete.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /address/autocomplete
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - None.
   *
   * Query parameters:
   * - `text`, optional `lat`, `lon`, `local`, and `countries` are validated/read by `AddressController::api_autocomplete`.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_AUTOCOMPLETE();
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_AUTOCOMPLETE() {
    return `${this.selldone_xapi_url}/address/autocomplete`;
  }

  //█████████████████████████████████████████████████████████████
  //――――――――――――――――――――――――――― Article ―――――――――――――――――――――――――
  //█████████████████████████████████████████████████████████████

  /**
   * Build the XAPI URL for shop blog categories.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/{shop_id}/blog/categories
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_BLOG_CATEGORIES(123);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_BLOG_CATEGORIES(shop_id: number | string) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/blog/categories`;
  }

  /**
   * Build the XAPI URL for shop blog data.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/blogs/{blog_id}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `blog_id`: Shop blog/article id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_BLOG_DATA("my-shop", 34);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_BLOG_DATA(shop_name: string, blog_id: number | string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/blogs/${blog_id}`;
  }

  //―――――――――――――――――――――― Link preview ――――――――――――――――――――
  /**
   * Build the XAPI URL for link preview.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /iframe/preview
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - None.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_LINK_PREVIEW();
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_LINK_PREVIEW() {
    return `${this.selldone_xapi_url}/iframe/preview`;
  }

  //―――――――――――――――――――――― Coupons ――――――――――――――――――――

  /**
   * Build the XAPI URL for fetch coupons.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/coupons
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_FETCH_COUPONS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_FETCH_COUPONS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/coupons`;
  }

  /**
   * Build the XAPI URL for coupons by code.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/coupons/{coupon_code}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `code`: Coupon code path segment; backend route names it `{coupon_code}`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_COUPONS_BY_CODE("my-shop", "WELCOME10");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_COUPONS_BY_CODE(shop_name: string, code: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/coupons/${code}`;
  }

  /**
   * Build the XAPI URL for set basket coupon.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/coupon
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_SET_BASKET_COUPON("my-shop");
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_SET_BASKET_COUPON(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/coupon`;
  }

  //―――――――――――――――――――――― Offers ――――――――――――――――――――

  /**
   * Build the XAPI URL for fetch offers.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/offers
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_FETCH_OFFERS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_FETCH_OFFERS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/offers`;
  }

  //―――――――――――――――――――――― Lotteries ――――――――――――――――――――

  /**
   * Build the XAPI URL for fetch lotteries.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/lottery
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_FETCH_LOTTERIES("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_FETCH_LOTTERIES(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/lottery`;
  }

  /**
   * Build the XAPI URL for fetch lotteries.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/lottery/play
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_FETCH_LOTTERIES("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_FETCH_LOTTERIES(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/lottery/play`;
  }

  /**
   * Build the XAPI URL for fetch lottery wins.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/lottery/wins
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_FETCH_LOTTERY_WINS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_FETCH_LOTTERY_WINS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/lottery/wins`;
  }

  /**
   * Build the XAPI URL for set basket lottery.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/lottery
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_SET_BASKET_LOTTERY("my-shop");
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_SET_BASKET_LOTTERY(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/lottery`;
  }

  //―――――――――――――――――――――― User Selected Currency ――――――――――――――――――――

  /**
   * Build the XAPI URL for set user currency.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/currency
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_SET_USER_CURRENCY("my-shop");
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_SET_USER_CURRENCY(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/currency`;
  }

  //―――――――――――――――――――――― Shop > Contact Us ――――――――――――――――――――
  /**
   * Build the XAPI URL for shop tickets list.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/contacts
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_TICKETS_LIST("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_TICKETS_LIST(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contacts`;
  }

  /**
   * Build the XAPI URL for shop ticket update message.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/contacts/{contact_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `contact_id`: Customer support/contact ticket id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - `message` is required by `ShopContactCustomersController::api_sendContactMessage`.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_SHOP_TICKET_UPDATE_MESSAGE("my-shop", 77);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_SHOP_TICKET_UPDATE_MESSAGE(
    shop_name: string,
    contact_id: number | string,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contacts/${contact_id}`;
  }

  /**
   * Build the XAPI URL for shop ticket message response.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * TODO: This SDK URL is not backed by an active storefront route in the inspected backend source.
   *
   * @endpoint DELETE /shops/@{shop}/contacts/{contact_id}/{index}
   * @auth TODO: Route is commented out in `Backend/routes/xapi.php`; do not treat this URL as active until backend route is restored.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `contact_id`: Customer support/contact ticket id.
   * - `index`: Message index inside the ticket message array.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_SHOP_TICKET_MESSAGE_RESPONSE("my-shop", 77, 0);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_SHOP_TICKET_MESSAGE_RESPONSE(
    shop_name: string,
    contact_id: number | string,
    index: number,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contacts/${contact_id}/${index}`;
  }

  /**
   * Build the XAPI URL for shop ticket close.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/contacts/{contact_id}/close
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `contact_id`: Customer support/contact ticket id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SHOP_TICKET_CLOSE("my-shop", 77);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SHOP_TICKET_CLOSE(shop_name: string, contact_id: number | string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contacts/${contact_id}/close`;
  }

  /**
   * Build the XAPI URL for shop ticket rate.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/contacts/{contact_id}/rate
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `contact_id`: Customer support/contact ticket id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - `rate` is validated by `ShopContactCustomersController::api_rateMyShopTicket`.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_SHOP_TICKET_RATE("my-shop", 77);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_SHOP_TICKET_RATE(shop_name: string, contact_id: number | string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contacts/${contact_id}/rate`;
  }

  //―――――――――――――――――――――― Instagram ――――――――――――――――――――

  /**
   * Build the XAPI URL for instagram data.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/channels/instagram
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_INSTAGRAM_DATA("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_INSTAGRAM_DATA(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/channels/instagram`;
  }

  //―――――――――――――――――――――― Avocado ――――――――――――――――――――
  /**
   * Build the XAPI URL for customer open avocado.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/avocado
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_CUSTOMER_OPEN_AVOCADO("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_CUSTOMER_OPEN_AVOCADO(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado`;
  }

  /**
   * Build the XAPI URL for customer history avocados.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/avocados
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_CUSTOMER_HISTORY_AVOCADOS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_CUSTOMER_HISTORY_AVOCADOS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocados`;
  }

  /**
   * Build the XAPI URL for add open avocado item.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/avocado/{hash}/items
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `hash`: Open avocado order hash.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_ADD_OPEN_AVOCADO_ITEM("my-shop", "avo_hash");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_ADD_OPEN_AVOCADO_ITEM(shop_name: string, hash: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}/items`;
  }

  /**
   * Build the XAPI URL for open avocado item.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /shops/@{shop}/avocado/{hash}/items/{item_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `hash`: Open avocado order hash.
   * - `item_id`: Listing item id or basket item id according to endpoint path.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_OPEN_AVOCADO_ITEM("my-shop", "avo_hash", 456);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_OPEN_AVOCADO_ITEM(
    shop_name: string,
    hash: string,
    item_id: string | number,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}/items/${item_id}`;
  }

  /**
   * Build the XAPI URL for reserve avocado.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/avocado/{hash}/reserve
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `hash`: Open avocado order hash.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_RESERVE_AVOCADO("my-shop", "avo_hash");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_RESERVE_AVOCADO(shop_name: string, hash: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}/reserve`;
  }

  /**
   * Build the XAPI URL for customer info for avocado.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/avocado/{hash}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `hash`: Open avocado order hash.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_CUSTOMER_INFO_FOR_AVOCADO("my-shop", "avo_hash");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_CUSTOMER_INFO_FOR_AVOCADO(shop_name: string, hash: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}`;
  }

  /**
   * Build the XAPI URL for set customer info for avocado.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/@{shop}/avocado/{hash}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `hash`: Open avocado order hash.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_SET_CUSTOMER_INFO_FOR_AVOCADO("my-shop", "avo_hash");
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_SET_CUSTOMER_INFO_FOR_AVOCADO(shop_name: string, hash: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}`;
  }

  /**
   * Build the XAPI URL for pay avocado.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/avocado/{hash}/pay/{gateway}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `hash`: Open avocado order hash.
   * - `gateway`: Payment gateway code. Basket payment backend routes name this parameter `{gateway_code}`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Gateway/payment payload such as transaction status, redirect data, client token, receipt upload metadata, or `success` flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_PAY_AVOCADO("my-shop", "avo_hash", "stripe");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_PAY_AVOCADO(shop_name: string, hash: string, gateway: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}/pay/${gateway}`;
  }

  /**
   * Build the XAPI URL for order avocado basket info.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/avo-baskets/{avocado_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `avocado_id`: Avocado order id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_ORDER_AVOCADO_BASKET_INFO("my-shop", 88);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_ORDER_AVOCADO_BASKET_INFO(shop_name: string, avocado_id: number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avo-baskets/${avocado_id}`;
  }

  //―――――――――――――――――――――― Avocado ――――――――――――――――――――
  /**
   * Build the XAPI URL for customer open hyper.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/hyper
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_CUSTOMER_OPEN_HYPER("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_CUSTOMER_OPEN_HYPER(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hyper`;
  }

  /**
   * Build the XAPI URL for add open hyper item.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/hyper/items
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_ADD_OPEN_HYPER_ITEM("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_ADD_OPEN_HYPER_ITEM(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hyper/items`;
  }

  /**
   * Build the XAPI URL for customer history hypers.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/hypers
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_CUSTOMER_HISTORY_HYPERS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_CUSTOMER_HISTORY_HYPERS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hypers`;
  }

  /**
   * Build the XAPI URL for pay hyper.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/hyper/pay/{gateway}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `gateway`: Payment gateway code. Basket payment backend routes name this parameter `{gateway_code}`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Gateway/payment payload such as transaction status, redirect data, client token, receipt upload metadata, or `success` flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_PAY_HYPER("my-shop", "stripe");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_PAY_HYPER(shop_name: string, gateway: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hyper/pay/${gateway}`;
  }

  /**
   * Build the XAPI URL for open hyper item.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /shops/@{shop}/hyper/items/{item_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `item_id`: Listing item id or basket item id according to endpoint path.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_OPEN_HYPER_ITEM("my-shop", 456);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_OPEN_HYPER_ITEM(shop_name: string, item_id: string | number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hyper/items/${item_id}`;
  }

  /**
   * Build the XAPI URL for customer info for hyper.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/hyper/{hyper_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `hyper_id`: Hyper order id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_CUSTOMER_INFO_FOR_HYPER("my-shop", 99);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_CUSTOMER_INFO_FOR_HYPER(shop_name: string, hyper_id: string | number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hyper/${hyper_id}`;
  }

  //█████████████████████████████████████████████████████████████
  //―――――――――――――――――――――― Check Payments & Verify ―――――――――――――――――――――
  //█████████████████████████████████████████████████████████████

  // ―――――――――― PayPal Standard ――――――――――
  /**
   * Build the XAPI URL for payments paypal standard verify.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /paypal-standard/@{shop}/verify
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Gateway/payment payload such as transaction status, redirect data, client token, receipt upload metadata, or `success` flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_PAYMENTS_PAYPAL_STANDARD_VERIFY("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_PAYMENTS_PAYPAL_STANDARD_VERIFY(shop_name: string) {
    return `${this.selldone_xapi_url}/paypal-standard/@${shop_name}/verify`;
  }

  //█████████████████████████████████████████████████████████████
  //――――――――――――――――――――――――――― Article ―――――――――――――――――――――――――
  //█████████████████████████████████████████████████████████████

  //―――――――――――――――――――――― SEO ――――――――――――――――――――
  /**
   * Build the XAPI URL for article seo audit.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/{shop_id}/seo-audit/articles/{article_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   * - `article_id`: Article id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_ARTICLE_SEO_AUDIT(123, 44);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_ARTICLE_SEO_AUDIT(shop_id: number | string, article_id: string | number) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/seo-audit/articles/${article_id}`;
  }

  //―――――――――――――――――――――― Import word file ――――――――――――――――――――
  /**
   * Build the XAPI URL for shop converter word html.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/{shop_id}/converter/word/html
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SHOP_CONVERTER_WORD_HTML(123);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SHOP_CONVERTER_WORD_HTML(shop_id: string | number) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/converter/word/html`;
  }

  //―――――――――――――――――――――― Translate ――――――――――――――――――――
  /**
   * Build the XAPI URL for translate product article.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/{shop_id}/products/{product_id}/translate-article
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_TRANSLATE_PRODUCT_ARTICLE(123, 123);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_TRANSLATE_PRODUCT_ARTICLE(
    shop_id: string | number,
    product_id: string | number,
  ) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/products/${product_id}/translate-article`;
  }

  //―――――――――――――――――――――― User Feedback ――――――――――――――――――――
  /**
   * Build the XAPI URL for like article.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /articles/{article_id}/like
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `article_id`: Article id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_LIKE_ARTICLE(44);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_LIKE_ARTICLE(article_id: string | number) {
    return `${this.selldone_xapi_url}/articles/${article_id}/like`;
  }

  /**
   * Build the XAPI URL for star article.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /articles/{article_id}/star
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `article_id`: Article id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_STAR_ARTICLE(44);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_STAR_ARTICLE(article_id: string | number) {
    return `${this.selldone_xapi_url}/articles/${article_id}/star`;
  }

  /**
   * Build the XAPI URL for claps of article.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /articles/{article_id}/claps
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `article_id`: Article id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_CLAPS_OF_ARTICLE(44);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_CLAPS_OF_ARTICLE(article_id: string | number) {
    return `${this.selldone_xapi_url}/articles/${article_id}/claps`;
  }

  /**
   * Build the XAPI URL for report article.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /articles/{article_id}/report/{category}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `article_id`: Article id.
   * - `report`: Article report category value; backend route names it `{category}`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_REPORT_ARTICLE(44, 1);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_REPORT_ARTICLE(article_id: string | number, report: number) {
    return `${this.selldone_xapi_url}/articles/${article_id}/report/${report}`;
  }

  //―――――――――――――――――――――― Timeline ――――――――――――――――――――
  /**
   * Build the XAPI URL for shop articles timeline.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/{shop_id}/timeline/articles
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_ARTICLES_TIMELINE(123);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_ARTICLES_TIMELINE(shop_id: string | number) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/timeline/articles`;
  }

  //―――――――――――――――――――――― Edit ――――――――――――――――――――
  /**
   * Build the XAPI URL for add edit article.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /article/{type}/edit
   * @auth Customer token (`auth:api`). `type` dispatches to `product` or `shop-blog` routes.
   *
   * Path parameters:
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_ADD_EDIT_ARTICLE("PHYSICAL");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_ADD_EDIT_ARTICLE(type: string) {
    return `${this.selldone_xapi_url}/article/${type}/edit`;
  }

  //―――――――――――――――――――――― Upload ――――――――――――――――――――
  /**
   * Upload article image.
   * @param type
   * @param extra         shop ID
   * @returns {string}
   */
  /**
   * Build the XAPI URL for upload article image.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /article/product/upload/{shop_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   * - `extra`: Forwarded to the backend route without SDK-side validation.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Multipart/form-data upload. Accepted file field, image constraints, and optimization middleware are defined by the cited backend method.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.UPLOAD_ARTICLE_IMAGE("PHYSICAL", "value");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  UPLOAD_ARTICLE_IMAGE(type: string, extra = null): string {
    if (!extra) return `${this.selldone_xapi_url}/article/${type}/upload`;
    return `${this.selldone_xapi_url}/article/${type}/upload/${extra}`;
  }

  /**
   * Build the XAPI URL for upload article blog image.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/{shop_id}/blogs/upload
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Multipart/form-data upload. Accepted file field, image constraints, and optimization middleware are defined by the cited backend method.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.UPLOAD_ARTICLE_BLOG_IMAGE(123);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  UPLOAD_ARTICLE_BLOG_IMAGE(shop_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/${shop_id}/blogs/upload`;
  }

  //―――――――――――――――――――――― Delete ――――――――――――――――――――
  /**
   * Build the XAPI URL for article.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /article/{type}/{article_id}
   * @auth Customer token (`auth:api`). `type` dispatches to `product` or `shop-blog` routes.
   *
   * Path parameters:
   * - `type`: Backend route discriminator. Basket routes use order/product types such as `PHYSICAL`, `VIRTUAL`, `FILE`, `SERVICE`, `SUBSCRIPTION`; article routes use `product` or `shop-blog`.
   * - `article_id`: Article id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_ARTICLE("PHYSICAL", 44);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_ARTICLE(type: string, article_id: string | number): string {
    return `${this.selldone_xapi_url}/article/${type}/${article_id}`;
  }

  //―――――――――――――――――――――― Tags ――――――――――――――――――――
  /**
   * Build the XAPI URL for shop article tags.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/{shop_id}/articles/tags
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_ARTICLE_TAGS(123);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_ARTICLE_TAGS(shop_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/${shop_id}/articles/tags`;
  }

  /**
   * Build the XAPI URL for change tag.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /shops/{shop_id}/articles/tags
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_CHANGE_TAG(123);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_CHANGE_TAG(shop_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/${shop_id}/articles/tags`;
  }

  /**
   * Build the XAPI URL for set shop article tags.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/{shop_id}/articles/tags/{article_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   * - `article_id`: Article id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Blog/article payload, tags, comments, upload metadata, or edit/delete status according to the controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SET_SHOP_ARTICLE_TAGS(123, 44);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SET_SHOP_ARTICLE_TAGS(
    shop_id: string | number,
    article_id: string | number,
  ) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/articles/tags/${article_id}`;
  }

  //―――――――――――――――――――――― Comments ――――――――――――――――――――
  /**
   * Build the XAPI URL for add comment.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /article/{article_id}/comment
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `article_id`: Article id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_ADD_COMMENT(44);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_ADD_COMMENT(article_id: string | number) {
    return `${this.selldone_xapi_url}/article/${article_id}/comment`;
  }

  /**
   * Build the XAPI URL for update comment.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint PUT /comment/{comment_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `comment_id`: Comment id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.PUT_UPDATE_COMMENT(66);
   * const response = await fetch(url, { method: "PUT" });
   * const data = await response.json();
   * ```
   */
  PUT_UPDATE_COMMENT(comment_id: string | number) {
    return `${this.selldone_xapi_url}/comment/${comment_id}`;
  }

  /**
   * Build the XAPI URL for comment.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /comment/{comment_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `comment_id`: Comment id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_COMMENT(66);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_COMMENT(comment_id: string | number) {
    return `${this.selldone_xapi_url}/comment/${comment_id}`;
  }

  //―――――――――――――――――――――― Follow ――――――――――――――――――――
  /**
   * Build the XAPI URL for follow user.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /user/follow/{following_user_id}
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `user_id`: User id to follow.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_FOLLOW_USER(22);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_FOLLOW_USER(user_id: string | number) {
    return `${this.selldone_xapi_url}/user/follow/${user_id}`;
  }

  /**
   * Build the XAPI URL for customer basket chat add message.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/baskets/{basket_id}/chat
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_CUSTOMER_BASKET_CHAT_ADD_MESSAGE("my-shop", 789);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_CUSTOMER_BASKET_CHAT_ADD_MESSAGE(
    shop_name: string,
    basket_id: string | number,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/chat`;
  }

  /**
   * Build the XAPI URL for customer basket chat message.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /shops/@{shop}/baskets/{basket_id}/chat/{message_index}
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `basket_id`: Order basket id from the matching basket/order table.
   * - `message_index`: Forwarded to the backend route without SDK-side validation.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw basket/order payload. Common keys include `success`, `basket`, `items`, `bill`, `payment_url`, share/retrieve metadata, or action-specific flags.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_CUSTOMER_BASKET_CHAT_MESSAGE("my-shop", 789, "value");
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_CUSTOMER_BASKET_CHAT_MESSAGE(
    shop_name: string,
    basket_id: string | number,
    message_index: number,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/chat/${message_index}`;
  }

  //―――――――――――――――――――――― Vendors ――――――――――――――――――――

  /**
   * Build the XAPI URL for vendors.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/vendors
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Public marketplace vendor payload and optional custom page data.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_VENDORS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_VENDORS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/vendors`;
  }

  /**
   * Build the XAPI URL for vendor info.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/vendors/{vendor_id}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `vendor_id`: Marketplace vendor id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Public marketplace vendor payload and optional custom page data.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_VENDOR_INFO("my-shop", 33);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_VENDOR_INFO(shop_name: string, vendor_id: number | string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/vendors/${vendor_id}`;
  }

  /**
   * Build the XAPI URL for vendor page data.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/vendors/{vendor_id}/page
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `vendor_id`: Marketplace vendor id.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Public marketplace vendor payload and optional custom page data.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_VENDOR_PAGE_DATA("my-shop", 33);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_VENDOR_PAGE_DATA(shop_name: string, vendor_id = "") {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/vendors/${vendor_id}/page`;
  }


  //―――――――――――――――――――――― 🎗️ Subscription ――――――――――――――――――――
  /**
   * Build the XAPI URL for subscribe now.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/products/{product_id}/subscribe
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SUBSCRIBE_NOW("my-shop", 123);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SUBSCRIBE_NOW(shop_name: string, product_id: number | string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/subscribe`;
  }

  /**
   * Build the XAPI URL for product membership contents.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/products/{product_id}/contents
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_PRODUCT_MEMBERSHIP_CONTENTS("my-shop", 123);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_PRODUCT_MEMBERSHIP_CONTENTS(
    shop_name: string,
    product_id: number | string,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/contents`;
  }

  /**
   * Build the XAPI URL for product membership contents send my rating.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/products/{product_id}/contents/{content_id}/rate
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `product_id`: Product id from `shop_products.id`.
   * - `content_id`: Membership content id.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_PRODUCT_MEMBERSHIP_CONTENTS_SEND_MY_RATING("my-shop", 123, 44);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_PRODUCT_MEMBERSHIP_CONTENTS_SEND_MY_RATING(
    shop_name: string,
    product_id: number | string,
    content_id: number | string,
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/contents/${content_id}/rate`;
  }

  //―――――――――――――――――――――― Stream Users (Public Form) ――――――――――――――――――――
  /**
   *
   * @param domain      we need to force xapi.selldone.com ... because of It's just for showing to user in dashboard!
   * @param shop_id
   * @param key
   * @returns {string}
   * @constructor
   */
  /**
   * Build the XAPI URL for stream user add.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/{shop_id}/audience/{access_key}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `domain`: Absolute XAPI domain override used by embedded public forms.
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   * - `key`: Audience access key such as `newsletter`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute stream form URL using the supplied `domain`.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_STREAM_USER_ADD("https://xapi.selldone.com", 123, "newsletter");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_STREAM_USER_ADD(
    domain: string,
    shop_id: string | number,
    key: string,
  ): string {
    return `${domain}/shops/${shop_id}/audience/${key}`;
  }

  /**
   * Build the XAPI URL for stream user add newsletter.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/{shop_id}/audience/{access_key}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_id`: Numeric shop id for routes that are not bound by public shop name.
   * - `key`: Audience access key such as `newsletter`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_STREAM_USER_ADD_NEWSLETTER(123, "newsletter");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_STREAM_USER_ADD_NEWSLETTER(
    shop_id: string | number,
    key = "newsletter",
  ) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/audience/${key}`;
  }

  //―――――――――――――――――――――― Language (Override packs)  ――――――――――――――――――――
  /**
   * Build the XAPI URL for shop language pack.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/languages/{language}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `language`: Language/locale code.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_LANGUAGE_PACK("my-shop", "en");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_LANGUAGE_PACK(shop_name: string, language: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/languages/${language}`;
  }

  //―――――――――――――――――――――― Cashback Program (Get eligible) ――――――――――――――――――――
  /**
   * Build the XAPI URL for shop cashback program.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/cashback
   * @auth Optional customer token or guest session. This route is registered in both public and `auth:api` groups.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Raw Selldone JSON response returned by the cited controller. Success responses commonly include `success: true` plus endpoint-specific keys; validation failures use Laravel validation error JSON.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_CASHBACK_PROGRAM("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_CASHBACK_PROGRAM(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/cashback`;
  }












  //―――――――――――――――――――――― Listing (Storefront) ――――――――――――――――――――

  /**
   * Build the XAPI URL for shop listing info.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/listing
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_LISTING_INFO("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_LISTING_INFO(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing`;
  }

  /**
   * Build the XAPI URL for shop listing categories.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/listing/categories
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - `search`, `offset`, `limit`, `sortBy`, and `sortDesc` are accepted by `StorefrontShopListingCategoriesController::list`.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_LISTING_CATEGORIES("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_LISTING_CATEGORIES(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing/categories`;
  }

  /**
   * Build the XAPI URL for shop listing items.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/listing/items
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - `category_id`, `search`, `lat`, `lng`, `radius_km`, `filters[...]`, `offset`, `limit`, `sortBy`, and `sortDesc` are validated/applied by `StorefrontShopListingItemsController::list`.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_LISTING_ITEMS("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_LISTING_ITEMS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing/items`;
  }

  /**
   * Build the XAPI URL for shop listing item.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/listing/items/{item_id}
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `item_id`: Listing item id or basket item id according to endpoint path.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_LISTING_ITEM("my-shop", 456);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_LISTING_ITEM(shop_name: string, item_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing/items/${item_id}`;
  }



  // Listing item reviews (storefront)
  /**
   * Build the XAPI URL for shop listing item reviews.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/listing/items/{item_id}/reviews
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `item_id`: Listing item id or basket item id according to endpoint path.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_LISTING_ITEM_REVIEWS("my-shop", 456);
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_LISTING_ITEM_REVIEWS(shop_name: string, item_id: string | number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing/items/${item_id}/reviews`;
  }

  /**
   * Build the XAPI URL for shop listing item review.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/listing/items/{item_id}/reviews
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `item_id`: Listing item id or basket item id according to endpoint path.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Review rating/content fields are validated by `StorefrontShopListingItemReviewsController::setMyReview`.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SHOP_LISTING_ITEM_REVIEW("my-shop", 456);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SHOP_LISTING_ITEM_REVIEW(shop_name: string, item_id: string | number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing/items/${item_id}/reviews`;
  }

  /**
   * Build the XAPI URL for shop listing item review.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint DELETE /shops/@{shop}/listing/items/{item_id}/reviews
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `item_id`: Listing item id or basket item id according to endpoint path.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.DELETE_SHOP_LISTING_ITEM_REVIEW("my-shop", 456);
   * const response = await fetch(url, { method: "DELETE" });
   * const data = await response.json();
   * ```
   */
  DELETE_SHOP_LISTING_ITEM_REVIEW(shop_name: string, item_id: string | number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing/items/${item_id}/reviews`;
  }



  /**
   * Build the XAPI URL for shop listing message.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * TODO: This SDK URL is not backed by an active storefront route in the inspected backend source.
   *
   * @endpoint POST /shops/@{shop}/listing/messages
   * @auth TODO: No active XAPI route found. Active backend route only accepts item-level messages at `/listing/items/{item}/messages`.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - JSON/form body is provided by the caller and validated in the cited backend controller method. Preserve exact Selldone API field names.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SHOP_LISTING_MESSAGE("my-shop");
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SHOP_LISTING_MESSAGE(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing/messages`;
  }

  /**
   * Build the XAPI URL for shop listing item message.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint POST /shops/@{shop}/listing/items/{item}/messages
   * @auth Customer token (`auth:api`).
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   * - `item_id`: Listing item id or basket item id according to endpoint path.
   *
   * Query parameters:
   * - None unless the cited backend controller reads query values.
   *
   * Request body:
   * - Listing item message/contact fields are validated by `StorefrontShopListingItemMessagesController::send`.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 401 `unauthenticated`: missing or expired Passport customer token.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.POST_SHOP_LISTING_ITEM_MESSAGE("my-shop", 456);
   * const response = await fetch(url, { method: "POST" });
   * const data = await response.json();
   * ```
   */
  POST_SHOP_LISTING_ITEM_MESSAGE(shop_name: string, item_id: number | string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing/items/${item_id}/messages`;
  }



  /**
   * Build the XAPI URL for shop listing items compare.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/listing/compare
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop`: Public shop name passed to the `{shop}` route binding after `@`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Local `/xapi/...` URL string exactly as implemented by this SDK method.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_LISTING_ITEMS_COMPARE("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_LISTING_ITEMS_COMPARE(shop: string) {
    return `/xapi/shops/@${shop}/listing/compare`;
  }


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Storefront ▶ Listing ▶ Search Config
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  /**
   * Build the XAPI URL for shop listing search.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * TODO: This SDK URL is not backed by an active storefront route in the inspected backend source.
   *
   * @endpoint GET /shops/@{shop}/listing/search
   * @auth TODO: No active storefront XAPI route found. Dashboard search-settings controllers exist under `App\Http\Controllers\Selldone\Listing\Search`, but are not registered in `routes/xapi.php`.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - No query string is appended by this SDK method unless shown in its URL template. Any controller-specific query filters are read directly by the cited backend method.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_LISTING_SEARCH("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_LISTING_SEARCH(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing/search`;
  }


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Storefront ▶ Listing ▶ Badges
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  /**
   * Build the XAPI URL for shop listing item badges.
   *
   * This method only constructs the storefront XAPI endpoint URL; it does not execute the request. Send query/body data with your HTTP client and preserve exact Selldone API/database field names.
   *
   * @endpoint GET /shops/@{shop}/listing/badges
   * @auth Public. The global `customer-access` middleware may attach guest/customer context when available.
   *
   * Path parameters:
   * - `shop_name`: Public shop name passed to the `{shop}` route binding after `@`; missing or penalized shops return 404 in `RouteServiceProvider`.
   *
   * Query parameters:
   * - Optional `ids` filter as CSV or array is parsed by `StorefrontShopListingBadgesController::list`.
   *
   * Request body:
   * - No request body.
   *
   * Response:
   * - Listing endpoints return raw storefront listing records, arrays, pagination metadata, reviews, badges, or message result flags as produced by the listing controller.
   *
   * Possible errors:
   * - 400 `bad_request`: malformed input or a business-rule rejection from the controller.
   * - 404 `not_found`: shop route binding failed or the addressed resource does not belong to the shop/user.
   * - 422 `validation_error`: Laravel validation failure with field-level errors.
   * - 429 `too_many_requests`: XAPI or login throttle limit exceeded.
   *
   * @returns Absolute XAPI URL string based on the `selldone-xapi` meta tag.
   *
   * @example
   * ```ts
   * const xapi = new XAPI();
   * const url = xapi.GET_SHOP_LISTING_ITEM_BADGES("my-shop");
   * const response = await fetch(url, { method: "GET" });
   * const data = await response.json();
   * ```
   */
  GET_SHOP_LISTING_ITEM_BADGES(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/listing/badges`;
  }






}
