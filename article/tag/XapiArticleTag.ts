import setArticleTags from "./requests/xapi.article.tags.post";
import {APIAbstract} from "../../../../core/server/APIAbstract";
import updateTag from "./requests/xapi.article.tags.put";
import getTags from "./requests/Xapi.article.tags.get";

export class XapiArticleTag extends APIAbstract {
  public shop_name: string;


  constructor(shop_name: string) {
    super();
    this.shop_name = shop_name;
  }


  public setArticleTags = setArticleTags;
  public updateTag = updateTag;
  public getTags = getTags;



}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace XapiProduct {}
