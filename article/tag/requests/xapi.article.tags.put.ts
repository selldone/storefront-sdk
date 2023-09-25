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


import type {XapiArticleTag} from "../XapiArticleTag";



export default function updateTag(
  this: XapiArticleTag,
  shop_id: string | number,
  old_tag: string ,
  new_tag: string ,
){
  const url = window.XAPI.PUT_CHANGE_TAG(shop_id);
const params={
  old: old_tag,
  new: new_tag,
}
  return this.putNow<xapi.article.tags.put.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.article.tags.put {
  export interface IResponse {
    success:boolean
  }


}
