import { CouponDatabase } from "./localstorage/coupon.database";
import {CurrencyDatabase} from "./localstorage/currency.database";
import {LanguageDatabase} from "./localstorage/language.database";

export class StorefrontDatabase {
  /** Name of the shop for which the API operations will be performed. */
  public shop_name: string;

  public coupon: CouponDatabase;
  public currency: CurrencyDatabase;
  public language: LanguageDatabase;
  constructor(shop_name: string) {
    this.shop_name = shop_name;

    this.coupon = new CouponDatabase(this.shop_name);
    this.currency = new CurrencyDatabase(this.shop_name);
    this.language = new LanguageDatabase(this.shop_name);
  }


}
