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

import type {XapiAvocado} from "../XapiAvocado";
import type {AvocadoItem} from "@selldone/core-js/models/shop/order/avocado/avocado.item";

export default function addItem(
  this: XapiAvocado,
  hash: string,
  title: string,
  message: string | null,
  link: string | null,
  photo: Blob | null,
  count: number,
) {
  const url = window.XAPI.POST_ADD_OPEN_AVOCADO_ITEM(this.shop_name, hash);

  const params = new FormData();
  if (photo) params.append("photo", photo);
  if (title) params.append("title", title);
  if (message) params.append("message", message);
  if (link) params.append("link", link);
  params.append("count", count.toString());

  return this.postNow<xapi.avocado.add_item.post.IResponse>(url, params);
}

//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████

export namespace xapi.avocado.add_item.post {
  export interface IResponse {
    success: boolean;
    item: AvocadoItem;
  }
}
