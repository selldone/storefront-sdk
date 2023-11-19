import { APIAbstract } from "@core/server/APIAbstract";
import fetchLanguagePack from "./requests/xapi.language.get";

export class XapiLanguage extends APIAbstract {
  public shop_name: string;

  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
  }

  public fetchLanguagePack = fetchLanguagePack;
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiLanguage {}
