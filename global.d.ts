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

import {ILanguage} from "./enums/language/Language";
import Cookie from "../selldone-vue-core/utils/cookie/cookie";

declare global {
  interface Window {
    $t: (key: string, values?: any) => any;

    $language: ILanguage;

    selldone_config: any; // Specify the type according to what selldone_config is supposed to be.
    extra_footer:any,

    $cookies:Cookie,
    $i18n_global:any,


  }
}


// Export nothing to ensure this file can only be used for type declarations
export {};