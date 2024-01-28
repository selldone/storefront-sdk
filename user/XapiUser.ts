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

import { StorefrontLocalStorages } from "@core/helper/local-storage/StorefrontLocalStorages";
import { APIAbstract, type IErrorResponse } from "@core/server/APIAbstract";
import { AxiosError } from "axios";
import setUserCurrency from "./requests/xapi.user.currency.put";
import setFcmToken from "./requests/xapi.user.fcm.post";


export class XapiUser extends APIAbstract {
  /** Name of the shop for which the API operations will be performed. */
  public shop_name: string;

  public setUserCurrency = setUserCurrency;
  public setFcmToken = setFcmToken;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
  }

  fetchMyInfo(
    onSuccess: (data: XapiUser.IMeServerResponse) => void,
    onError?: (error: IErrorResponse | AxiosError) => void
  ): void {
    const params = {
      codes: StorefrontLocalStorages.GetShopHistoryGuestAllCodes(),
      guest_code: StorefrontLocalStorages.GetShopGuestCode(),
    };
    const url = window.XAPI.GET_USER();
    this.getDebounce(url, params, onSuccess, onError, {
      max_valid_status_code: 500 /*We assume any error response except 5xx (server error) as success response to be able auto logout user!*/,
    });
  }


}//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiUser {
  export interface IMeServerResponse {
    error?: boolean;
    error_msg?: string;

    /** The unique identifier for the user. */
    id: number;

    /** The user's full name. */
    name: string;

    phone?: string;

    phone_verified: boolean;

    personal_information_verified: boolean;

    email_verified: boolean;

    subscribed: boolean;

    chips: number;

    profile: UserProfile | null;

    block_at?: Date;

    access: boolean;
  }



}
