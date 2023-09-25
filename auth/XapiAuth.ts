import { APIAbstract } from "../../../core/server/APIAbstract";
import { XapiAuthSMS } from "./XapiAuthSMS";


export class XapiAuth extends APIAbstract {
  public shop_name: string;
  public sms: XapiAuthSMS;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
    this.sms = new XapiAuthSMS(this.shop_name);
  }

  public logout(): Promise<{ success: true }> {
    const url = window.XAPI.LOGOUT(this.shop_name);
    return this.postNow<{ success: true }>(url, null);
  }
}


export namespace XapiAuth {


  export enum LoginSource {
    CUSTOMER = "customer",
    VENDOR = "vendor",
  }
}
