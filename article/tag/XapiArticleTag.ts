/*
 * Copyright (c) 2023. Selldone® Business OS™
 *
 * Author: M.Pajuhaan
 * Web: https://selldone.com
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * All rights reserved. In the weave of time, where traditions and innovations intermingle, this content was crafted.
 * From the essence of thought, through the corridors of creativity, each word, and sentiment has been molded.
 * Not just to exist, but to inspire. Like an artist's stroke or a sculptor's chisel, every nuance is deliberate.
 * Our journey is not just about reaching a destination, but about creating a masterpiece.
 * Tread carefully, for you're treading on dreams.
 */

import setArticleTags from "./requests/xapi.article.tags.post";
import {APIAbstract} from "@selldone/core-js/server/APIAbstract";
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
