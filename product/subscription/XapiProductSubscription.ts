import {APIAbstract} from "../../../../core/server/APIAbstract";
import getContents from "./requests/xapi.product.subscription.contents.get";


export class XapiProductSubscription extends APIAbstract {

  public shop_name: string;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
  }

  public getContents = getContents;


}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

