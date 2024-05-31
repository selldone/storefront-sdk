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

import {APIAbstract} from "@selldone/core-js/server/APIAbstract";
import XapiAuthSMSRequestOtp from "@selldone/sdk-storefront/auth/sms/request-otp/XapiAuthSMSRequestOtp";
import XapiAuthSMSVerifyOtp from "@selldone/sdk-storefront/auth/sms/verify-otp/XapiAuthSMSVerifyOtp";
import XapiAuthSMSRegisterUser from "@selldone/sdk-storefront/auth/sms/register-user/XapiAuthSMSRegisterUser";
import XapiAuthSMSSelectUser from "@selldone/sdk-storefront/auth/sms/select-user/XapiAuthSMSSelectUser";

export class XapiAuthSMS extends APIAbstract {
  public shop_name: string;

  public requestOTP = XapiAuthSMSRequestOtp;
  public verifyOTP = XapiAuthSMSVerifyOtp;
  public registerUser = XapiAuthSMSRegisterUser;
  public selectUser = XapiAuthSMSSelectUser;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
  }
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiAuthSMSTypes {

}
