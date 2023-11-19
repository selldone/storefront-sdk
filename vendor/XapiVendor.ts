import {APIAbstract} from "@core/server/APIAbstract";
import getVendor from "./requests/xapi.vendor.get";


export class XapiVendor extends APIAbstract {

  public shop_name: string;

  public getVendor = getVendor;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
  }



}//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiUser {


}
