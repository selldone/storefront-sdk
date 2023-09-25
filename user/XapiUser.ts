import { LocalStorages } from "../../../core/helper/local-storage/LocalStorages";
import { APIAbstract, type IErrorResponse } from "../../../core/server/APIAbstract";
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
      codes: LocalStorages.GetShopHistoryGuestAllCodes(),
      guest_code: LocalStorages.GetShopGuestCode(),
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
