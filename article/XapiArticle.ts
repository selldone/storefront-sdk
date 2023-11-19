import { APIAbstract } from "@core/server/APIAbstract";
import {XapiArticleTag} from "./tag/XapiArticleTag";

export class XapiArticle extends APIAbstract {
  public shop_name: string;


  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
    this.tags=new XapiArticleTag(shop_name)
  }


  public tags : XapiArticleTag;



}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiProduct {}
