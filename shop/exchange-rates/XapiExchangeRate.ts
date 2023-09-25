import { APIAbstract } from "../../../../core/server/APIAbstract";
import fetchRates from "./requests/xapi.exchange-rates.get";

export class XapiExchangeRate extends APIAbstract {
  public shop_name: string;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
  }

  public fetchRates = fetchRates;
}

export namespace XapiExchangeRate {}
