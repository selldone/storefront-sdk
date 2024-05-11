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

import { SetupService } from "@selldone/core-js/server/SetupService";
import { Currency } from "@selldone/core-js/enums/payment/Currency";

export class XAPI {
  selldone_xapi_url: string = "";

  /**
   * When creating an instance of the class containing this constructor, it will automatically search the HTML document's `<head>` section for a `<meta>` tag with the `name` attribute set to "selldone-xapi".
   *
   * If this tag is found, its `content` value (which should be a URL) will be assigned to the `selldone_xapi_url` property of the instance.
   *
   * ex: <meta name="selldone-xapi" content="https://xapi.example.com">
   *
   */
  constructor() {
    this.selldone_xapi_url = SetupService.GetMetaValue("selldone-xapi");
  }

  //―――――――――――――――――――――― Login By SMS ――――――――――――――――――――

  SHOP_LOGIN_REQUEST(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/sms-login/request`;
  }
  SHOP_LOGIN_VERIFY(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/sms-login/verify`;
  }

  SHOP_LOGIN_SELECT_USER(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/sms-login/select-user`;
  }

  SHOP_LOGIN_NEW_USER(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/sms-login/new-user`;
  }

  //―――――――――――――――――――――― Login By Email ――――――――――――――――――――
  POST_SHOP_LOGIN_EMAIL_REQUEST(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/email-login/request`;
  }
  POST_SHOP_LOGIN_EMAIL_VERIFY(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/email-login/verify`;
  }
  //―――――――――――――――――――――― User ――――――――――――――――――――

  /**
   * Retrieves the URL for getting user information.
   *
   * Note: This method only works when authenticated by passport.
   *
   * @returns {string} The URL for fetching user information.
   */
  GET_USER(): string {
    return `${this.selldone_xapi_url}/me`;
  }

  LOGOUT(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/logout`;
  }

  GET_EXCHANGE_RATES(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/exchange/rates`;
  }

  POST_LEAVE_SHOP(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/leave`;
  }

  POST_SUBSCRIBE(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/subscribe`;
  }
  //―――――――――――――――――――――― Shop ――――――――――――――――――――

  GET_SHOP_INFO(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/info`;
  }

  GET_SHOP_PROFILE(shop_name: string, type: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/profiles/${type}`;
  }

  //―――――――――――――――――――――― Product ――――――――――――――――――――

