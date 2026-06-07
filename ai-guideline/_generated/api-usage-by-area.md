# Generated Storefront API Usage By Area

Generated from `@selldone/sdk-storefront` and `src/Applications/Storefront` by scanning `window.XAPI.*` builder usage.

## articles-blog-content

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `src/Applications/Storefront/pages/blog/list/StorefrontPageBlogsList.vue:787` | `GET_SHOP_BLOGS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/blogs` |
## auth

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `@selldone/sdk-storefront/auth/email/request-otp/XapiAuthEmailRequestOtp.ts:53` | `POST_SHOP_LOGIN_EMAIL_REQUEST` | `POST` | `https://xapi.selldone.com/shops/@{shop}/email-login/request` |
| `@selldone/sdk-storefront/auth/email/verify-otp/XapiAuthEmailVerifyOtp.ts:63` | `POST_SHOP_LOGIN_EMAIL_VERIFY` | `POST` | `https://xapi.selldone.com/shops/@{shop}/email-login/verify` |
| `@selldone/sdk-storefront/auth/sms/register-user/XapiAuthSMSRegisterUser.ts:64` | `SHOP_LOGIN_NEW_USER` | `POST` | `https://xapi.selldone.com/shops/@{shop}/sms-login/new-user` |
| `@selldone/sdk-storefront/auth/sms/request-otp/XapiAuthSMSRequestOtp.ts:50` | `SHOP_LOGIN_REQUEST` | `POST` | `https://xapi.selldone.com/shops/@{shop}/sms-login/request` |
| `@selldone/sdk-storefront/auth/sms/select-user/XapiAuthSMSSelectUser.ts:50` | `SHOP_LOGIN_SELECT_USER` | `POST` | `https://xapi.selldone.com/shops/@{shop}/sms-login/select-user` |
| `@selldone/sdk-storefront/auth/sms/verify-otp/XapiAuthSMSVerifyOtp.ts:56` | `SHOP_LOGIN_VERIFY` | `POST` | `https://xapi.selldone.com/shops/@{shop}/sms-login/verify` |
| `@selldone/sdk-storefront/auth/XapiAuth.ts:32` | `LOGOUT` | `POST` | `https://xapi.selldone.com/shops/@{shop}/logout` |
## auth-user

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `@selldone/sdk-storefront/user/XapiUser.ts:44` | `GET_USER` | `GET` | `https://xapi.selldone.com/me` |
## avocado

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `@selldone/sdk-storefront/avocado/requests/xapi.avocado.add-item.post.ts:27` | `POST_ADD_OPEN_AVOCADO_ITEM` | `POST` | `https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/items` |
| `@selldone/sdk-storefront/avocado/requests/xapi.avocado.order.get.ts:19` | `GET_CUSTOMER_INFO_FOR_AVOCADO` | `GET` | `https://xapi.selldone.com/shops/@{shop}/avocado/{hash}` |
| `@selldone/sdk-storefront/avocado/requests/xapi.avocado.receiver-info.put.ts:28` | `PUT_SET_CUSTOMER_INFO_FOR_AVOCADO` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/avocado/{hash}` |
| `@selldone/sdk-storefront/avocado/requests/xapi.avocado.submit-order.post.ts:28` | `POST_RESERVE_AVOCADO` | `POST` | `https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/reserve` |
| `src/Applications/Storefront/pages/avocado/page/StorefrontPageAvocado.vue:262` | `GET_CUSTOMER_OPEN_AVOCADO` | `GET` | `https://xapi.selldone.com/shops/@{shop}/avocado` |
| `src/Applications/Storefront/pages/avocado/page/StorefrontPageAvocado.vue:286` | `GET_CUSTOMER_HISTORY_AVOCADOS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/avocados` |
## basket-orders-checkout

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `src/Applications/Storefront/components/orders/list/SOrdersList.vue:485` | `GET_MY_ORDERS_HISTORY_PHYSICAL` | `GET` | `https://xapi.selldone.com/shops/@{shop}/basket/orders-{type}` |
| `src/Applications/Storefront/components/orders/return-request/SOrderReturnRequests.vue:253` | `GET_MY_BASKET_ITEM_RETURNS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/basket/orders/return-requests` |
| `src/Applications/Storefront/pages/avocado/order/StorefrontPageAvocadoOrder.vue:109` | `GET_ORDER_AVOCADO_BASKET_INFO` | `GET` | `https://xapi.selldone.com/shops/@{shop}/avo-baskets/{avocado_id}` |
| `src/Applications/Storefront/pages/basket/cart/StorefrontPageBasketCart.vue:1633` | `GET_BASKET_BILL` | `GET` | `https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill` |
| `src/Applications/Storefront/pages/basket/cart/StorefrontPageBasketCart.vue:1663` | `PUT_SET_BASKET_CONFIG` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/config` |
| `src/Applications/Storefront/pages/basket/cart/StorefrontPageBasketCart.vue:1817` | `POST_SUBMIT_SERVICE_BASKET` | `POST` | `https://xapi.selldone.com/shops/@{shop}/basket/{type}/submit` |
| `src/Applications/Storefront/pages/basket/order/StorefrontPageBasketOrder.vue:193` | `GET_ORDER_BASKET_INFO` | `GET` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` |
| `src/Applications/Storefront/pages/hyper/cart/StorefrontPageHyperCart.vue:225` | `GET_CUSTOMER_OPEN_HYPER` | `GET` | `https://xapi.selldone.com/shops/@{shop}/hyper` |
| `src/Applications/Storefront/pages/hyper/cart/StorefrontPageHyperCart.vue:255` | `GET_CUSTOMER_HISTORY_HYPERS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/hypers` |
| `src/Applications/Storefront/pages/hyper/order/StorefrontPageHyperOrder.vue:243` | `GET_CUSTOMER_INFO_FOR_HYPER` | `GET` | `https://xapi.selldone.com/shops/@{shop}/hyper/{hyper_id}` |
## content-pages

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `src/Applications/Storefront/pages/official/about-us/StorefrontPageOfficialAboutUs.vue:64` | `GET_SHOP_PROFILE` | `GET` | `https://xapi.selldone.com/shops/@{shop}/profiles/{type}` |
| `src/Applications/Storefront/pages/official/contact-us/StorefrontPageOfficialContactUs.vue:174` | `GET_SHOP_PROFILE` | `GET` | `https://xapi.selldone.com/shops/@{shop}/profiles/{type}` |
| `src/Applications/Storefront/pages/official/privacy/StorefrontPageOfficialPrivacy.vue:72` | `GET_SHOP_PROFILE` | `GET` | `https://xapi.selldone.com/shops/@{shop}/profiles/{type}` |
| `src/Applications/Storefront/pages/official/terms/StorefrontPageOfficialTerms.vue:61` | `GET_SHOP_PROFILE` | `GET` | `https://xapi.selldone.com/shops/@{shop}/profiles/{type}` |
## customer-account

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `@selldone/sdk-storefront/user/requests/xapi.user.currency.put.ts:23` | `PUT_SET_USER_CURRENCY` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/currency` |
| `src/Applications/Storefront/pages/user/comments/StorefrontPageUserComments.vue:179` | `GET_MY_COMMENTS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/comments` |
| `src/Applications/Storefront/pages/user/giftcards/StorefrontPageUserGiftcards.vue:182` | `GET_MY_GIFT_CARDS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/giftcards` |
| `src/Applications/Storefront/pages/user/profile/StorefrontPageUserProfile.vue:541` | `POST_LEAVE_SHOP` | `POST` | `https://xapi.selldone.com/shops/@{shop}/leave` |
| `src/Applications/Storefront/pages/user/profile/StorefrontPageUserProfile.vue:564` | `POST_SUBSCRIBE` | `POST` | `https://xapi.selldone.com/shops/@{shop}/subscribe` |
| `src/Applications/Storefront/pages/user/profile/StorefrontPageUserProfile.vue:594` | `POST_SAVE_MY_CUSTOMER_PROFILE` | `POST` | `https://xapi.selldone.com/shops/@{shop}/customer` |
| `src/Applications/Storefront/pages/user/wallets/StorefrontPageUserWallets.vue:111` | `GET_MY_WALLETS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/wallets` |
## faq

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `src/Applications/Storefront/pages/faq/StorefrontPageFaq.vue:211` | `GET_FAQ_TAGS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/faqs/tags` |
| `src/Applications/Storefront/pages/faq/StorefrontPageFaq.vue:221` | `GET_FAQ` | `GET` | `https://xapi.selldone.com/shops/@{shop}/faqs` |
| `src/Applications/Storefront/pages/faq/StorefrontPageFaq.vue:241` | `POST_SEND_QUESTION` | `POST` | `https://xapi.selldone.com/shops/@{shop}/faqs` |
## incentives

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `@selldone/sdk-storefront/cashback/get/xapi.cashback.get.ts:33` | `GET_SHOP_CASHBACK_PROGRAM` | `GET` | `https://xapi.selldone.com/shops/@{shop}/cashback` |
| `@selldone/sdk-storefront/coupon/requests/xapi.coupons.get.ts:33` | `GET_FETCH_COUPONS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/coupons` |
| `@selldone/sdk-storefront/lottery/requests/xapi.lottery.get.ts:33` | `GET_FETCH_LOTTERY_WINS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/lottery/wins` |
| `@selldone/sdk-storefront/offer/requests/xapi.offer.get.ts:26` | `GET_FETCH_OFFERS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/offers` |
## listing-directory

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `src/Applications/Storefront/pages/listing/compare/StorefrontPageListingCompare.vue:237` | `GET_SHOP_LISTING_ITEMS_COMPARE` | `GET` | `https://xapi.selldone.com/shops/@{shop}/listing/compare` |
| `src/Applications/Storefront/pages/listing/StorefrontPageListing.vue:89` | `GET_SHOP_LISTING_INFO` | `GET` | `https://xapi.selldone.com/shops/@{shop}/listing` |
## localization

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `@selldone/sdk-storefront/shop/exchange-rates/requests/xapi.exchange-rates.get.ts:31` | `GET_EXCHANGE_RATES` | `GET` | `https://xapi.selldone.com/shops/@{shop}/exchange/rates` |
| `@selldone/sdk-storefront/shop/language/requests/xapi.language.get.ts:21` | `GET_SHOP_LANGUAGE_PACK` | `GET` | `https://xapi.selldone.com/shops/@{shop}/languages/{language}` |
## marketplace-vendors

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `@selldone/sdk-storefront/vendor/requests/xapi.vendor.get.ts:22` | `GET_VENDOR_INFO` | `GET` | `https://xapi.selldone.com/shops/@{shop}/vendors/{vendor_id}` |
## products

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `@selldone/sdk-storefront/product/get/XapiProductGet.ts:35` | `GET_PRODUCT_INFO` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info` |
| `@selldone/sdk-storefront/product/list/XapiProductList.ts:26` | `GET_PRODUCTS` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/all` |
| `src/Applications/Storefront/pages/comparison/StorefrontPageComparison.vue:125` | `GET_PRODUCTS_LIST` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/list` |
## shop-core

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `@selldone/sdk-storefront/article/tag/requests/Xapi.article.tags.get.ts:21` | `GET_SHOP_ARTICLE_TAGS` | `GET` | `https://xapi.selldone.com/shops/{shop_id}/articles/tags` |
| `@selldone/sdk-storefront/article/tag/requests/xapi.article.tags.put.ts:23` | `PUT_CHANGE_TAG` | `PUT` | `https://xapi.selldone.com/shops/{shop_id}/articles/tags` |
| `@selldone/sdk-storefront/shop/XapiShop.ts:70` | `GET_SHOP_INFO` | `GET` | `https://xapi.selldone.com/shops/@{shop}/info` |
| `@selldone/sdk-storefront/user/requests/xapi.user.fcm.post.ts:19` | `POST_SET_FCM_TOKEN` | `POST` | `https://xapi.selldone.com/shops/@{shop}/fcm/token` |
## support-contact

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `src/Applications/Storefront/pages/official/contact-us/StorefrontPageOfficialContactUs.vue:194` | `POST_CONTACT_US_FORM` | `POST` | `https://xapi.selldone.com/shops/@{shop}/contact-us` |
## unknown

