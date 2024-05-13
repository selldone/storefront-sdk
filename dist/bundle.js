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
define("user/requests/xapi.user.currency.put", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function setUserCurrency(currency) {
        var params = { currency: currency };
        var url = window.XAPI.PUT_SET_USER_CURRENCY(this.shop_name);
        return this.putNow(url, params, { accept_error_response: true } /*If guest shopping be disabled, then Selldone return error! But we want to accept this as correct response!*/);
    }
    exports.default = setUserCurrency;
});
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
define("user/requests/xapi.user.fcm.post", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function setFcmToken(token) {
        var params = { token: token };
        var url = window.XAPI.POST_SET_FCM_TOKEN(this.shop_name);
        return this.postNow(url, params);
    }
    exports.default = setFcmToken;
});
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
define("user/XapiUser", ["require", "exports", "tslib", "../selldone-vue-core/helper/local-storage/StorefrontLocalStorages", "../selldone-vue-core/server/APIAbstract", "user/requests/xapi.user.currency.put", "user/requests/xapi.user.fcm.post"], function (require, exports, tslib_1, StorefrontLocalStorages_1, APIAbstract_1, xapi_user_currency_put_1, xapi_user_fcm_post_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiUser = void 0;
    xapi_user_currency_put_1 = tslib_1.__importDefault(xapi_user_currency_put_1);
    xapi_user_fcm_post_1 = tslib_1.__importDefault(xapi_user_fcm_post_1);
    var XapiUser = /** @class */ (function (_super) {
        tslib_1.__extends(XapiUser, _super);
        function XapiUser(shop_name) {
            var _this = _super.call(this) || this;
            _this.setUserCurrency = xapi_user_currency_put_1.default;
            _this.setFcmToken = xapi_user_fcm_post_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        XapiUser.prototype.fetchMyInfo = function (onSuccess, onError) {
            var params = {
                codes: StorefrontLocalStorages_1.StorefrontLocalStorages.GetShopHistoryGuestAllCodes(),
                guest_code: StorefrontLocalStorages_1.StorefrontLocalStorages.GetShopGuestCode(),
            };
            var url = window.XAPI.GET_USER();
            this.getDebounce(url, params, onSuccess, onError, {
                max_valid_status_code: 500 /*We assume any error response except 5xx (server error) as success response to be able auto logout user!*/,
            });
        };
        return XapiUser;
    }(APIAbstract_1.APIAbstract)); //█████████████████████████████████████████████████████████████
    exports.XapiUser = XapiUser;
});
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
define("apis/XAPI", ["require", "exports", "../selldone-vue-core/server/SetupService"], function (require, exports, SetupService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XAPI = void 0;
    var XAPI = /** @class */ (function () {
        /**
         * When creating an instance of the class containing this constructor, it will automatically search the HTML document's `<head>` section for a `<meta>` tag with the `name` attribute set to "selldone-xapi".
         *
         * If this tag is found, its `content` value (which should be a URL) will be assigned to the `selldone_xapi_url` property of the instance.
         *
         * ex: <meta name="selldone-xapi" content="https://xapi.example.com">
         *
         */
        function XAPI() {
            this.selldone_xapi_url = "";
            this.selldone_xapi_url = SetupService_1.SetupService.GetMetaValue("selldone-xapi");
        }
        //―――――――――――――――――――――― Login By SMS ――――――――――――――――――――
        XAPI.prototype.SHOP_LOGIN_REQUEST = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/sms-login/request");
        };
        XAPI.prototype.SHOP_LOGIN_VERIFY = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/sms-login/verify");
        };
        XAPI.prototype.SHOP_LOGIN_SELECT_USER = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/sms-login/select-user");
        };
        XAPI.prototype.SHOP_LOGIN_NEW_USER = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/sms-login/new-user");
        };
        //―――――――――――――――――――――― Login By Email ――――――――――――――――――――
        XAPI.prototype.POST_SHOP_LOGIN_EMAIL_REQUEST = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/email-login/request");
        };
        XAPI.prototype.POST_SHOP_LOGIN_EMAIL_VERIFY = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/email-login/verify");
        };
        //―――――――――――――――――――――― User ――――――――――――――――――――
        /**
         * Retrieves the URL for getting user information.
         *
         * Note: This method only works when authenticated by passport.
         *
         * @returns {string} The URL for fetching user information.
         */
        XAPI.prototype.GET_USER = function () {
            return "".concat(this.selldone_xapi_url, "/me");
        };
        XAPI.prototype.LOGOUT = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/logout");
        };
        XAPI.prototype.GET_EXCHANGE_RATES = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/exchange/rates");
        };
        XAPI.prototype.POST_LEAVE_SHOP = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/leave");
        };
        XAPI.prototype.POST_SUBSCRIBE = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/subscribe");
        };
        //―――――――――――――――――――――― Shop ――――――――――――――――――――
        XAPI.prototype.GET_SHOP_INFO = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/info");
        };
        XAPI.prototype.GET_SHOP_PROFILE = function (shop_name, type) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/profiles/").concat(type);
        };
        //―――――――――――――――――――――― Product ――――――――――――――――――――
        XAPI.prototype.GET_PRODUCTS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/all");
        };
        XAPI.prototype.GET_PRODUCTS_LIST = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/list");
        };
        XAPI.prototype.GET_PRODUCT_INFO = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/info");
        };
        XAPI.prototype.GET_PRODUCT_INFO_CARD = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/info-card");
        };
        XAPI.prototype.GET_PRODUCT_INFO_INSTAGRAM = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/info-instagram");
        };
        XAPI.prototype.GET_PRODUCT_INFO_HYPER = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/info-hyper");
        };
        XAPI.prototype.POST_SET_PRODUCT_RATING = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/set-my-rating");
        };
        //―――――――――――――――――――――― Basket > 🥵 User & 🥶 Guest ――――――――――――――――――――
        XAPI.prototype.PUT_PHYSICAL_ITEM_IN_BASKET = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/").concat(product_id);
        };
        XAPI.prototype.DELETE_PHYSICAL_ITEM_FROM_BASKET = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/").concat(product_id);
        };
        XAPI.prototype.POST_BASKET_ITEM_MESSAGE = function (shop_name, product_id) {
            // Also support PUT!
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/").concat(product_id, "/message");
        };
        XAPI.prototype.DELETE_BASKET_ITEM_FILE = function (shop_name, basket_id, file_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/files/").concat(file_id);
        };
        XAPI.prototype.PUT_BASKET_ITEM_PREFERENCES = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/").concat(product_id, "/preferences");
        };
        //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ Basket > 🥵 User & 🥶 Guest ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
        XAPI.prototype.PUT_SET_BASKET_CONFIG = function (shop_name, basket_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/config");
        };
        XAPI.prototype.GET_BASKET_BILL = function (shop_name, type) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/").concat(type, "/bill");
        };
        XAPI.prototype.POST_BUY_BASKET = function (shop_name, type, gateway) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/").concat(type, "/buy/").concat(gateway);
        };
        XAPI.prototype.POST_PAY_BILL = function (shop_name, basket_id, bill_id, gateway) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/").concat(basket_id, "/bills/").concat(bill_id, "/pay/").concat(gateway);
        };
        XAPI.prototype.POST_SUBMIT_SERVICE_BASKET = function (shop_name, type) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/").concat(type, "/submit");
        };
        XAPI.prototype.POST_SET_MY_LOCATION = function (shop_name, type) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(type, "/my-location");
        };
        XAPI.prototype.PUT_ORDER_EDIT_RECEIVER_INFO = function (shop_name, basket_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/receiver-info");
        };
        XAPI.prototype.POST_BASKET_GENERATE_SHARE_LINK = function (shop_name, basket_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/share");
        };
        XAPI.prototype.POST_BASKET_IMPORT = function (shop_name, type) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/").concat(type, "/import");
        };
        //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ Basket > 🎗️ Subscription > 🥵 User ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
        XAPI.prototype.POST_BASKET_CREATE_SUBSCRIPTION_PORTAL_URL = function (shop_name, basket_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/portal");
        };
        // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
        XAPI.prototype.GET_ORDER_BASKET_INFO = function (shop_name, basket_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id);
        };
        XAPI.prototype.GET_ORDER_POS_BASKET_INFO = function (shop_name, basket_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/pos-baskets/").concat(basket_id);
        };
        XAPI.prototype.POST_ORDER_BASKET_CONFIRM_RECEIVED = function (shop_name, basket_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/confirm-received");
        };
        XAPI.prototype.PUT_ORDER_EDIT_BILLING = function (shop_name, basket_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/billing");
        };
        XAPI.prototype.GET_MY_ORDERS_HISTORY_PHYSICAL = function (shop_name, type) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/orders-").concat(type);
        };
        XAPI.prototype.GET_MY_BASKET_ITEM_RETURNS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/basket/orders/return-requests");
        };
        XAPI.prototype.POST_BASKET_ITEM_RETURN_REQUEST = function (shop_name, basket_id, item_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/return/").concat(item_id);
        };
        XAPI.prototype.GENERATE_DOWNLOAD_PRODUCT_FILE_TEMP_URL = function (shop_name, product_id, file_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/files/").concat(file_id);
        };
        XAPI.prototype.GET_TAX_REGIONS = function (shop_name, country) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/tax/").concat(country, "/regions");
        };
        //―――――――――――――――――――――― Search ――――――――――――――――――――
        XAPI.prototype.GET_SEARCH_QUERY = function (shop_name, query) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/search/suggestion/").concat(query);
        };
        //―――――――――――――――――――――― Product inform ――――――――――――――――――――
        XAPI.prototype.PUT_TO_WAITING_FOR_BE_AVAILABLE = function (shop_id, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_id, "/products/").concat(product_id, "/waiting-be-available");
        };
        XAPI.prototype.DELETE_FROM_WAITING_FOR_BE_AVAILABLE = function (shop_id, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_id, "/products/").concat(product_id, "/waiting-be-available");
        };
        XAPI.prototype.PUT_TO_WAITING_FOR_AUCTION = function (shop_id, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_id, "/products/").concat(product_id, "/waiting-auction");
        };
        XAPI.prototype.DELETE_FROM_WAITING_FOR_AUCTION = function (shop_id, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_id, "/products/").concat(product_id, "/waiting-auction");
        };
        //―――――――――――――――――――――― Product Wish list ――――――――――――――――――――
        XAPI.prototype.PUT_WISHLIST_PRODUCT = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/wishlist");
        };
        XAPI.prototype.DELETE_WISHLIST_PRODUCT = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/wishlist");
        };
        //―――――――――――――――――――――― Comments ――――――――――――――――――――
        XAPI.prototype.GET_MY_COMMENTS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/comments");
        };
        //―――――――――――――――――――――― Gift Cards ――――――――――――――――――――
        XAPI.prototype.GET_MY_GIFT_CARDS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/giftcards");
        };
        XAPI.prototype.GET_MY_GIFT_CARDS_LIST = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/giftcards/list");
        };
        XAPI.prototype.POST_ADD_GIFT_CARDS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/giftcards");
        };
        //―――――――――――――――――――――― Discount Code ――――――――――――――――――――
        XAPI.prototype.PUT_DISCOUNT_CODE = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/discount-code");
        };
        //―――――――――――――――――――――― Shop > Blogs ――――――――――――――――――――
        XAPI.prototype.GET_SHOP_BLOGS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/blogs");
        };
        //―――――――――――――――――――――― FCM ――――――――――――――――――――
        XAPI.prototype.POST_SET_FCM_TOKEN = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/fcm/token");
        };
        //―――――――――――――――――――――― Payment ――――――――――――――――――――
        XAPI.prototype.GET_PENDING_PAYMENT_INFO = function (shop_name, gateway, transaction_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/gateways/").concat(gateway, "/").concat(transaction_id);
        };
        XAPI.prototype.GET_PAYMENT_STATUS_INTERVAL = function (shop_name, gateway, transaction_id, unique_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/gateways/").concat(gateway, "/transactions/").concat(transaction_id, "/").concat(unique_id);
        };
        XAPI.prototype.POST_SET_SHOP_APP_STATUS_BY_CUSTOMER = function (shop_name, app_code) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/apps/").concat(app_code, "/status");
        };
        //―――――――――――――――――――――― Return request ――――――――――――――――――――
        /**
         *
         * @param shop_name
         * @param basket_id
         * @param basketItem_id
         * @param type            image , video , voice
         * @returns {string}
         * @constructor
         */
        XAPI.prototype.POST_UPLOAD_RETURN_REQUEST_FILE = function (shop_name, basket_id, basketItem_id, type) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/return/").concat(basketItem_id, "/temp/upload/").concat(type);
        };
        //―――――――――――――――――――――― Contact Us ――――――――――――――――――――
        XAPI.prototype.POST_CONTACT_US_FORM = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/contact-us");
        };
        //―――――――――――――――――――――― FAQ ――――――――――――――――――――
        XAPI.prototype.GET_FAQ_TAGS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/faqs/tags");
        };
        XAPI.prototype.GET_FAQ = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/faqs");
        };
        XAPI.prototype.POST_SEND_QUESTION = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/faqs");
        };
        //―――――――――――――――――――――― Page Builder ――――――――――――――――――――
        XAPI.prototype.GET_CUSTOM_HOME_PAGE = function (shop_name, page_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/home/default?page_id=").concat(page_id);
        };
        XAPI.prototype.GET_PAGE_DATA = function (shop_name, page_name) {
            if (page_name === void 0) { page_name = ""; }
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/pages").concat(page_name ? "/" + page_name : "");
        };
        XAPI.prototype.GET_PAGE_STATISTIC = function (shop_name, page_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/pages/").concat(page_name, "/statistic");
        };
        XAPI.prototype.GET_INCLUDE_PAGE_DATA = function (shop_name, include_id) {
            if (include_id === void 0) { include_id = ""; }
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/includes/").concat(include_id);
        };
        //―――――――――――――――――――――― Stripe ――――――――――――――――――――
        XAPI.prototype.GET_CHECK_SHOP_STRIPE_PAYMENT_INTENT = function (shop_name, paymentIntent_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/gateways/stripe/").concat(paymentIntent_id, "/check");
        };
        //―――――――――――――――――――――― PayPal ――――――――――――――――――――
        XAPI.prototype.GET_PAYPAL_CLIENT_TOKEN = function (shop_name, currency) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/gateways/paypal/client-token/").concat(currency);
        };
        //―――――――――――――――――――――― Direct payment upload payment receipt ――――――――――――――――――――
        XAPI.prototype.POST_UPLOAD_DIRECT_PAYMENT_RECEIPT = function (shop_name, transaction_id, currency) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/transactions/").concat(transaction_id, "/receipt/").concat(currency);
        };
        //―――――――――――――――――――――― Address Book (Shared!) ――――――――――――――――――――
        XAPI.prototype.GET_MY_ADDRESSES = function () {
            return "".concat(this.selldone_xapi_url, "/address/all");
        };
        XAPI.prototype.DELETE_MY_ADDRESSES = function (address_id) {
            return "".concat(this.selldone_xapi_url, "/address/").concat(address_id);
        };
        XAPI.prototype.PUT_ADDRESS = function (address_id) {
            return "".concat(this.selldone_xapi_url, "/address/").concat(address_id);
        };
        XAPI.prototype.POST_ADDRESS = function () {
            return "".concat(this.selldone_xapi_url, "/address");
        };
        XAPI.prototype.GET_GEO_TO_ADDRESS = function () {
            return "".concat(this.selldone_xapi_url, "/address/gto-to-address");
        };
        XAPI.prototype.GET_AUTOCOMPLETE = function () {
            return "".concat(this.selldone_xapi_url, "/address/autocomplete");
        };
        //█████████████████████████████████████████████████████████████
        //――――――――――――――――――――――――――― Article ―――――――――――――――――――――――――
        //█████████████████████████████████████████████████████████████
        XAPI.prototype.GET_SHOP_BLOG_CATEGORIES = function (shop_id) {
            return "".concat(this.selldone_xapi_url, "/shops/").concat(shop_id, "/blog/categories");
        };
        XAPI.prototype.GET_SHOP_BLOG_DATA = function (shop_name, blog_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/blogs/").concat(blog_id);
        };
        //―――――――――――――――――――――― Link preview ――――――――――――――――――――
        XAPI.prototype.GET_LINK_PREVIEW = function () {
            return "".concat(this.selldone_xapi_url, "/iframe/preview");
        };
        //―――――――――――――――――――――― Coupons ――――――――――――――――――――
        XAPI.prototype.GET_FETCH_COUPONS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/coupons");
        };
        XAPI.prototype.GET_COUPONS_BY_CODE = function (shop_name, code) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/coupons/").concat(code);
        };
        XAPI.prototype.PUT_SET_BASKET_COUPON = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/coupon");
        };
        //―――――――――――――――――――――― Offers ――――――――――――――――――――
        XAPI.prototype.GET_FETCH_OFFERS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/offers");
        };
        //―――――――――――――――――――――― Lotteries ――――――――――――――――――――
        XAPI.prototype.GET_FETCH_LOTTERIES = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/lottery");
        };
        XAPI.prototype.POST_FETCH_LOTTERIES = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/lottery/play");
        };
        XAPI.prototype.GET_FETCH_LOTTERY_WINS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/lottery/wins");
        };
        XAPI.prototype.PUT_SET_BASKET_LOTTERY = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/lottery");
        };
        //―――――――――――――――――――――― User Selected Currency ――――――――――――――――――――
        XAPI.prototype.PUT_SET_USER_CURRENCY = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/currency");
        };
        //―――――――――――――――――――――― Shop > Contact Us ――――――――――――――――――――
        XAPI.prototype.GET_SHOP_TICKETS_LIST = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/contacts");
        };
        XAPI.prototype.PUT_SHOP_TICKET_UPDATE_MESSAGE = function (shop_name, contact_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/contacts/").concat(contact_id);
        };
        XAPI.prototype.DELETE_SHOP_TICKET_MESSAGE_RESPONSE = function (shop_name, contact_id, index) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/contacts/").concat(contact_id, "/").concat(index);
        };
        XAPI.prototype.POST_SHOP_TICKET_CLOSE = function (shop_name, contact_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/contacts/").concat(contact_id, "/close");
        };
        XAPI.prototype.PUT_SHOP_TICKET_RATE = function (shop_name, contact_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/contacts/").concat(contact_id, "/rate");
        };
        //―――――――――――――――――――――― Instagram ――――――――――――――――――――
        XAPI.prototype.GET_INSTAGRAM_DATA = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/channels/instagram");
        };
        //―――――――――――――――――――――― Avocado ――――――――――――――――――――
        XAPI.prototype.GET_CUSTOMER_OPEN_AVOCADO = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/avocado");
        };
        XAPI.prototype.GET_CUSTOMER_HISTORY_AVOCADOS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/avocados");
        };
        XAPI.prototype.POST_ADD_OPEN_AVOCADO_ITEM = function (shop_name, hash) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/avocado/").concat(hash, "/items");
        };
        XAPI.prototype.DELETE_OPEN_AVOCADO_ITEM = function (shop_name, hash, item_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/avocado/").concat(hash, "/items/").concat(item_id);
        };
        XAPI.prototype.POST_RESERVE_AVOCADO = function (shop_name, hash) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/avocado/").concat(hash, "/reserve");
        };
        XAPI.prototype.GET_CUSTOMER_INFO_FOR_AVOCADO = function (shop_name, hash) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/avocado/").concat(hash);
        };
        XAPI.prototype.PUT_SET_CUSTOMER_INFO_FOR_AVOCADO = function (shop_name, hash) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/avocado/").concat(hash);
        };
        XAPI.prototype.POST_PAY_AVOCADO = function (shop_name, hash, gateway) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/avocado/").concat(hash, "/pay/").concat(gateway);
        };
        XAPI.prototype.GET_ORDER_AVOCADO_BASKET_INFO = function (shop_name, avocado_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/avo-baskets/").concat(avocado_id);
        };
        //―――――――――――――――――――――― Avocado ――――――――――――――――――――
        XAPI.prototype.GET_CUSTOMER_OPEN_HYPER = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/hyper");
        };
        XAPI.prototype.POST_ADD_OPEN_HYPER_ITEM = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/hyper/items");
        };
        XAPI.prototype.GET_CUSTOMER_HISTORY_HYPERS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/hypers");
        };
        XAPI.prototype.POST_PAY_HYPER = function (shop_name, gateway) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/hyper/pay/").concat(gateway);
        };
        XAPI.prototype.DELETE_OPEN_HYPER_ITEM = function (shop_name, item_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/hyper/items/").concat(item_id);
        };
        XAPI.prototype.GET_CUSTOMER_INFO_FOR_HYPER = function (shop_name, hyper_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/hyper/").concat(hyper_id);
        };
        //█████████████████████████████████████████████████████████████
        //―――――――――――――――――――――― Check Payments & Verify ―――――――――――――――――――――
        //█████████████████████████████████████████████████████████████
        // ―――――――――― PayPal Standard ――――――――――
        XAPI.prototype.POST_PAYMENTS_PAYPAL_STANDARD_VERIFY = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/paypal-standard/@").concat(shop_name, "/verify");
        };
        //█████████████████████████████████████████████████████████████
        //――――――――――――――――――――――――――― Article ―――――――――――――――――――――――――
        //█████████████████████████████████████████████████████████████
        //―――――――――――――――――――――― SEO ――――――――――――――――――――
        XAPI.prototype.GET_ARTICLE_SEO_AUDIT = function (shop_id, article_id) {
            return "".concat(this.selldone_xapi_url, "/shops/").concat(shop_id, "/seo-audit/articles/").concat(article_id);
        };
        //―――――――――――――――――――――― Import word file ――――――――――――――――――――
        XAPI.prototype.POST_SHOP_CONVERTER_WORD_HTML = function (shop_id) {
            return "".concat(this.selldone_xapi_url, "/shops/").concat(shop_id, "/converter/word/html");
        };
        //―――――――――――――――――――――― Translate ――――――――――――――――――――
        XAPI.prototype.POST_TRANSLATE_PRODUCT_ARTICLE = function (shop_id, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/").concat(shop_id, "/products/").concat(product_id, "/translate-article");
        };
        //―――――――――――――――――――――― User Feedback ――――――――――――――――――――
        XAPI.prototype.POST_LIKE_ARTICLE = function (article_id) {
            return "".concat(this.selldone_xapi_url, "/articles/").concat(article_id, "/like");
        };
        XAPI.prototype.POST_STAR_ARTICLE = function (article_id) {
            return "".concat(this.selldone_xapi_url, "/articles/").concat(article_id, "/star");
        };
        XAPI.prototype.POST_CLAPS_OF_ARTICLE = function (article_id) {
            return "".concat(this.selldone_xapi_url, "/articles/").concat(article_id, "/claps");
        };
        XAPI.prototype.POST_REPORT_ARTICLE = function (article_id, report) {
            return "".concat(this.selldone_xapi_url, "/articles/").concat(article_id, "/report/").concat(report);
        };
        //―――――――――――――――――――――― Timeline ――――――――――――――――――――
        XAPI.prototype.GET_SHOP_ARTICLES_TIMELINE = function (shop_id) {
            return "".concat(this.selldone_xapi_url, "/shops/").concat(shop_id, "/timeline/articles");
        };
        //―――――――――――――――――――――― Edit ――――――――――――――――――――
        XAPI.prototype.POST_ADD_EDIT_ARTICLE = function (type) {
            return "".concat(this.selldone_xapi_url, "/article/").concat(type, "/edit");
        };
        //―――――――――――――――――――――― Upload ――――――――――――――――――――
        /**
         * Upload article image.
         * @param type
         * @param extra         shop ID
         * @returns {string}
         */
        XAPI.prototype.UPLOAD_ARTICLE_IMAGE = function (type, extra) {
            if (extra === void 0) { extra = null; }
            if (!extra)
                return "".concat(this.selldone_xapi_url, "/article/").concat(type, "/upload");
            return "".concat(this.selldone_xapi_url, "/article/").concat(type, "/upload/").concat(extra);
        };
        XAPI.prototype.UPLOAD_ARTICLE_BLOG_IMAGE = function (shop_id) {
            return "".concat(this.selldone_xapi_url, "/shops/").concat(shop_id, "/blogs/upload");
        };
        //―――――――――――――――――――――― Delete ――――――――――――――――――――
        XAPI.prototype.DELETE_ARTICLE = function (type, article_id) {
            return "".concat(this.selldone_xapi_url, "/article/").concat(type, "/").concat(article_id);
        };
        //―――――――――――――――――――――― Tags ――――――――――――――――――――
        XAPI.prototype.GET_SHOP_ARTICLE_TAGS = function (shop_id) {
            return "".concat(this.selldone_xapi_url, "/shops/").concat(shop_id, "/articles/tags");
        };
        XAPI.prototype.PUT_CHANGE_TAG = function (shop_id) {
            return "".concat(this.selldone_xapi_url, "/shops/").concat(shop_id, "/articles/tags");
        };
        XAPI.prototype.POST_SET_SHOP_ARTICLE_TAGS = function (shop_id, article_id) {
            return "".concat(this.selldone_xapi_url, "/shops/").concat(shop_id, "/articles/tags/").concat(article_id);
        };
        //―――――――――――――――――――――― Comments ――――――――――――――――――――
        XAPI.prototype.POST_ADD_COMMENT = function (article_id) {
            return "".concat(this.selldone_xapi_url, "/article/").concat(article_id, "/comment");
        };
        XAPI.prototype.PUT_UPDATE_COMMENT = function (comment_id) {
            return "".concat(this.selldone_xapi_url, "/comment/").concat(comment_id);
        };
        XAPI.prototype.DELETE_COMMENT = function (comment_id) {
            return "".concat(this.selldone_xapi_url, "/comment/").concat(comment_id);
        };
        //―――――――――――――――――――――― Follow ――――――――――――――――――――
        XAPI.prototype.POST_FOLLOW_USER = function (user_id) {
            return "".concat(this.selldone_xapi_url, "/user/follow/").concat(user_id);
        };
        XAPI.prototype.POST_CUSTOMER_BASKET_CHAT_ADD_MESSAGE = function (shop_name, basket_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/chat");
        };
        XAPI.prototype.DELETE_CUSTOMER_BASKET_CHAT_MESSAGE = function (shop_name, basket_id, message_index) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/baskets/").concat(basket_id, "/chat/").concat(message_index);
        };
        //―――――――――――――――――――――― Vendors ――――――――――――――――――――
        XAPI.prototype.GET_VENDORS = function (shop_name) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/vendors");
        };
        XAPI.prototype.GET_VENDOR_INFO = function (shop_name, vendor_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/vendors/").concat(vendor_id);
        };
        //―――――――――――――――――――――― 🎗️ Subscription ――――――――――――――――――――
        XAPI.prototype.POST_SUBSCRIBE_NOW = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/subscribe");
        };
        XAPI.prototype.GET_PRODUCT_MEMBERSHIP_CONTENTS = function (shop_name, product_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/contents");
        };
        XAPI.prototype.POST_PRODUCT_MEMBERSHIP_CONTENTS_SEND_MY_RATING = function (shop_name, product_id, content_id) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/products/").concat(product_id, "/contents/").concat(content_id, "/rate");
        };
        //―――――――――――――――――――――― Stream Users (Public Form) ――――――――――――――――――――
        /**
         *
         * @param domain      we need to force xapi.selldone.com ... because of It's just for showing to user in dashboard!
         * @param shop_id
         * @param key
         * @returns {string}
         * @constructor
         */
        XAPI.prototype.POST_STREAM_USER_ADD = function (domain, shop_id, key) {
            return "".concat(domain, "/shops/").concat(shop_id, "/audience/").concat(key);
        };
        XAPI.prototype.POST_STREAM_USER_ADD_NEWSLETTER = function (shop_id, key) {
            if (key === void 0) { key = "newsletter"; }
            return "".concat(this.selldone_xapi_url, "/shops/").concat(shop_id, "/audience/").concat(key);
        };
        //―――――――――――――――――――――― Language (Override packs)  ――――――――――――――――――――
        XAPI.prototype.GET_SHOP_LANGUAGE_PACK = function (shop_name, language) {
            return "".concat(this.selldone_xapi_url, "/shops/@").concat(shop_name, "/languages/").concat(language);
        };
        return XAPI;
    }());
    exports.XAPI = XAPI;
});
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
define("shop/exchange-rates/requests/xapi.exchange-rates.get", ["require", "exports", "../selldone-vue-core/helper/local-storage/StorefrontLocalStorages"], function (require, exports, StorefrontLocalStorages_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function fetchRates(onSuccess, onError) {
        var params = {
            codes: StorefrontLocalStorages_2.StorefrontLocalStorages.GetShopHistoryGuestAllCodes(),
            guest_code: StorefrontLocalStorages_2.StorefrontLocalStorages.GetShopGuestCode(),
        };
        var url = window.XAPI.GET_EXCHANGE_RATES(this.shop_name);
        this.getDebounce(url, params, onSuccess, onError, {
            debounce_time: 2000,
        });
    }
    exports.default = fetchRates;
});
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
define("shop/exchange-rates/XapiExchangeRate", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "shop/exchange-rates/requests/xapi.exchange-rates.get"], function (require, exports, tslib_2, APIAbstract_2, xapi_exchange_rates_get_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiExchangeRate = void 0;
    xapi_exchange_rates_get_1 = tslib_2.__importDefault(xapi_exchange_rates_get_1);
    var XapiExchangeRate = /** @class */ (function (_super) {
        tslib_2.__extends(XapiExchangeRate, _super);
        function XapiExchangeRate(shop_name) {
            var _this = _super.call(this) || this;
            _this.fetchRates = xapi_exchange_rates_get_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiExchangeRate;
    }(APIAbstract_2.APIAbstract));
    exports.XapiExchangeRate = XapiExchangeRate;
});
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
define("shop/language/requests/xapi.language.get", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function fetchLanguagePack(local) {
        var url = window.XAPI.GET_SHOP_LANGUAGE_PACK(this.shop_name, local);
        return this.getNow(url);
    }
    exports.default = fetchLanguagePack;
});
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
define("shop/language/XapiLanguage", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "shop/language/requests/xapi.language.get"], function (require, exports, tslib_3, APIAbstract_3, xapi_language_get_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiLanguage = void 0;
    xapi_language_get_1 = tslib_3.__importDefault(xapi_language_get_1);
    var XapiLanguage = /** @class */ (function (_super) {
        tslib_3.__extends(XapiLanguage, _super);
        function XapiLanguage(shop_name) {
            var _this = _super.call(this) || this;
            _this.fetchLanguagePack = xapi_language_get_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiLanguage;
    }(APIAbstract_3.APIAbstract));
    exports.XapiLanguage = XapiLanguage;
});
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
define("shop/XapiShop", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "shop/exchange-rates/XapiExchangeRate", "../selldone-vue-core/helper/local-storage/StorefrontLocalStorages", "shop/language/XapiLanguage"], function (require, exports, tslib_4, APIAbstract_4, XapiExchangeRate_1, StorefrontLocalStorages_3, XapiLanguage_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiShop = void 0;
    /**
     * The `XapiShop` class provides an interface to interact with the shop-related
     * services on the backend, particularly around retrieving shop information.
     * It extends the base `APIAbstract` class.
     *
     * @extends APIAbstract
     */
    var XapiShop = /** @class */ (function (_super) {
        tslib_4.__extends(XapiShop, _super);
        /**
         * Creates an instance of the `XapiShop`.
         *
         * @param shop_name - Name of the shop.
         */
        function XapiShop(shop_name) {
            var _this = _super.call(this) || this;
            _this.shop_name = shop_name;
            _this.exchange = new XapiExchangeRate_1.XapiExchangeRate(shop_name);
            _this.language = new XapiLanguage_1.XapiLanguage(shop_name);
            return _this;
        }
        /**
         * Fetches information about a shop.
         *
         * @returns Promise that resolves with shop information.
         */
        XapiShop.prototype.fetchShop = function () {
            var url = window.XAPI.GET_SHOP_INFO(this.shop_name);
            // @ts-ignore
            var guest_codes = StorefrontLocalStorages_3.StorefrontLocalStorages.GetShopHistoryGuestAllCodes().limit(10); // We use it to get pending transactions!
            var params = { guest_codes: guest_codes };
            return this.getNow(url, params);
        };
        return XapiShop;
    }(APIAbstract_4.APIAbstract));
    exports.XapiShop = XapiShop;
});
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
define("auth/XapiAuthSMS", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "auth/XapiAuth"], function (require, exports, tslib_5, APIAbstract_5, XapiAuth_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SuccessVerifyMethod = exports.XapiAuthSMS = void 0;
    var XapiAuthSMS = /** @class */ (function (_super) {
        tslib_5.__extends(XapiAuthSMS, _super);
        function XapiAuthSMS(shop_name) {
            var _this = _super.call(this) || this;
            _this.shop_name = shop_name;
            return _this;
        }
        /**
         * Requests an OTP (One-Time Password) for phone-based authentication.
         *
         * This method sends a request to the specified endpoint to generate and send an OTP
         * to the user's phone. It's typically used in two-factor authentication or phone number
         * verification processes.
         *
         * @param {string | number} dial_code - The dial code of the country/region (e.g., +1 for the US).
         * @param {string} country_code - The ISO code of the country (e.g., 'US' for the United States).
         * @param {string | number} phone - The phone number to which the OTP should be sent.
         *
         * @returns {Promise<ISMSRequestOTPServerResponse>} - Returns a promise that resolves with the
         *                                                    server's response to the OTP request.
         *
         * @example
         *
         * requestOTP('+1', 'US', '1234567890')
         *   .then(response => console.log(response))
         *   .catch(error => console.error(error));
         *
         */
        XapiAuthSMS.prototype.requestOTP = function (dial_code, country_code, phone) {
            var params = {
                dial_code: dial_code,
                country_code: country_code,
                phone: phone,
            };
            var url = window.XAPI.SHOP_LOGIN_REQUEST(this.shop_name);
            return this.postNow(url, params);
        };
        /**
         * Verifies the OTP (One-Time Password) received by the user.
         *
         * This method sends the user's OTP to the specified endpoint for verification. It's typically
         * used to confirm the user's phone number in processes like two-factor authentication or
         * phone number verification.
         *
         * @param {string | number} dial_code - The dial code of the country/region (e.g., +1 for the US).
         * @param {string} country_code - The ISO code of the country (e.g., 'US' for the United States).
         * @param {string | number} phone - The phone number for which the OTP was requested.
         * @param {string | number} verification_code - The OTP received by the user.
         * @param {LoginSource} source - The origin of the OTP request, either 'customer' or 'vendor'.
         *
         * @returns {Promise<ISMSVerifyOTPServerResponse>} - Returns a promise that resolves with the
         *                                                    server's response to the OTP verification.
         *
         * @example
         *
         * verifyOTP('+1', 'US', '1234567890', '123456', LoginSource.CUSTOMER)
         *   .then(response => console.log(response))
         *   .catch(error => console.error(error));
         *
         */
        XapiAuthSMS.prototype.verifyOTP = function (dial_code, country_code, phone, verification_code, source) {
            var params = {
                dial_code: dial_code,
                country_code: country_code,
                phone: phone,
                verification_code: verification_code,
                source: source ? source : XapiAuth_1.XapiAuth.LoginSource.CUSTOMER,
            };
            var url = window.XAPI.SHOP_LOGIN_VERIFY(this.shop_name);
            return this.postNow(url, params);
        };
        /**
         * Initiates the user selection process based on the provided code and source.
         *
         * @param code - The unique code associated with the user. This can be a string or number.
         * @param source - The source from which the login is initiated (e.g., customer, vendor, etc.),
         *                 represented by the LoginSource enumeration.
         *
         * @returns A Promise that resolves to an `ISMSVerifyOTPServerResponse_Login` object which contains
         *          information about the login process. This object can include the method of verification
         *          (specifically, `SuccessVerifyMethod.LOGIN`), an optional token, and the expiration time
         *          for that token.
         *
         * @example
         * selectUser("1234", LoginSource.CUSTOMER)
         *   .then(response => {
         *     console.log(response.token);
         *   })
         *   .catch(error => {
         *     console.error("Failed to select user:", error);
         *   });
         *
         */
        XapiAuthSMS.prototype.selectUser = function (code, source) {
            var params = {
                code: code,
                source: source ? source : XapiAuth_1.XapiAuth.LoginSource.CUSTOMER,
            };
            var url = window.XAPI.SHOP_LOGIN_SELECT_USER(this.shop_name);
            return this.postNow(url, params);
        };
        /**
         * Registers a new user based on the provided details.
         *
         * @param code - The unique verification code associated with the user, which can be a string or number.
         * @param name - The name of the user to be registered.
         * @param email - The email address of the user. This can be `null` if no email is provided or applicable.
         * @param password - The password for the user. This can be `null` if no password is chosen or required.
         * @param no_email_mode - A boolean flag indicating whether the user registration should operate in
         *                        a mode that doesn't require an email. If `true`, email becomes optional.
         * @param source - The source from which the registration is initiated, represented by the
         *                 LoginSource enumeration.
         *
         * @returns A Promise that resolves to an `ISMSVerifyOTPServerResponse_Login` object which contains
         *          information about the registration and potential login process. This object will include
         *          the method of verification (specifically, `SuccessVerifyMethod.LOGIN`), an optional token,
         *          and the expiration time for that token.
         *
         * @example
         * registerUser("1234", "John Doe", "john@example.com", "securePass123", false, LoginSource.CUSTOMER)
         *   .then(response => {
         *     console.log(response.token);
         *   })
         *   .catch(error => {
         *     console.error("Failed to register user:", error);
         *   });
         *
         * @throws Will throw an error if the request fails or if the server responds with an error status.
         */
        XapiAuthSMS.prototype.registerUser = function (code, name, email, password, no_email_mode, source) {
            var params = {
                code: code,
                name: name,
                email: email,
                password: password,
                no_email_mode: no_email_mode,
                source: source ? source : XapiAuth_1.XapiAuth.LoginSource.CUSTOMER,
            };
            var url = window.XAPI.SHOP_LOGIN_NEW_USER(this.shop_name);
            return this.postNow(url, params);
        };
        return XapiAuthSMS;
    }(APIAbstract_5.APIAbstract));
    exports.XapiAuthSMS = XapiAuthSMS;
    /**
     * Enum representing the possible methods of OTP (One-Time Password) verification success.
     *
     * The methods include:
     * - `REGISTER`: A new user has been registered. The next step typically requires the user to enter their email.
     * - `SELECT`: There are multiple users with the same phone number, and the user needs to select one.
     * - `LOGIN`: The user is authenticated, and an access token is returned.
     *
     */
    var SuccessVerifyMethod;
    (function (SuccessVerifyMethod) {
        SuccessVerifyMethod["REGISTER"] = "register";
        SuccessVerifyMethod["SELECT"] = "select";
        SuccessVerifyMethod["LOGIN"] = "login";
    })(SuccessVerifyMethod || (exports.SuccessVerifyMethod = SuccessVerifyMethod = {}));
});
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
define("auth/XapiAuth", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "auth/XapiAuthSMS"], function (require, exports, tslib_6, APIAbstract_6, XapiAuthSMS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiAuth = void 0;
    var XapiAuth = /** @class */ (function (_super) {
        tslib_6.__extends(XapiAuth, _super);
        function XapiAuth(shop_name) {
            var _this = _super.call(this) || this;
            _this.shop_name = shop_name;
            _this.sms = new XapiAuthSMS_1.XapiAuthSMS(_this.shop_name);
            return _this;
        }
        XapiAuth.prototype.logout = function () {
            var url = window.XAPI.LOGOUT(this.shop_name);
            return this.postNow(url, null);
        };
        return XapiAuth;
    }(APIAbstract_6.APIAbstract));
    exports.XapiAuth = XapiAuth;
    (function (XapiAuth) {
        var LoginSource;
        (function (LoginSource) {
            LoginSource["CUSTOMER"] = "customer";
            LoginSource["VENDOR"] = "vendor";
        })(LoginSource = XapiAuth.LoginSource || (XapiAuth.LoginSource = {}));
    })(XapiAuth || (exports.XapiAuth = XapiAuth = {}));
});
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
define("plugins/axios/StorefrontAxiosSetup", ["require", "exports", "../selldone-vue-core/server/SetupService", "../selldone-vue-core/helper/local-storage/StorefrontLocalStorages"], function (require, exports, SetupService_2, StorefrontLocalStorages_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StorefrontAxiosSetup = void 0;
    function StorefrontAxiosSetup() {
        var shop_name = SetupService_2.SetupService.GetMetaValue("shop-name");
        var shop_prefix_address = SetupService_2.SetupService.GetMetaValue("shop-prefix-address", "");
        window.axios = require("axios");
        // 🞧 Header: CORS
        window.axios.defaults.headers.common["Access-Control-Allow-Origin"] =
            SetupService_2.SetupService.MainServiceUrl();
        window.axios.defaults.headers.common["Access-Control-Allow-Headers"] =
            "Origin, X-Requested-With, Content-Type, Accept";
        if (window.SelldoneUser) {
            console.log(window.SelldoneUser.expires_in);
            // 🞧 Header: Authorization
            window.axios.defaults.headers.common["Authorization"] =
                "Bearer " + window.SelldoneUser.access_token;
            var expire_date = new Date();
            expire_date.setUTCSeconds(window.SelldoneUser.expires_in);
            window.$cookies.set("access_token", window.SelldoneUser.access_token, expire_date.toUTCString(), shop_prefix_address, null, false);
        }
        else {
            var access_token = window.$cookies.get("access_token");
            if (access_token) {
                // User previously login
                // 🞧 Header: Authorization
                window.axios.defaults.headers.common["Authorization"] =
                    "Bearer " + access_token;
            }
        }
        // Set CSRF token:
        var token = SetupService_2.SetupService.GetMetaValue("csrf-token");
        if (token) {
            // 🞧 Header: CSRF
            window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
        }
        else {
            console.warn("CSRF token not found!");
        }
        // 🞧 Header: Previous and current location (when app open)
        window.axios.defaults.headers.common["S-Referrer"] =
            SetupService_2.SetupService.GetReferrerMeta();
        window.axios.defaults.headers.common["S-Location"] = window.location.href;
        // 🞧 Get temporary access key. (Used in show inactive shops to admins)
        window.axios.defaults.headers.common["S-Temp-Access"] =
            SetupService_2.SetupService.GetTemporaryAccessKey();
        // 🞧 Popup: We save seen_pops in localstorage (Client) and send in the header request
        var seen_pops = localStorage.getItem(StorefrontLocalStorages_4.StorefrontLocalStorages.GetSeenPopups("shop/@".concat(shop_name, "/")));
        if (seen_pops) {
            window.axios.defaults.headers.common["S-Pops"] = seen_pops;
        }
        // ━━━ Headers ━━━
        // Setting campaign, marketing, affiliate, and guest data in headers.
        //――――――――――――――――――――――――― Set Campaign data in header ―――――――――――――――――――――――――
        // Can be secure signed id!
        if (SetupService_2.SetupService.GetCampaignId()) {
            // 🞧 Header: Campaign
            window.axios.defaults.headers.common["campaign_id"] =
                SetupService_2.SetupService.GetCampaignId();
        }
        if (SetupService_2.SetupService.GetCampaignLinkId()) {
            // 🞧 Header: Campaign link
            window.axios.defaults.headers.common["link_id"] =
                SetupService_2.SetupService.GetCampaignLinkId();
        }
        //――――――――――――――――――――――――― Set Email Marketing data in header ―――――――――――――――――――――――――
        if (SetupService_2.SetupService.GetEmailId()) {
            // 🞧 Header: Email campaign
            window.axios.defaults.headers.common["email_id"] =
                SetupService_2.SetupService.GetEmailId();
        }
        //――――――――――――――――――――――――― Set Affiliate data in header ―――――――――――――――――――――――――
        if (SetupService_2.SetupService.GetAffiliateId()) {
            // 🞧 Header: Affiliate
            window.axios.defaults.headers.common["affiliate_id"] =
                SetupService_2.SetupService.GetAffiliateId();
        }
        //――――――――――――――――――――――――― Set Guest Code in header ―――――――――――――――――――――――――
        // ▀▀▀▀▀▀▀▀▀ 🥶 Guest ▀▀▀▀▀▀▀▀▀
        // Set guest code (use for guest basket)
        if (StorefrontLocalStorages_4.StorefrontLocalStorages.GetShopGuestCode()) {
            // 🞧 Header: Add guest code to all headers:
            window.axios.defaults.headers.common["S-Guest"] =
                StorefrontLocalStorages_4.StorefrontLocalStorages.GetShopGuestCode();
        }
    }
    exports.StorefrontAxiosSetup = StorefrontAxiosSetup;
});
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
define("product/requests/xapi.products.get", ["require", "exports", "tslib"], function (require, exports, tslib_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function fetchProducts(dir, offset, limit, options) {
        if (dir === void 0) { dir = null; }
        if (offset === void 0) { offset = 0; }
        if (limit === void 0) { limit = 10; }
        var url = window.XAPI.GET_PRODUCTS(this.shop_name);
        return this.getNow(url, tslib_7.__assign({ dir: dir, offset: offset, limit: limit }, options));
    }
    exports.default = fetchProducts;
});
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
define("product/requests/xapi.product.get", ["require", "exports", "tslib"], function (require, exports, tslib_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Language of returned article determine by 'X-Localization' in the header.
     *
     * @param product_id
     * @param options
     */
    function getInfo(product_id, options) {
        product_id = parseInt("" + product_id);
        var url = window.XAPI.GET_PRODUCT_INFO(this.shop_name, product_id);
        return this.getNow(url, options, function (caches) {
            var e_1, _a;
            // Find product in previously fetched products list:
            var foundProduct = null;
            try {
                for (var _b = tslib_8.__values(caches.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = tslib_8.__read(_c.value, 2), cacheKey = _d[0], cacheValue = _d[1];
                    var products = (cacheValue === null || cacheValue === void 0 ? void 0 : cacheValue.products) || null || undefined;
                    if (Array.isArray(products)) {
                        var found = products.find(function (p) { return p.id === product_id; });
                        if (found) {
                            // console.log('WE FIND!', product_id, found);
                            foundProduct = found;
                            break; // Exit the loop once the product is found
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (foundProduct)
                return { product: foundProduct };
        });
    }
    exports.default = getInfo;
});
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
define("product/rate/requests/xapi.product.rate.submit.post", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Set rate for purchased product.
     *
     * @param product_id
     * @param user_rating
     */
    function submitMyRate(product_id, user_rating) {
        var url = window.XAPI.POST_SET_PRODUCT_RATING(this.shop_name, product_id);
        var params = { user_rating: user_rating };
        return this.postNow(url, params);
    }
    exports.default = submitMyRate;
});
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
define("product/rate/XapiProductRate", ["require", "exports", "tslib", "product/rate/requests/xapi.product.rate.submit.post", "../selldone-vue-core/server/APIAbstract"], function (require, exports, tslib_9, xapi_product_rate_submit_post_1, APIAbstract_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiProductRate = void 0;
    xapi_product_rate_submit_post_1 = tslib_9.__importDefault(xapi_product_rate_submit_post_1);
    var XapiProductRate = /** @class */ (function (_super) {
        tslib_9.__extends(XapiProductRate, _super);
        function XapiProductRate(shop_name) {
            var _this = _super.call(this) || this;
            _this.submitMyRate = xapi_product_rate_submit_post_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiProductRate;
    }(APIAbstract_7.APIAbstract));
    exports.XapiProductRate = XapiProductRate;
});
//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████
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
define("product/subscription/requests/xapi.product.subscription.contents.get", ["require", "exports", "tslib"], function (require, exports, tslib_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getContents(product_id, offset, limit, options) {
        var url = window.XAPI.GET_PRODUCT_MEMBERSHIP_CONTENTS(this.shop_name, product_id);
        var params = tslib_10.__assign({ offset: offset, limit: limit }, options);
        return this.getNow(url, params);
    }
    exports.default = getContents;
});
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
define("product/subscription/XapiProductSubscription", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "product/subscription/requests/xapi.product.subscription.contents.get"], function (require, exports, tslib_11, APIAbstract_8, xapi_product_subscription_contents_get_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiProductSubscription = void 0;
    xapi_product_subscription_contents_get_1 = tslib_11.__importDefault(xapi_product_subscription_contents_get_1);
    var XapiProductSubscription = /** @class */ (function (_super) {
        tslib_11.__extends(XapiProductSubscription, _super);
        function XapiProductSubscription(shop_name) {
            var _this = _super.call(this) || this;
            _this.getContents = xapi_product_subscription_contents_get_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiProductSubscription;
    }(APIAbstract_8.APIAbstract));
    exports.XapiProductSubscription = XapiProductSubscription;
});
//█████████████████████████████████████████████████████████████
//―――――――――――――――― 🦫 Types ――――――――――――――――
//█████████████████████████████████████████████████████████████
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
define("product/XapiProduct", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "product/requests/xapi.products.get", "product/requests/xapi.product.get", "product/rate/XapiProductRate", "product/subscription/XapiProductSubscription"], function (require, exports, tslib_12, APIAbstract_9, xapi_products_get_1, xapi_product_get_1, XapiProductRate_1, XapiProductSubscription_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiProduct = void 0;
    xapi_products_get_1 = tslib_12.__importDefault(xapi_products_get_1);
    xapi_product_get_1 = tslib_12.__importDefault(xapi_product_get_1);
    var XapiProduct = /** @class */ (function (_super) {
        tslib_12.__extends(XapiProduct, _super);
        function XapiProduct(shop_name) {
            var _this = _super.call(this) || this;
            _this.fetchProducts = xapi_products_get_1.default;
            _this.getInfo = xapi_product_get_1.default;
            _this.shop_name = shop_name;
            _this.rate = new XapiProductRate_1.XapiProductRate(shop_name);
            _this.subscription = new XapiProductSubscription_1.XapiProductSubscription(shop_name);
            return _this;
        }
        return XapiProduct;
    }(APIAbstract_9.APIAbstract));
    exports.XapiProduct = XapiProduct;
});
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
define("lottery/requests/xapi.lottery.get", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Fetches the lottery prizes that the current customer has won.
     * Allows customers to browse through their won prizes and opt to redeem one during an order placement.
     *
     * @param {xapi.lottery.get.IOptions} [options] - Options to customize the retrieval, such as limiting the number of results.
     * @returns {Promise<xapi.lottery.get.IResponse>} The prizes won by the customer.
     */
    function fetchLotteryPrizes(options) {
        var params = {
            limit: (options === null || options === void 0 ? void 0 : options.limit) ? options.limit : 10,
        };
        var url = window.XAPI.GET_FETCH_LOTTERY_WINS(this.shop_name);
        return this.getNow(url, params);
    }
    exports.default = fetchLotteryPrizes;
});
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
define("lottery/XapiLottery", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "lottery/requests/xapi.lottery.get"], function (require, exports, tslib_13, APIAbstract_10, xapi_lottery_get_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiLottery = void 0;
    xapi_lottery_get_1 = tslib_13.__importDefault(xapi_lottery_get_1);
    var XapiLottery = /** @class */ (function (_super) {
        tslib_13.__extends(XapiLottery, _super);
        function XapiLottery(shop_name) {
            var _this = _super.call(this) || this;
            _this.fetchLotteryPrizes = xapi_lottery_get_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiLottery;
    }(APIAbstract_10.APIAbstract));
    exports.XapiLottery = XapiLottery;
});
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
define("database/localstorage/coupon.database", ["require", "exports", "../selldone-vue-core/helper/local-storage/StorefrontLocalStorages"], function (require, exports, StorefrontLocalStorages_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CouponDatabase = void 0;
    var CouponDatabase = /** @class */ (function () {
        function CouponDatabase(shop_name) {
            this.shop_name = shop_name;
        }
        CouponDatabase.prototype.getCouponCodes = function () {
            var raw = localStorage.getItem(StorefrontLocalStorages_5.StorefrontLocalStorages.GetShopCouponsCodes(window.$storefront.local_storage_path));
            if (raw)
                try {
                    var arr = JSON.parse(raw);
                    if (arr && Array.isArray(arr))
                        return arr;
                }
                catch (e) {
                    console.error(e);
                }
            return [];
        };
        CouponDatabase.prototype.addCouponCode = function (code) {
            var codes = window.$storefront.database.coupon.getCouponCodes();
            if (!codes.includes(code))
                codes.push(code);
            localStorage.setItem(StorefrontLocalStorages_5.StorefrontLocalStorages.GetShopCouponsCodes(window.$storefront.local_storage_path), JSON.stringify(codes));
        };
        CouponDatabase.prototype.removeCouponCode = function (code) {
            var codes = window.$storefront.database.coupon.getCouponCodes();
            if (codes.includes(code))
                codes.splice(codes.indexOf(code), 1);
            localStorage.setItem(StorefrontLocalStorages_5.StorefrontLocalStorages.GetShopCouponsCodes(window.$storefront.local_storage_path), JSON.stringify(codes));
        };
        return CouponDatabase;
    }());
    exports.CouponDatabase = CouponDatabase;
});
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
define("database/localstorage/currency.database", ["require", "exports", "../selldone-vue-core/helper/local-storage/StorefrontLocalStorages", "../selldone-vue-core/enums/payment/Currency", "../selldone-vue-core/server/SetupService", "../selldone-vue-core/enums/gtag/TrackConfig"], function (require, exports, StorefrontLocalStorages_6, Currency_1, SetupService_3, TrackConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CurrencyDatabase = void 0;
    var CurrencyDatabase = /** @class */ (function () {
        function CurrencyDatabase(shop_name) {
            this.shop_name = shop_name;
        }
        CurrencyDatabase.prototype.getCurrency = function () {
            var _base_path = "shop/@".concat(this.shop_name, "/");
            // Try to read from local storage:
            var user_currency = localStorage.getItem(StorefrontLocalStorages_6.StorefrontLocalStorages.GetUserCurrencyPath(_base_path));
            if (user_currency && Currency_1.Currency[user_currency]) {
                return Currency_1.Currency[user_currency];
            }
            // Get from meta header (set by server side)
            var _default_code = SetupService_3.SetupService.DefaultCurrency();
            if (!_default_code)
                return Currency_1.Currency.USD;
            return Currency_1.Currency[_default_code];
        };
        CurrencyDatabase.prototype.saveCurrency = function (currency) {
            var currencyCode;
            if (typeof currency === "string") {
                currencyCode = currency;
            }
            else {
                currencyCode = currency.code;
            }
            var _base_path = "shop/@".concat(this.shop_name, "/");
            localStorage.setItem(
            // @ts-ignore
            StorefrontLocalStorages_6.StorefrontLocalStorages.GetUserCurrencyPath(_base_path), currencyCode);
            TrackConfig_1.TrackConfig.SetCurrency(currencyCode);
        };
        return CurrencyDatabase;
    }());
    exports.CurrencyDatabase = CurrencyDatabase;
});
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
define("database/localstorage/language.database", ["require", "exports", "../selldone-vue-core/enums/language/Language"], function (require, exports, Language_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LanguageDatabase = void 0;
    var LanguageDatabase = /** @class */ (function () {
        function LanguageDatabase(shop_name) {
            this.shop_name = shop_name;
        }
        LanguageDatabase.prototype.getLanguage = function () {
            // Try to read from local storage:
            var user_language = localStorage.getItem("local-shop-".concat(this.shop_name));
            if (user_language && Language_1.Language[user_language]) {
                return Language_1.Language[user_language];
            }
            return null;
        };
        LanguageDatabase.prototype.setLanguage = function (language) {
            localStorage.setItem("local-shop-" + this.shop_name, typeof language === "object" ? language.code : language);
        };
        return LanguageDatabase;
    }());
    exports.LanguageDatabase = LanguageDatabase;
});
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
define("database/StorefrontDatabase", ["require", "exports", "database/localstorage/coupon.database", "database/localstorage/currency.database", "database/localstorage/language.database"], function (require, exports, coupon_database_1, currency_database_1, language_database_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StorefrontDatabase = void 0;
    var StorefrontDatabase = /** @class */ (function () {
        function StorefrontDatabase(shop_name) {
            this.shop_name = shop_name;
            this.coupon = new coupon_database_1.CouponDatabase(this.shop_name);
            this.currency = new currency_database_1.CurrencyDatabase(this.shop_name);
            this.language = new language_database_1.LanguageDatabase(this.shop_name);
        }
        return StorefrontDatabase;
    }());
    exports.StorefrontDatabase = StorefrontDatabase;
});
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
define("coupon/requests/xapi.coupons.get", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Fetches eligible coupons for the buyer.
     * Retrieves previously entered coupon codes from local storage.
     */
    function fetchAvailableCoupons(currency) {
        var params = { currency: currency, codes: window.$storefront.database.coupon.getCouponCodes(), };
        var url = window.XAPI.GET_FETCH_COUPONS(this.shop_name);
        return this.getNow(url, params);
    }
    exports.default = fetchAvailableCoupons;
});
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
define("coupon/XapiCoupon", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "coupon/requests/xapi.coupons.get"], function (require, exports, tslib_14, APIAbstract_11, xapi_coupons_get_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiCoupon = void 0;
    xapi_coupons_get_1 = tslib_14.__importDefault(xapi_coupons_get_1);
    var XapiCoupon = /** @class */ (function (_super) {
        tslib_14.__extends(XapiCoupon, _super);
        function XapiCoupon(shop_name) {
            var _this = _super.call(this) || this;
            _this.fetchAvailableCoupons = xapi_coupons_get_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiCoupon;
    }(APIAbstract_11.APIAbstract));
    exports.XapiCoupon = XapiCoupon;
});
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
define("offer/requests/xapi.offer.get", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function fetchOffers(currency) {
        var params = {
            currency: currency,
        };
        var url = window.XAPI.GET_FETCH_OFFERS(this.shop_name);
        return this.getNow(url, params);
    }
    exports.default = fetchOffers;
});
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
define("offer/XapiOffer", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "offer/requests/xapi.offer.get"], function (require, exports, tslib_15, APIAbstract_12, xapi_offer_get_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiOffer = void 0;
    xapi_offer_get_1 = tslib_15.__importDefault(xapi_offer_get_1);
    var XapiOffer = /** @class */ (function (_super) {
        tslib_15.__extends(XapiOffer, _super);
        function XapiOffer(shop_name) {
            var _this = _super.call(this) || this;
            _this.fetchOffers = xapi_offer_get_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiOffer;
    }(APIAbstract_12.APIAbstract));
    exports.XapiOffer = XapiOffer;
});
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
define("basket/requests/xapi.basket.items.put", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Fetches eligible coupons for the buyer.
     * Retrieves previously entered coupon codes from local storage.
     */
    function addItem(product_id, variant_id, count, options) {
        var params = {
            currency: (options === null || options === void 0 ? void 0 : options.currency)
                ? options.currency
                : window.$storefront.currency.code,
            variant_id: variant_id,
            count: count,
            preferences: options === null || options === void 0 ? void 0 : options.preferences,
            vendor_product_id: options === null || options === void 0 ? void 0 : options.vendor_product_id, // 🟣 Marketplace 🟣
            price_id: options === null || options === void 0 ? void 0 : options.price_id, // 🎗️ Subscription
        };
        var url = window.XAPI.PUT_PHYSICAL_ITEM_IN_BASKET(this.shop_name, product_id);
        return this.putNow(url, params, {
            accept_error_response: true /*It can return error and error_msg and at the same time return basket and bill!*/,
        });
    }
    exports.default = addItem;
});
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
define("basket/requests/xapi.basket.items.delete", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Fetches eligible coupons for the buyer.
     * Retrieves previously entered coupon codes from local storage.
     */
    function removeItem(product_id, variant_id, options) {
        var params = {
            currency: (options === null || options === void 0 ? void 0 : options.currency)
                ? options.currency
                : window.$storefront.currency.code,
            variant_id: variant_id,
        };
        var url = window.XAPI.DELETE_PHYSICAL_ITEM_FROM_BASKET(this.shop_name, product_id);
        return this.deleteNow(url, params);
    }
    exports.default = removeItem;
});
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
define("basket/XapiBasket", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "basket/requests/xapi.basket.items.put", "basket/requests/xapi.basket.items.delete"], function (require, exports, tslib_16, APIAbstract_13, xapi_basket_items_put_1, xapi_basket_items_delete_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiBasket = void 0;
    xapi_basket_items_put_1 = tslib_16.__importDefault(xapi_basket_items_put_1);
    xapi_basket_items_delete_1 = tslib_16.__importDefault(xapi_basket_items_delete_1);
    var XapiBasket = /** @class */ (function (_super) {
        tslib_16.__extends(XapiBasket, _super);
        function XapiBasket(shop_name) {
            var _this = _super.call(this) || this;
            _this.addItem = xapi_basket_items_put_1.default;
            _this.removeItem = xapi_basket_items_delete_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiBasket;
    }(APIAbstract_13.APIAbstract));
    exports.XapiBasket = XapiBasket;
});
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
define("vendor/requests/xapi.vendor.get", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getVendor(vendor_id) {
        var url = window.XAPI.GET_VENDOR_INFO(this.shop_name, vendor_id);
        return this.getNow(url);
    }
    exports.default = getVendor;
});
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
define("vendor/XapiVendor", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "vendor/requests/xapi.vendor.get"], function (require, exports, tslib_17, APIAbstract_14, xapi_vendor_get_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiVendor = void 0;
    xapi_vendor_get_1 = tslib_17.__importDefault(xapi_vendor_get_1);
    var XapiVendor = /** @class */ (function (_super) {
        tslib_17.__extends(XapiVendor, _super);
        function XapiVendor(shop_name) {
            var _this = _super.call(this) || this;
            _this.getVendor = xapi_vendor_get_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiVendor;
    }(APIAbstract_14.APIAbstract)); //█████████████████████████████████████████████████████████████
    exports.XapiVendor = XapiVendor;
});
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
define("avocado/requests/xapi.avocado.submit-order.post", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function submitOrder(hash, currency) {
        var params = {
            currency: currency
        };
        var url = window.XAPI.POST_RESERVE_AVOCADO(this.shop_name, hash);
        return this.postNow(url, params);
    }
    exports.default = submitOrder;
});
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
define("avocado/requests/xapi.avocado.add-item.post", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function addItem(hash, title, message, link, photo, count) {
        var url = window.XAPI.POST_ADD_OPEN_AVOCADO_ITEM(this.shop_name, hash);
        var params = new FormData();
        if (photo)
            params.append("photo", photo);
        if (title)
            params.append("title", title);
        if (message)
            params.append("message", message);
        if (link)
            params.append("link", link);
        params.append("count", count.toString());
        return this.postNow(url, params);
    }
    exports.default = addItem;
});
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
define("avocado/requests/xapi.avocado.receiver-info.put", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function updateReceiverInfo(hash, receiver_info) {
        var params = {
            receiver_info: receiver_info
        };
        var url = window.XAPI.PUT_SET_CUSTOMER_INFO_FOR_AVOCADO(this.shop_name, hash);
        return this.putNow(url, params);
    }
    exports.default = updateReceiverInfo;
});
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
define("avocado/requests/xapi.avocado.order.get", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getOrder(hash) {
        var url = window.XAPI.GET_CUSTOMER_INFO_FOR_AVOCADO(this.shop_name, hash);
        return this.getNow(url);
    }
    exports.default = getOrder;
});
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
define("avocado/XapiAvocado", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "avocado/requests/xapi.avocado.submit-order.post", "avocado/requests/xapi.avocado.add-item.post", "avocado/requests/xapi.avocado.receiver-info.put", "avocado/requests/xapi.avocado.order.get"], function (require, exports, tslib_18, APIAbstract_15, xapi_avocado_submit_order_post_1, xapi_avocado_add_item_post_1, xapi_avocado_receiver_info_put_1, xapi_avocado_order_get_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiAvocado = void 0;
    xapi_avocado_submit_order_post_1 = tslib_18.__importDefault(xapi_avocado_submit_order_post_1);
    xapi_avocado_add_item_post_1 = tslib_18.__importDefault(xapi_avocado_add_item_post_1);
    xapi_avocado_receiver_info_put_1 = tslib_18.__importDefault(xapi_avocado_receiver_info_put_1);
    xapi_avocado_order_get_1 = tslib_18.__importDefault(xapi_avocado_order_get_1);
    var XapiAvocado = /** @class */ (function (_super) {
        tslib_18.__extends(XapiAvocado, _super);
        function XapiAvocado(shop_name) {
            var _this = _super.call(this) || this;
            _this.addItem = xapi_avocado_add_item_post_1.default;
            _this.updateReceiverInfo = xapi_avocado_receiver_info_put_1.default;
            _this.submitOrder = xapi_avocado_submit_order_post_1.default;
            _this.getOrder = xapi_avocado_order_get_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiAvocado;
    }(APIAbstract_15.APIAbstract));
    exports.XapiAvocado = XapiAvocado;
});
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
define("article/tag/requests/xapi.article.tags.post", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function setArticleTags(shop_id, article_id, tags) {
        var url = window.XAPI.POST_SET_SHOP_ARTICLE_TAGS(shop_id, article_id);
        var params = { tags: tags };
        return this.postNow(url, params);
    }
    exports.default = setArticleTags;
});
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
define("article/tag/requests/xapi.article.tags.put", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function updateTag(shop_id, old_tag, new_tag) {
        var url = window.XAPI.PUT_CHANGE_TAG(shop_id);
        var params = {
            old: old_tag,
            new: new_tag,
        };
        return this.putNow(url, params);
    }
    exports.default = updateTag;
});
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
define("article/tag/requests/Xapi.article.tags.get", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getTags(vendor_id) {
        var url = window.XAPI.GET_SHOP_ARTICLE_TAGS(vendor_id);
        return this.getNow(url);
    }
    exports.default = getTags;
});
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
define("article/tag/XapiArticleTag", ["require", "exports", "tslib", "article/tag/requests/xapi.article.tags.post", "../selldone-vue-core/server/APIAbstract", "article/tag/requests/xapi.article.tags.put", "article/tag/requests/Xapi.article.tags.get"], function (require, exports, tslib_19, xapi_article_tags_post_1, APIAbstract_16, xapi_article_tags_put_1, Xapi_article_tags_get_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiArticleTag = void 0;
    xapi_article_tags_post_1 = tslib_19.__importDefault(xapi_article_tags_post_1);
    xapi_article_tags_put_1 = tslib_19.__importDefault(xapi_article_tags_put_1);
    Xapi_article_tags_get_1 = tslib_19.__importDefault(Xapi_article_tags_get_1);
    var XapiArticleTag = /** @class */ (function (_super) {
        tslib_19.__extends(XapiArticleTag, _super);
        function XapiArticleTag(shop_name) {
            var _this = _super.call(this) || this;
            _this.setArticleTags = xapi_article_tags_post_1.default;
            _this.updateTag = xapi_article_tags_put_1.default;
            _this.getTags = Xapi_article_tags_get_1.default;
            _this.shop_name = shop_name;
            return _this;
        }
        return XapiArticleTag;
    }(APIAbstract_16.APIAbstract));
    exports.XapiArticleTag = XapiArticleTag;
});
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
define("article/XapiArticle", ["require", "exports", "tslib", "../selldone-vue-core/server/APIAbstract", "article/tag/XapiArticleTag"], function (require, exports, tslib_20, APIAbstract_17, XapiArticleTag_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.XapiArticle = void 0;
    var XapiArticle = /** @class */ (function (_super) {
        tslib_20.__extends(XapiArticle, _super);
        function XapiArticle(shop_name) {
            var _this = _super.call(this) || this;
            _this.shop_name = shop_name;
            _this.tags = new XapiArticleTag_1.XapiArticleTag(shop_name);
            return _this;
        }
        return XapiArticle;
    }(APIAbstract_17.APIAbstract));
    exports.XapiArticle = XapiArticle;
});
// @ts-nocheck
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
define("StorefrontSDK", ["require", "exports", "../selldone-vue-core/server/SetupService", "user/XapiUser", "apis/XAPI", "shop/XapiShop", "../selldone-vue-core/server/CDN", "../selldone-vue-core/server/URLS", "auth/XapiAuth", "plugins/axios/StorefrontAxiosSetup", "product/XapiProduct", "lottery/XapiLottery", "database/StorefrontDatabase", "coupon/XapiCoupon", "offer/XapiOffer", "../selldone-vue-core/enums/payment/Currency", "basket/XapiBasket", "vendor/XapiVendor", "avocado/XapiAvocado", "article/XapiArticle", "../selldone-vue-core/enums/route/StorefrontRoutesName"], function (require, exports, SetupService_4, XapiUser_1, XAPI_1, XapiShop_1, CDN_1, URLS_1, XapiAuth_2, StorefrontAxiosSetup_1, XapiProduct_1, XapiLottery_1, StorefrontDatabase_1, XapiCoupon_1, XapiOffer_1, Currency_2, XapiBasket_1, XapiVendor_1, XapiAvocado_1, XapiArticle_1, StorefrontRoutesName_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StorefrontSDK = void 0;
    var SDK_VERSION = "0.02";
    //█████████████████████████████████████████████████████████████
    //――――――――――― Selldone® Storefront SDK ―――――――――――
    //█████████████████████████████████████████████████████████████
    var StorefrontSDK = /** @class */ (function () {
        function StorefrontSDK() {
        }
        /**
         * Initializes and sets up the Selldone Storefront SDK.
         * It configures essential SDK parameters, either by taking them from provided arguments or by
         * fetching them from meta tags. Additionally, it logs the SDK version to the console and
         * handles different environments, specifically the back office.
         *
         * @param _shop_name Optional shop name. If not provided, the function attempts to retrieve the
         * shop name from a meta tag with the attribute name "shop-name".
         *
         * @throws Will throw an error if the shop name is not provided and is also not available
         * in the meta tag when not in the backoffice environment.
         *
         * @returns void
         *
         * @constructor
         *
         * @example
         * // Usage in the backoffice environment
         * StorefrontSDK.Setup("exampleShop");
         *
         * // Typical usage without providing shop name (relies on meta tag)
         * StorefrontSDK.Setup();
         */
        StorefrontSDK.Setup = function (_shop_name) {
            console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓");
            console.log("\u2523\u2501\u2501\u2501\u2501 Selldone\u00AE Storefront SDK | V".concat(SDK_VERSION, " \u2501\u2501\u2501\u2501\u252B"));
            console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛");
            this.CheckDependencies();
            var shop_name;
            var shop_prefix_address;
            var custom_home;
            if (window.$backoffice) {
                console.style("You are using Storefront SDK within <b='color:#673AB7'>BACKOFFICE ENVIRONMENT</b>. So we initial it automatically compatible with Back Office SDK!");
                if (!_shop_name)
                    throw "❌ Please set shop_name in the StorefrontSDK.Setup(...)!";
                shop_name = _shop_name;
                shop_prefix_address = "";
                custom_home = null;
                //――――――――――――――――――――――――― Initialize Resources Origin ―――――――――――――――――――――――――
                // Define API repositories:
                window.XAPI = new XAPI_1.XAPI();
            }
            else {
                //――――――――――――――――――――――――― Shop Meta Tags ―――――――――――――――――――――――――
                shop_name = _shop_name
                    ? _shop_name
                    : SetupService_4.SetupService.GetMetaValue("shop-name");
                if (!shop_name)
                    throw "❌ The shop name is not specified in the meta tag with the name 'shop-name'.";
                shop_prefix_address = SetupService_4.SetupService.GetMetaValue("shop-prefix-address", "");
                custom_home = SetupService_4.SetupService.GetMetaValue("custom-home");
                //――――――――――――――――――――――――― Axios ―――――――――――――――――――――――――
                (0, StorefrontAxiosSetup_1.StorefrontAxiosSetup)();
                //――――――――――――――――――――――――― Initialize Resources Origin ―――――――――――――――――――――――――
                // Define API repositories:
                window.CDN = new CDN_1.CDN();
                window.XAPI = new XAPI_1.XAPI();
                window.URLS = new URLS_1.URLS();
                window.ADDRESS_API = window.XAPI;
                window.ARTICLE_API = window.XAPI;
            }
            //――――――――――――――――――――――――― Create Instance ―――――――――――――――――――――――――
            var _LOCAL_STORAGE_BASE_PATH = "shop/@".concat(shop_name, "/");
            var _database = new StorefrontDatabase_1.StorefrontDatabase(shop_name);
            window.$storefront = {
                name: shop_name,
                prefix_url: shop_prefix_address,
                local_storage_path: _LOCAL_STORAGE_BASE_PATH,
                database: _database,
                currency: _database.currency.getCurrency(),
                home: custom_home,
                user: new XapiUser_1.XapiUser(shop_name),
                shop: new XapiShop_1.XapiShop(shop_name),
                auth: new XapiAuth_2.XapiAuth(shop_name),
                products: new XapiProduct_1.XapiProduct(shop_name),
                lottery: new XapiLottery_1.XapiLottery(shop_name),
                coupon: new XapiCoupon_1.XapiCoupon(shop_name),
                offer: new XapiOffer_1.XapiOffer(shop_name),
                basket: new XapiBasket_1.XapiBasket(shop_name),
                vendor: new XapiVendor_1.XapiVendor(shop_name),
                avocado: new XapiAvocado_1.XapiAvocado(shop_name),
                article: new XapiArticle_1.XapiArticle(shop_name),
                routes: StorefrontRoutesName_1.StorefrontRoutesName,
            };
            Object.defineProperty(window.$storefront, "currency", {
                get: function () {
                    return _database.currency.getCurrency();
                },
                set: function (value) {
                    if (typeof value === "string") {
                        value = Currency_2.Currency[value];
                    }
                    _database.currency.saveCurrency(value);
                },
            });
            window.$storefront.currency = _database.currency.getCurrency();
            console.style("\u2705 Selldone\u00AE Storefront SDK [<b='color:#009688'>@".concat(shop_name, "</b>] initialized successfully."));
        };
        StorefrontSDK.CheckDependencies = function () {
            if (typeof console.style !== "function") {
                throw new Error("❌ console.style not found. Please initialize 'SelldoneCore.Setup()' before initializing the Storefront SDK.");
            }
        };
        return StorefrontSDK;
    }());
    exports.StorefrontSDK = StorefrontSDK;
});
define("index", ["require", "exports", "StorefrontSDK"], function (require, exports, StorefrontSDK_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StorefrontSDK = void 0;
    Object.defineProperty(exports, "StorefrontSDK", { enumerable: true, get: function () { return StorefrontSDK_1.StorefrontSDK; } });
});
//# sourceMappingURL=bundle.js.map