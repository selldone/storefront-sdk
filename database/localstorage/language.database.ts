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

import type {ILanguage} from "../../../../core/enums/language/Language";
import {Language} from "../../../../core/enums/language/Language";

export class LanguageDatabase {

    public shop_name: string;

    constructor(shop_name: string) {
        this.shop_name = shop_name;
    }

    getLanguage(): ILanguage | null {
        // Try to read from local storage:
        const user_language = localStorage.getItem(`local-shop-${this.shop_name}`);
        if (user_language && Language[user_language]) {
            return Language[user_language];
        }
        return null;
    }
    setLanguage(language:ILanguage|string){
        localStorage.setItem("local-shop-" + window.$storefront.name,(typeof language === 'object')?language.code:language );
    }
}