| Source | Builder | Method | Full endpoint |
|---|---|---|---|
| `@selldone/sdk-storefront/article/tag/requests/xapi.article.tags.post.ts:23` | `POST_SET_SHOP_ARTICLE_TAGS` | `UNKNOWN` | `unresolved` |
| `@selldone/sdk-storefront/basket/add-item/XapiBasketAddItem.ts:78` | `PUT_PHYSICAL_ITEM_IN_BASKET` | `UNKNOWN` | `unresolved` |
| `@selldone/sdk-storefront/basket/delete-item/XapiBasketDeleteItem.ts:56` | `DELETE_PHYSICAL_ITEM_FROM_BASKET` | `UNKNOWN` | `unresolved` |
| `@selldone/sdk-storefront/product/rate/submit/XapiProductRateSubmit.ts:45` | `POST_SET_PRODUCT_RATING` | `UNKNOWN` | `unresolved` |
| `@selldone/sdk-storefront/product/subscription/content-list/XapiProductSubscriptionContentList.ts:50` | `GET_PRODUCT_MEMBERSHIP_CONTENTS` | `UNKNOWN` | `unresolved` |
| `src/Applications/Storefront/pages/pos/cart/SStorefrontPOSPage.vue:314` | `GET_ORDER_POS_BASKET_INFO` | `UNKNOWN` | `unresolved` |
| `src/Applications/Storefront/pages/pos/order/StorefrontPagePosOrder.vue:130` | `GET_ORDER_POS_BASKET_INFO` | `UNKNOWN` | `unresolved` |
