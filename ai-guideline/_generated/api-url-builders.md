# Generated Storefront XAPI URL Builders

Generated from `@selldone/sdk-storefront/apis/XAPI.ts`. Use these full URLs when implementing a custom storefront. Default base is `https://xapi.selldone.com`.

Rules:
- Copy the full endpoint, method, and parameter placeholders exactly.
- Do not invent REST paths. If an endpoint is marked `todo`, verify backend availability before production use.
- SDK methods returning local `/xapi/...` are normalized here to `https://xapi.selldone.com/...` for framework-independent clients.

Total builders: 119

## address

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_MY_ADDRESSES()` | `GET` | `https://xapi.selldone.com/address/all` | Customer token (`auth:api`); route is imported from `routes/modules/address.php`. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3363` |
| `DELETE_MY_ADDRESSES(address_id: string | number)` | `DELETE` | `https://xapi.selldone.com/address/{address_id}` | Customer token (`auth:api`); route is imported from `routes/modules/address.php`. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3404` |
| `PUT_ADDRESS(address_id: string | number)` | `PUT` | `https://xapi.selldone.com/address/{address_id}` | Customer token (`auth:api`); route is imported from `routes/modules/address.php`. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3445` |
| `POST_ADDRESS()` | `POST` | `https://xapi.selldone.com/address` | Customer token (`auth:api`); route is imported from `routes/modules/address.php`. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3486` |
| `GET_GEO_TO_ADDRESS()` | `GET` | `https://xapi.selldone.com/address/gto-to-address` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3526` |
| `GET_AUTOCOMPLETE()` | `GET` | `https://xapi.selldone.com/address/autocomplete` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3566` |
## articles-blog-content

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_SHOP_BLOGS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/blogs` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2601` |
| `GET_SHOP_BLOG_DATA(shop_name: string, blog_id: number | string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/blogs/{blog_id}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3651` |
| `POST_SHOP_CONVERTER_WORD_HTML(shop_id: string | number)` | `POST` | `https://xapi.selldone.com/shops/{shop_id}/converter/word/html` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5091` |
| `POST_LIKE_ARTICLE(article_id: string | number)` | `POST` | `https://xapi.selldone.com/articles/{article_id}/like` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5179` |
| `POST_STAR_ARTICLE(article_id: string | number)` | `POST` | `https://xapi.selldone.com/articles/{article_id}/star` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5220` |
| `POST_CLAPS_OF_ARTICLE(article_id: string | number)` | `POST` | `https://xapi.selldone.com/articles/{article_id}/claps` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5261` |
| `POST_REPORT_ARTICLE(article_id: string | number, report: number)` | `POST` | `https://xapi.selldone.com/articles/{article_id}/report/{category}` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5303` |
| `GET_SHOP_ARTICLES_TIMELINE(shop_id: string | number)` | `GET` | `https://xapi.selldone.com/shops/{shop_id}/timeline/articles` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5345` |
| `POST_ADD_EDIT_ARTICLE(type: string)` | `POST` | `https://xapi.selldone.com/article/{type}/edit` | Customer token (`auth:api`). `type` dispatches to `product` or `shop-blog` routes. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5387` |
| `UPLOAD_ARTICLE_IMAGE(type: string, extra = null)` | `POST` | `https://xapi.selldone.com/article/product/upload/{shop_id}` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5436` |
| `UPLOAD_ARTICLE_BLOG_IMAGE(shop_id: string | number)` | `POST` | `https://xapi.selldone.com/shops/{shop_id}/blogs/upload` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5478` |
| `DELETE_ARTICLE(type: string, article_id: string | number)` | `DELETE` | `https://xapi.selldone.com/article/{type}/{article_id}` | Customer token (`auth:api`). `type` dispatches to `product` or `shop-blog` routes. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5521` |
| `POST_ADD_COMMENT(article_id: string | number)` | `POST` | `https://xapi.selldone.com/article/{article_id}/comment` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5691` |
## auth

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `SHOP_LOGIN_REQUEST(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/sms-login/request` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:74` |
| `SHOP_LOGIN_VERIFY(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/sms-login/verify` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:114` |
| `SHOP_LOGIN_SELECT_USER(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/sms-login/select-user` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:154` |
| `SHOP_LOGIN_NEW_USER(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/sms-login/new-user` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:194` |
| `POST_SHOP_LOGIN_EMAIL_REQUEST(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/email-login/request` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:235` |
| `POST_SHOP_LOGIN_EMAIL_VERIFY(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/email-login/verify` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:275` |
| `LOGOUT(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/logout` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:366` |
## auth-user

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_USER()` | `GET` | `https://xapi.selldone.com/me` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:325` |
## avocado

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_CUSTOMER_OPEN_AVOCADO(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/avocado` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4369` |
| `GET_CUSTOMER_HISTORY_AVOCADOS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/avocados` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4410` |
| `POST_ADD_OPEN_AVOCADO_ITEM(shop_name: string, hash: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/items` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4452` |
| `POST_RESERVE_AVOCADO(shop_name: string, hash: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/reserve` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4541` |
| `GET_CUSTOMER_INFO_FOR_AVOCADO(shop_name: string, hash: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/avocado/{hash}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4582` |
| `PUT_SET_CUSTOMER_INFO_FOR_AVOCADO(shop_name: string, hash: string)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/avocado/{hash}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4623` |
| `POST_PAY_AVOCADO(shop_name: string, hash: string, gateway: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/pay/{gateway}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4665` |
## basket-orders-checkout

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `PUT_SET_BASKET_CONFIG(shop_name: string, basket_id: string | number)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/config` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:1197` |
| `GET_BASKET_BILL(shop_name: string, type: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:1239` |
| `POST_BUY_BASKET(shop_name: string, type: string, gateway: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/basket/{type}/buy/{gateway_code}` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:1282` |
| `POST_SUBMIT_SERVICE_BASKET(shop_name: string, type: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/basket/{type}/submit` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:1373` |
| `POST_SET_MY_LOCATION(shop_name: string, type: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_type}/my-location` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:1415` |
| `POST_BASKET_IMPORT(shop_name: string, type: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/basket/{type}/import` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:1547` |
| `GET_ORDER_BASKET_INFO(shop_name: string, basket_id: string | number)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:1638` |
| `GET_MY_ORDERS_HISTORY_PHYSICAL(shop_name: string, type: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/basket/orders-{type}` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:1815` |
| `GET_MY_BASKET_ITEM_RETURNS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/basket/orders/return-requests` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:1856` |
| `GET_ORDER_AVOCADO_BASKET_INFO(shop_name: string, avocado_id: number)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/avo-baskets/{avocado_id}` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4707` |
| `GET_CUSTOMER_OPEN_HYPER(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/hyper` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4749` |
| `POST_ADD_OPEN_HYPER_ITEM(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/hyper/items` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4790` |
| `GET_CUSTOMER_HISTORY_HYPERS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/hypers` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4831` |
| `POST_PAY_HYPER(shop_name: string, gateway: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/hyper/pay/{gateway}` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4873` |
| `DELETE_OPEN_HYPER_ITEM(shop_name: string, item_id: string | number)` | `DELETE` | `https://xapi.selldone.com/shops/@{shop}/hyper/items/{item_id}` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4915` |
| `GET_CUSTOMER_INFO_FOR_HYPER(shop_name: string, hyper_id: string | number)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/hyper/{hyper_id}` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4957` |
## channels

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_INSTAGRAM_DATA(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/channels/instagram` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4327` |
## content-pages

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_SHOP_PROFILE(shop_name: string, type: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/profiles/{type}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:613` |
| `GET_CUSTOM_HOME_PAGE(shop_name: string, page_id: string | number)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/home/default` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3050` |
| `GET_PAGE_DATA(shop_name: string, page_name:string|null = "")` | `GET` | `https://xapi.selldone.com/shops/@{shop}/pages/{page_name?}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3097` |
| `GET_PAGE_STATISTIC(shop_name: string, page_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/pages/{page_id}/statistic` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3140` |
| `GET_INCLUDE_PAGE_DATA(shop_name: string, include_id = "")` | `GET` | `https://xapi.selldone.com/shops/@{shop}/includes/{include_id}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3181` |
## customer-account

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `POST_LEAVE_SHOP(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/leave` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:447` |
| `POST_SUBSCRIBE(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/subscribe` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:488` |
| `POST_SAVE_MY_CUSTOMER_PROFILE(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/customer` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:529` |
| `GET_MY_COMMENTS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/comments` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2348` |
| `GET_MY_GIFT_CARDS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/giftcards` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2391` |
| `GET_MY_GIFT_CARDS_LIST(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/giftcards/list` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2432` |
| `POST_ADD_GIFT_CARDS(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/giftcards` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2473` |
| `GET_MY_WALLETS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/wallets` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2516` |
| `PUT_SET_USER_CURRENCY(shop_name: string)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/currency` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4066` |
## faq

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_FAQ_TAGS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/faqs/tags` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2927` |
| `GET_FAQ(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/faqs` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2967` |
| `POST_SEND_QUESTION(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/faqs` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3008` |
## incentives

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `PUT_DISCOUNT_CODE(shop_name: string)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/discount-code` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2559` |
| `GET_FETCH_COUPONS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/coupons` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3734` |
| `GET_COUPONS_BY_CODE(shop_name: string, code: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/coupons/{coupon_code}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3775` |
| `PUT_SET_BASKET_COUPON(shop_name: string)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/coupon` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3815` |
| `GET_FETCH_OFFERS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/offers` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3857` |
| `GET_FETCH_LOTTERIES(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/lottery` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3900` |
| `POST_FETCH_LOTTERIES(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/lottery/play` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3941` |
| `GET_FETCH_LOTTERY_WINS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/lottery/wins` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3982` |
| `PUT_SET_BASKET_LOTTERY(shop_name: string)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/lottery` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4023` |
| `GET_SHOP_CASHBACK_PROGRAM(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/cashback` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6350` |
## link-preview

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_LINK_PREVIEW()` | `GET` | `https://xapi.selldone.com/iframe/preview` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3692` |
## listing-directory

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_SHOP_LISTING_INFO(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/listing` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6403` |
| `GET_SHOP_LISTING_CATEGORIES(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/listing/categories` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6443` |
| `GET_SHOP_LISTING_ITEMS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/listing/items` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6483` |
| `GET_SHOP_LISTING_ITEM(shop_name: string, item_id: string | number)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6524` |
| `GET_SHOP_LISTING_ITEM_REVIEWS(shop_name: string, item_id: string | number)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}/reviews` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6568` |
| `POST_SHOP_LISTING_ITEM_REVIEW(shop_name: string, item_id: string | number)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}/reviews` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6610` |
| `DELETE_SHOP_LISTING_ITEM_REVIEW(shop_name: string, item_id: string | number)` | `DELETE` | `https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}/reviews` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6652` |
| `POST_SHOP_LISTING_MESSAGE(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/listing/messages` | TODO: No active XAPI route found. Active backend route only accepts item-level messages at `/listing/items/{item}/messages`. | todo-verify | `@selldone/sdk-storefront/apis/XAPI.ts:6696` |
| `POST_SHOP_LISTING_ITEM_MESSAGE(shop_name: string, item_id: number | string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/listing/items/{item}/messages` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6738` |
| `GET_SHOP_LISTING_ITEMS_COMPARE(shop: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/listing/compare` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6780` |
| `GET_SHOP_LISTING_SEARCH(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/listing/search` | TODO: No active storefront XAPI route found. Dashboard search-settings controllers exist under `App\Http\Controllers\Selldone\Listing\Search`, but are not registered in `routes/xapi.php`. | todo-verify | `@selldone/sdk-storefront/apis/XAPI.ts:6827` |
| `GET_SHOP_LISTING_ITEM_BADGES(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/listing/badges` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6872` |
## localization

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_EXCHANGE_RATES(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/exchange/rates` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:406` |
| `GET_SHOP_LANGUAGE_PACK(shop_name: string, language: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/languages/{language}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6308` |
## marketplace-vendors

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_VENDORS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/vendors` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5949` |
| `GET_VENDOR_INFO(shop_name: string, vendor_id: number | string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/vendors/{vendor_id}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5990` |
| `GET_VENDOR_PAGE_DATA(shop_name: string, vendor_id = "")` | `GET` | `https://xapi.selldone.com/shops/@{shop}/vendors/{vendor_id}/page` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6031` |
## payment

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_PAYPAL_CLIENT_TOKEN(shop_name: string, currency: keyof typeof Currency)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/gateways/paypal/client-token/{currency}` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3271` |
| `POST_PAYMENTS_PAYPAL_STANDARD_VERIFY(shop_name: string)` | `POST` | `https://xapi.selldone.com/paypal-standard/@{shop}/verify` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5002` |
## products

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_PRODUCTS(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/all` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:658` |
| `GET_PRODUCTS_LIST(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/list` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:701` |
| `GET_PRODUCT_INFO(shop_name: string, product_id: string | number)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:743` |
| `GET_SEARCH_QUERY(shop_name: string, query: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/search/suggestion/{text}` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2035` |
| `PUT_WISHLIST_PRODUCT(shop_name: string, product_id: string | number)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/wishlist` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2260` |
| `POST_SUBSCRIBE_NOW(shop_name: string, product_id: number | string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/subscribe` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:6075` |
## shop-core

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_SHOP_INFO(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/info` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:572` |
| `POST_SET_FCM_TOKEN(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/fcm/token` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2644` |
| `POST_SET_SHOP_APP_STATUS_BY_CUSTOMER(shop_name: string, app_code: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/apps/{app_code}/status` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2784` |
| `GET_SHOP_BLOG_CATEGORIES(shop_id: number | string)` | `GET` | `https://xapi.selldone.com/shops/{shop_id}/blog/categories` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:3610` |
| `GET_ARTICLE_SEO_AUDIT(shop_id: number | string, article_id: string | number)` | `GET` | `https://xapi.selldone.com/shops/{shop_id}/seo-audit/articles/{article_id}` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5049` |
| `GET_SHOP_ARTICLE_TAGS(shop_id: string | number)` | `GET` | `https://xapi.selldone.com/shops/{shop_id}/articles/tags` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5563` |
| `PUT_CHANGE_TAG(shop_id: string | number)` | `PUT` | `https://xapi.selldone.com/shops/{shop_id}/articles/tags` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5604` |
| `PUT_UPDATE_COMMENT(comment_id: string | number)` | `PUT` | `https://xapi.selldone.com/comment/{comment_id}` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5732` |
| `DELETE_COMMENT(comment_id: string | number)` | `DELETE` | `https://xapi.selldone.com/comment/{comment_id}` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5773` |
| `POST_FOLLOW_USER(user_id: string | number)` | `POST` | `https://xapi.selldone.com/user/follow/{following_user_id}` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:5815` |
## support-contact

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `POST_CONTACT_US_FORM(shop_name: string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/contact-us` | Public. The global `customer-access` middleware may attach guest/customer context when available. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:2886` |
| `GET_SHOP_TICKETS_LIST(shop_name: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/contacts` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4108` |
| `POST_SHOP_TICKET_CLOSE(shop_name: string, contact_id: number | string)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/contacts/{contact_id}/close` | Customer token (`auth:api`). | todo-verify | `@selldone/sdk-storefront/apis/XAPI.ts:4243` |
| `PUT_SHOP_TICKET_RATE(shop_name: string, contact_id: number | string)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/contacts/{contact_id}/rate` | Customer token (`auth:api`). | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:4285` |
## tax-location

| Builder | Method | Full endpoint | Auth | Status | Source |
|---|---|---|---|---|---|
| `GET_TAX_REGIONS(shop_name: string, country: string)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/tax/{country}/regions` | Optional customer token or guest session. This route is registered in both public and `auth:api` groups. | active-or-sdk-defined | `@selldone/sdk-storefront/apis/XAPI.ts:1992` |
