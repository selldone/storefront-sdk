import submitMyRate from "./requests/xapi.product.rate.submit.post";
import {APIAbstract} from "@core/server/APIAbstract";


export class XapiProductRate extends APIAbstract {

  public shop_name: string;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
  }

  public submitMyRate = submitMyRate;


}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

