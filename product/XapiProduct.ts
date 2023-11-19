import { APIAbstract } from "@core/server/APIAbstract";
import fetchProducts from "./requests/xapi.products.get";
import getInfo from "./requests/xapi.product.get";
import {XapiProductRate} from "./rate/XapiProductRate";
import {XapiProductSubscription} from "./subscription/XapiProductSubscription";

export class XapiProduct extends APIAbstract {
  public shop_name: string;


  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
    this.rate=new XapiProductRate(shop_name);
    this.subscription=new XapiProductSubscription(shop_name);
  }


  public rate : XapiProductRate;
  public subscription : XapiProductSubscription;


  public fetchProducts = fetchProducts;
  public getInfo = getInfo;


}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiProduct {}