  GET_PRODUCTS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/all`;
  }
  GET_PRODUCTS_LIST(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/list`;
  }

  GET_PRODUCT_INFO(shop_name: string, product_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/info`;
  }
  GET_PRODUCT_INFO_CARD(
    shop_name: string,
    product_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/info-card`;
  }

  GET_PRODUCT_INFO_INSTAGRAM(
    shop_name: string,
    product_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/info-instagram`;
  }
  GET_PRODUCT_INFO_HYPER(
    shop_name: string,
    product_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/info-hyper`;
  }

  POST_SET_PRODUCT_RATING(
    shop_name: string,
    product_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/set-my-rating`;
  }

  //―――――――――――――――――――――― Basket > 🥵 User & 🥶 Guest ――――――――――――――――――――

  PUT_PHYSICAL_ITEM_IN_BASKET(
    shop_name: string,
    product_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${product_id}`;
  }
  DELETE_PHYSICAL_ITEM_FROM_BASKET(
    shop_name: string,
    product_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${product_id}`;
  }

  POST_BASKET_ITEM_MESSAGE(
    shop_name: string,
    product_id: string | number
  ): string {
    // Also support PUT!
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${product_id}/message`;
  }
  DELETE_BASKET_ITEM_FILE(
    shop_name: string,
    basket_id: string | number,
    file_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/files/${file_id}`;
  }

  PUT_BASKET_ITEM_PREFERENCES(
    shop_name: string,
    product_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${product_id}/preferences`;
  }

  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ Basket > 🥵 User & 🥶 Guest ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  PUT_SET_BASKET_CONFIG(shop_name: string, basket_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/config`;
  }

  GET_BASKET_BILL(shop_name: string, type: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${type}/bill`;
  }

  POST_BUY_BASKET(shop_name: string, type: string, gateway: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${type}/buy/${gateway}`;
  }
  POST_PAY_BILL(
    shop_name: string,
    basket_id: string | number,
    bill_id: string | number,
    gateway: string
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${basket_id}/bills/${bill_id}/pay/${gateway}`;
  }

  POST_SUBMIT_SERVICE_BASKET(shop_name: string, type: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${type}/submit`;
  }

  POST_SET_MY_LOCATION(shop_name: string, type: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${type}/my-location`;
  }

  PUT_ORDER_EDIT_RECEIVER_INFO(
    shop_name: string,
    basket_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/receiver-info`;
  }

  POST_BASKET_GENERATE_SHARE_LINK(
    shop_name: string,
    basket_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/share`;
  }

  POST_BASKET_IMPORT(shop_name: string, type: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/${type}/import`;
  }
  //▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ Basket > 🎗️ Subscription > 🥵 User ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  POST_BASKET_CREATE_SUBSCRIPTION_PORTAL_URL(
    shop_name: string,
    basket_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/portal`;
  }

  // ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

  GET_ORDER_BASKET_INFO(shop_name: string, basket_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}`;
  }
  GET_ORDER_POS_BASKET_INFO(
    shop_name: string,
    basket_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/pos-baskets/${basket_id}`;
  }

  POST_ORDER_BASKET_CONFIRM_RECEIVED(
    shop_name: string,
    basket_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/confirm-received`;
  }

  PUT_ORDER_EDIT_BILLING(
    shop_name: string,
    basket_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/billing`;
  }
  GET_MY_ORDERS_HISTORY_PHYSICAL(shop_name: string, type: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/orders-${type}`;
  }
  GET_MY_BASKET_ITEM_RETURNS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/basket/orders/return-requests`;
  }
  POST_BASKET_ITEM_RETURN_REQUEST(
    shop_name: string,
    basket_id: string | number,
    item_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/return/${item_id}`;
  }

  GENERATE_DOWNLOAD_PRODUCT_FILE_TEMP_URL(
    shop_name: string,
    product_id: string | number,
    file_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/files/${file_id}`;
  }

  GET_TAX_REGIONS(shop_name: string, country: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/tax/${country}/regions`;
  }

  //―――――――――――――――――――――― Search ――――――――――――――――――――

  GET_SEARCH_QUERY(shop_name: string, query: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/search/suggestion/${query}`;
  }

  //―――――――――――――――――――――― Product inform ――――――――――――――――――――

  PUT_TO_WAITING_FOR_BE_AVAILABLE(
    shop_id: string | number,
    product_id: string | number
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_id}/products/${product_id}/waiting-be-available`;
  }

  DELETE_FROM_WAITING_FOR_BE_AVAILABLE(
    shop_id: string | number,
    product_id: string | number
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_id}/products/${product_id}/waiting-be-available`;
  }
  PUT_TO_WAITING_FOR_AUCTION(
    shop_id: string | number,
    product_id: string | number
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_id}/products/${product_id}/waiting-auction`;
  }
  DELETE_FROM_WAITING_FOR_AUCTION(
    shop_id: string | number,
    product_id: string | number
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_id}/products/${product_id}/waiting-auction`;
  }

  //―――――――――――――――――――――― Product Wish list ――――――――――――――――――――
  PUT_WISHLIST_PRODUCT(shop_name: string, product_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/wishlist`;
  }

  DELETE_WISHLIST_PRODUCT(
    shop_name: string,
    product_id: string | number
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/wishlist`;
  }

  //―――――――――――――――――――――― Comments ――――――――――――――――――――

  GET_MY_COMMENTS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/comments`;
  }

  //―――――――――――――――――――――― Gift Cards ――――――――――――――――――――

  GET_MY_GIFT_CARDS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/giftcards`;
  }
  GET_MY_GIFT_CARDS_LIST(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/giftcards/list`;
  }
  POST_ADD_GIFT_CARDS(shop_name: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/giftcards`;
  }

  //―――――――――――――――――――――― Discount Code ――――――――――――――――――――

  PUT_DISCOUNT_CODE(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/discount-code`;
  }

  //―――――――――――――――――――――― Shop > Blogs ――――――――――――――――――――

  GET_SHOP_BLOGS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/blogs`;
  }

  //―――――――――――――――――――――― FCM ――――――――――――――――――――

  POST_SET_FCM_TOKEN(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/fcm/token`;
  }

  //―――――――――――――――――――――― Payment ――――――――――――――――――――

  GET_PENDING_PAYMENT_INFO(
    shop_name: string,
    gateway: string,
    transaction_id: string
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/gateways/${gateway}/${transaction_id}`;
  }

  GET_PAYMENT_STATUS_INTERVAL(
    shop_name: string,
    gateway: string,
    transaction_id: string,
    unique_id: string
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/gateways/${gateway}/transactions/${transaction_id}/${unique_id}`;
  }

  POST_SET_SHOP_APP_STATUS_BY_CUSTOMER(shop_name: string, app_code: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/apps/${app_code}/status`;
  }

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
  POST_UPLOAD_RETURN_REQUEST_FILE(
    shop_name: string,
    basket_id: string | number,
    basketItem_id: string | number,
    type: string
  ): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/return/${basketItem_id}/temp/upload/${type}`;
  }

  //―――――――――――――――――――――― Contact Us ――――――――――――――――――――

  POST_CONTACT_US_FORM(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contact-us`;
  }

  //―――――――――――――――――――――― FAQ ――――――――――――――――――――
  GET_FAQ_TAGS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/faqs/tags`;
  }

  GET_FAQ(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/faqs`;
  }

  POST_SEND_QUESTION(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/faqs`;
  }

  //―――――――――――――――――――――― Page Builder ――――――――――――――――――――
  GET_CUSTOM_HOME_PAGE(shop_name: string, page_id: string | number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/home/default?page_id=${page_id}`;
  }

  GET_PAGE_DATA(shop_name: string, page_name = "") {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/pages${
      page_name ? "/" + page_name : ""
    }`;
  }
  GET_PAGE_STATISTIC(shop_name: string, page_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/pages/${page_name}/statistic`;
  }
  GET_INCLUDE_PAGE_DATA(shop_name: string, include_id = "") {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/includes/${include_id}`;
  }

  //―――――――――――――――――――――― Stripe ――――――――――――――――――――
  GET_CHECK_SHOP_STRIPE_PAYMENT_INTENT(
    shop_name: string,
    paymentIntent_id: string
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/gateways/stripe/${paymentIntent_id}/check`;
  }

  //―――――――――――――――――――――― PayPal ――――――――――――――――――――
  GET_PAYPAL_CLIENT_TOKEN(shop_name: string, currency: keyof typeof Currency) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/gateways/paypal/client-token/${currency}`;
  }

  //―――――――――――――――――――――― Direct payment upload payment receipt ――――――――――――――――――――

  POST_UPLOAD_DIRECT_PAYMENT_RECEIPT(
    shop_name: string,
    transaction_id: number | string,
    currency: keyof typeof Currency
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/transactions/${transaction_id}/receipt/${currency}`;
  }
  //―――――――――――――――――――――― Address Book (Shared!) ――――――――――――――――――――

  GET_MY_ADDRESSES() {
    return `${this.selldone_xapi_url}/address/all`;
  }

  DELETE_MY_ADDRESSES(address_id: string | number) {
    return `${this.selldone_xapi_url}/address/${address_id}`;
  }

  PUT_ADDRESS(address_id: string | number) {
    return `${this.selldone_xapi_url}/address/${address_id}`;
  }

  POST_ADDRESS() {
    return `${this.selldone_xapi_url}/address`;
  }
  GET_GEO_TO_ADDRESS() {
    return `${this.selldone_xapi_url}/address/gto-to-address`;
  }
  GET_AUTOCOMPLETE() {
    return `${this.selldone_xapi_url}/address/autocomplete`;
  }

  //█████████████████████████████████████████████████████████████
  //――――――――――――――――――――――――――― Article ―――――――――――――――――――――――――
  //█████████████████████████████████████████████████████████████

  GET_SHOP_BLOG_CATEGORIES(shop_id: number | string) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/blog/categories`;
  }

  GET_SHOP_BLOG_DATA(shop_name: string, blog_id: number | string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/blogs/${blog_id}`;
  }

  //―――――――――――――――――――――― Link preview ――――――――――――――――――――
  GET_LINK_PREVIEW() {
    return `${this.selldone_xapi_url}/iframe/preview`;
  }

  //―――――――――――――――――――――― Coupons ――――――――――――――――――――

  GET_FETCH_COUPONS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/coupons`;
  }

  GET_COUPONS_BY_CODE(shop_name: string, code: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/coupons/${code}`;
  }

  PUT_SET_BASKET_COUPON(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/coupon`;
  }

  //―――――――――――――――――――――― Offers ――――――――――――――――――――

  GET_FETCH_OFFERS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/offers`;
  }

  //―――――――――――――――――――――― Lotteries ――――――――――――――――――――

  GET_FETCH_LOTTERIES(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/lottery`;
  }
  POST_FETCH_LOTTERIES(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/lottery/play`;
  }

  GET_FETCH_LOTTERY_WINS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/lottery/wins`;
  }

  PUT_SET_BASKET_LOTTERY(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/lottery`;
  }

  //―――――――――――――――――――――― User Selected Currency ――――――――――――――――――――

  PUT_SET_USER_CURRENCY(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/currency`;
  }

  //―――――――――――――――――――――― Shop > Contact Us ――――――――――――――――――――
  GET_SHOP_TICKETS_LIST(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contacts`;
  }
  PUT_SHOP_TICKET_UPDATE_MESSAGE(
    shop_name: string,
    contact_id: number | string
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contacts/${contact_id}`;
  }

  DELETE_SHOP_TICKET_MESSAGE_RESPONSE(
    shop_name: string,
    contact_id: number | string,
    index: number
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contacts/${contact_id}/${index}`;
  }

  POST_SHOP_TICKET_CLOSE(shop_name: string, contact_id: number | string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contacts/${contact_id}/close`;
  }
  PUT_SHOP_TICKET_RATE(shop_name: string, contact_id: number | string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/contacts/${contact_id}/rate`;
  }

  //―――――――――――――――――――――― Instagram ――――――――――――――――――――

  GET_INSTAGRAM_DATA(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/channels/instagram`;
  }

  //―――――――――――――――――――――― Avocado ――――――――――――――――――――
  GET_CUSTOMER_OPEN_AVOCADO(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado`;
  }
  GET_CUSTOMER_HISTORY_AVOCADOS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocados`;
  }

  POST_ADD_OPEN_AVOCADO_ITEM(shop_name: string, hash: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}/items`;
  }
  DELETE_OPEN_AVOCADO_ITEM(
    shop_name: string,
    hash: string,
    item_id: string | number
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}/items/${item_id}`;
  }
  POST_RESERVE_AVOCADO(shop_name: string, hash: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}/reserve`;
  }

  GET_CUSTOMER_INFO_FOR_AVOCADO(shop_name: string, hash: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}`;
  }
  PUT_SET_CUSTOMER_INFO_FOR_AVOCADO(shop_name: string, hash: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}`;
  }
  POST_PAY_AVOCADO(shop_name: string, hash: string, gateway: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avocado/${hash}/pay/${gateway}`;
  }

  GET_ORDER_AVOCADO_BASKET_INFO(shop_name: string, avocado_id: number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/avo-baskets/${avocado_id}`;
  }

  //―――――――――――――――――――――― Avocado ――――――――――――――――――――
  GET_CUSTOMER_OPEN_HYPER(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hyper`;
  }
  POST_ADD_OPEN_HYPER_ITEM(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hyper/items`;
  }
  GET_CUSTOMER_HISTORY_HYPERS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hypers`;
  }
  POST_PAY_HYPER(shop_name: string, gateway: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hyper/pay/${gateway}`;
  }
  DELETE_OPEN_HYPER_ITEM(shop_name: string, item_id: string | number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hyper/items/${item_id}`;
  }
  GET_CUSTOMER_INFO_FOR_HYPER(shop_name: string, hyper_id: string | number) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/hyper/${hyper_id}`;
  }

  //█████████████████████████████████████████████████████████████
  //―――――――――――――――――――――― Check Payments & Verify ―――――――――――――――――――――
  //█████████████████████████████████████████████████████████████

  // ―――――――――― PayPal Standard ――――――――――
  POST_PAYMENTS_PAYPAL_STANDARD_VERIFY(shop_name: string) {
    return `${this.selldone_xapi_url}/paypal-standard/@${shop_name}/verify`;
  }

  //█████████████████████████████████████████████████████████████
  //――――――――――――――――――――――――――― Article ―――――――――――――――――――――――――
  //█████████████████████████████████████████████████████████████

  //―――――――――――――――――――――― SEO ――――――――――――――――――――
  GET_ARTICLE_SEO_AUDIT(shop_id: number | string, article_id: string | number) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/seo-audit/articles/${article_id}`;
  }

  //―――――――――――――――――――――― Import word file ――――――――――――――――――――
  POST_SHOP_CONVERTER_WORD_HTML(shop_id: string | number) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/converter/word/html`;
  }

  //―――――――――――――――――――――― Translate ――――――――――――――――――――
  POST_TRANSLATE_PRODUCT_ARTICLE(
    shop_id: string | number,
    product_id: string | number
  ) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/products/${product_id}/translate-article`;
  }

  //―――――――――――――――――――――― User Feedback ――――――――――――――――――――
  POST_LIKE_ARTICLE(article_id: string | number) {
    return `${this.selldone_xapi_url}/articles/${article_id}/like`;
  }
  POST_STAR_ARTICLE(article_id: string | number) {
    return `${this.selldone_xapi_url}/articles/${article_id}/star`;
  }
  POST_CLAPS_OF_ARTICLE(article_id: string | number) {
    return `${this.selldone_xapi_url}/articles/${article_id}/claps`;
  }
  POST_REPORT_ARTICLE(article_id: string | number, report: number) {
    return `${this.selldone_xapi_url}/articles/${article_id}/report/${report}`;
  }

  //―――――――――――――――――――――― Timeline ――――――――――――――――――――
  GET_SHOP_ARTICLES_TIMELINE(shop_id: string | number) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/timeline/articles`;
  }

  //―――――――――――――――――――――― Edit ――――――――――――――――――――
  POST_ADD_EDIT_ARTICLE(type: string) {
    return `${this.selldone_xapi_url}/article/${type}/edit`;
  }

  //―――――――――――――――――――――― Upload ――――――――――――――――――――
  /**
   * Upload article image.
   * @param type
   * @param extra         shop ID
   * @returns {string}
   */
  UPLOAD_ARTICLE_IMAGE(type: string, extra = null): string {
    if (!extra) return `${this.selldone_xapi_url}/article/${type}/upload`;
    return `${this.selldone_xapi_url}/article/${type}/upload/${extra}`;
  }
  UPLOAD_ARTICLE_BLOG_IMAGE(shop_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/${shop_id}/blogs/upload`;
  }

  //―――――――――――――――――――――― Delete ――――――――――――――――――――
  DELETE_ARTICLE(type: string, article_id: string | number): string {
    return `${this.selldone_xapi_url}/article/${type}/${article_id}`;
  }

  //―――――――――――――――――――――― Tags ――――――――――――――――――――
  GET_SHOP_ARTICLE_TAGS(shop_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/${shop_id}/articles/tags`;
  }
  PUT_CHANGE_TAG(shop_id: string | number): string {
    return `${this.selldone_xapi_url}/shops/${shop_id}/articles/tags`;
  }
  POST_SET_SHOP_ARTICLE_TAGS(
    shop_id: string | number,
    article_id: string | number
  ) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/articles/tags/${article_id}`;
  }

  //―――――――――――――――――――――― Comments ――――――――――――――――――――
  POST_ADD_COMMENT(article_id: string | number) {
    return `${this.selldone_xapi_url}/article/${article_id}/comment`;
  }
  PUT_UPDATE_COMMENT(comment_id: string | number) {
    return `${this.selldone_xapi_url}/comment/${comment_id}`;
  }
  DELETE_COMMENT(comment_id: string | number) {
    return `${this.selldone_xapi_url}/comment/${comment_id}`;
  }

  //―――――――――――――――――――――― Follow ――――――――――――――――――――
  POST_FOLLOW_USER(user_id: string | number) {
    return `${this.selldone_xapi_url}/user/follow/${user_id}`;
  }

  POST_CUSTOMER_BASKET_CHAT_ADD_MESSAGE(
    shop_name: string,
    basket_id: string | number
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/chat`;
  }

  DELETE_CUSTOMER_BASKET_CHAT_MESSAGE(
    shop_name: string,
    basket_id: string | number,
    message_index: number
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/baskets/${basket_id}/chat/${message_index}`;
  }

  //―――――――――――――――――――――― Vendors ――――――――――――――――――――

  GET_VENDORS(shop_name: string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/vendors`;
  }
  GET_VENDOR_INFO(shop_name: string, vendor_id: number | string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/vendors/${vendor_id}`;
  }

  //―――――――――――――――――――――― 🎗️ Subscription ――――――――――――――――――――
  POST_SUBSCRIBE_NOW(shop_name: string, product_id: number | string) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/subscribe`;
  }
  GET_PRODUCT_MEMBERSHIP_CONTENTS(
    shop_name: string,
    product_id: number | string
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/contents`;
  }

  POST_PRODUCT_MEMBERSHIP_CONTENTS_SEND_MY_RATING(
    shop_name: string,
    product_id: number | string,
    content_id: number | string
  ) {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/products/${product_id}/contents/${content_id}/rate`;
  }

  //―――――――――――――――――――――― Stream Users (Public Form) ――――――――――――――――――――
  /**
   *
   * @param domain      we need to force xapi.selldone.com ... because of It's just for showing to user in dashboard!
   * @param shop_id
   * @param key
   * @returns {string}
   * @constructor
   */
  POST_STREAM_USER_ADD(
    domain: string,
    shop_id: string | number,
    key: string
  ): string {
    return `${domain}/shops/${shop_id}/audience/${key}`;
  }
  POST_STREAM_USER_ADD_NEWSLETTER(
    shop_id: string | number,
    key = "newsletter"
  ) {
    return `${this.selldone_xapi_url}/shops/${shop_id}/audience/${key}`;
  }

  //―――――――――――――――――――――― Language (Override packs)  ――――――――――――――――――――
  GET_SHOP_LANGUAGE_PACK(shop_name: string, language: string): string {
    return `${this.selldone_xapi_url}/shops/@${shop_name}/languages/${language}`;
  }
}
