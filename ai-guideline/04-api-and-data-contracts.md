# API And Data Contracts

The complete endpoint baseline is `_generated/api-url-builders.md` plus `_generated/api-url-builders-supplement.md`. Together they contain 158 URL builders from `@selldone/sdk-storefront/apis/XAPI.ts`, normalized as full URLs where the SDK targets XAPI.

## Base URL

Default public storefront API base:

`https://xapi.selldone.com`

Use runtime `selldone-xapi` only when the environment explicitly overrides it. Do not use backoffice/admin APIs for customer storefront pages.

## Placeholder Rules

| Placeholder | Meaning |
|---|---|
| `@{shop}` | Shop name/handle, including the `@` marker in the path. |
| `{shop_id}` | Numeric shop id for endpoints that require id. |
| `{product_id}` | Product id from route or response. |
| `{type}` | Basket/product type: physical, virtual, file, service, subscription. |
| `{gateway_code}` | Checkout gateway code. |
| `{basket_id}` | Basket/order id. |
| `{hash}` | Avocado token/hash. |

Do not rename placeholders in emitted URLs.

## Auth Classes

| Class | Behavior |
|---|---|
| Public | No customer token required. May still include guest, attribution, localization headers. |
| Optional customer or guest | Works with bearer token or `S-Guest`; required for basket/checkout compatibility. |
| Customer token | Requires `Authorization: Bearer {token}`. |
| `todo-verify` | Present in SDK but backend status is marked uncertain. Verify before production. |

## Bootstrap And Localization

| Data | Endpoint | Notes |
|---|---|---|
| Shop bootstrap | `GET https://xapi.selldone.com/shops/@{shop}/info` | First request. Provides shop, baskets, pending transactions, location, club, order state, guest code, popups. |
| Current user | `GET https://xapi.selldone.com/me` | Use only when token exists; public pages should not depend on it. |
| Language pack | `GET https://xapi.selldone.com/shops/@{shop}/language/{lang}` | Shop language resources. |
| Set currency | `PUT https://xapi.selldone.com/shops/@{shop}/currency` | Persist selected currency. |
| Currency rates | `GET https://xapi.selldone.com/shops/@{shop}/currency/rates` | Display/conversion support. |

## Auth

| Action | Endpoint |
|---|---|
| SMS login request | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/request` |
| SMS login verify | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/verify` |
| Select matched user | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/select-user` |
| Create login user | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/new-user` |
| Email login request | `POST https://xapi.selldone.com/shops/@{shop}/email-login/request` |
| Email login verify | `POST https://xapi.selldone.com/shops/@{shop}/email-login/verify` |
| Logout | `POST https://xapi.selldone.com/shops/@{shop}/logout` |

## Product Listing

| Action | Endpoint | Use |
|---|---|---|
| Main listing/search | `GET https://xapi.selldone.com/shops/@{shop}/products/all` | `/shop`, category, vendor, filters, sorting, search. |
| Product cards | `GET https://xapi.selldone.com/shops/@{shop}/products/cards` | Compact cards, related lists, comparison helpers. |
| Product summaries | `GET https://xapi.selldone.com/shops/@{shop}/products` | Product collection helper. |
| Product comparison | `GET https://xapi.selldone.com/shops/@{shop}/products/compare` | `/comparison` and compare tray. |
| Product search | `GET https://xapi.selldone.com/shops/@{shop}/products/search` | Search suggestions/direct search surfaces. |
| Product map | `GET https://xapi.selldone.com/shops/@{shop}/products/map` | `/map`. |

Common listing response fields used by UI:

| Field | Use |
|---|---|
| `products` | Product grid/list. |
| `folders` | Child category/folder cards. |
| `parent` | Current category/folder and optional page-builder page. |
| `total` | Pagination/load-more. |
| `relation-mode` | Category/product relation behavior. |
| `tax_profile` | Tax display. |
| `valuation` | Custom pricing/valuation behavior. |
| `time_filter` | Availability/time filter behavior. |

## Product Detail

| Action | Endpoint |
|---|---|
| Full product info | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info` |
| Product card | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info-card` |
| Instagram product | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info-instagram` |
| Hyper product | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info-hyper` |
| Product rating | `POST https://xapi.selldone.com/shops/@{shop}/products/{product_id}/set-my-rating` |
| Add wishlist | `PUT https://xapi.selldone.com/shops/@{shop}/products/{product_id}/wishlist` |
| Remove wishlist | `DELETE https://xapi.selldone.com/shops/@{shop}/products/{product_id}/wishlist` |
| Add availability waiting list | `PUT https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-be-available` |
| Remove availability waiting list | `DELETE https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-be-available` |
| Add auction waiting list | `PUT https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-auction` |
| Remove auction waiting list | `DELETE https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-auction` |
| Membership contents | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/contents` |
| Content rating | `POST https://xapi.selldone.com/shops/@{shop}/products/{product_id}/contents/{content_id}/rate` |
| Subscribe | `POST https://xapi.selldone.com/shops/@{shop}/products/{product_id}/subscribe` |
| File temporary URL | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/files/{file_id}` |

## Basket And Checkout

| Action | Endpoint |
|---|---|
| Add/update basket item | `PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}` |
| Delete basket item | `DELETE https://xapi.selldone.com/shops/@{shop}/basket/{product_id}` |
| Basket item message | `POST https://xapi.selldone.com/shops/@{shop}/basket/{product_id}/message` |
| Delete item uploaded file | `DELETE https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/files/{file_id}` |
| Set basket preferences | `PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}/preferences` |
| Basket config | `PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/config` |
| Basket bill | `GET https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill` |
| Buy basket | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/buy/{gateway_code}` |
| Pay seller-priced service bill | `POST https://xapi.selldone.com/shops/@{shop}/basket/{basket_id}/bills/{bill_id}/pay/{gateway}` |
| Submit service basket | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/submit` |
| Set basket location | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_type}/my-location` |
| Receiver info | `PUT https://xapi.selldone.com/shops/@{shop}/basket/{type}/receiver-info` |
| Share basket/order | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/share` |
| Import basket | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/import` |
| Subscription portal | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/portal` |

Checkout data to model:

| Data | Why |
|---|---|
| `items` | Quantity, variant, vendor, preferences, files/messages. |
| `receiver_info` | Receiver/customer data. |
| `delivery_info` | Shipping, pickup, location, time. |
| `billing` | Tax, discounts, shipping, final payable. |
| `discount_code`, coupons | Promotions. |
| `lottery_prizes` | Prize selection/display. |
| `gateway` | Payment method. |
| `guest_email` | Guest communication. |

## Orders And Returns

| Action | Endpoint |
|---|---|
| Basket/order detail | `GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` |
| POS basket detail | `GET https://xapi.selldone.com/shops/@{shop}/pos-baskets/{basket_id}` |
| Typed order history | `GET https://xapi.selldone.com/shops/@{shop}/basket/orders-{type}` |
| Return requests | `GET https://xapi.selldone.com/shops/@{shop}/basket/orders/return-requests` |
| Confirm received | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/confirm-received` |
| Edit receiver info | `PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/receiver-info` |
| Edit billing | `PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/billing` |
| Return item | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{item_id}` |
| Upload return file | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{basketItem_id}/temp/upload/{type}` |
| Order chat add message | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/chat` |
| Order chat delete message | `DELETE https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/chat/{message_index}` |

## Customer Account

| Area | Endpoint |
|---|---|
| Addresses list | `GET https://xapi.selldone.com/address/all` |
| Create address | `POST https://xapi.selldone.com/address` |
| Update address | `PUT https://xapi.selldone.com/address/{address_id}` |
| Delete address | `DELETE https://xapi.selldone.com/address/{address_id}` |
| Geo to address | `GET https://xapi.selldone.com/address/gto-to-address` |
| Autocomplete | `GET https://xapi.selldone.com/address/autocomplete` |
| Save profile | `POST https://xapi.selldone.com/shops/@{shop}/customer` |
| Leave shop | `POST https://xapi.selldone.com/shops/@{shop}/leave` |
| Subscribe profile | `POST https://xapi.selldone.com/shops/@{shop}/subscribe` |
| My comments | `GET https://xapi.selldone.com/shops/@{shop}/comments` |
| My gift cards | `GET https://xapi.selldone.com/shops/@{shop}/giftcards` |
| Add gift card | `POST https://xapi.selldone.com/shops/@{shop}/giftcards` |
| My wallets | `GET https://xapi.selldone.com/shops/@{shop}/wallets` |
| Register FCM | `POST https://xapi.selldone.com/shops/@{shop}/fcm/token` |

## Content

| Area | Endpoint |
|---|---|
| Shop blogs | `GET https://xapi.selldone.com/shops/@{shop}/blogs` |
| Blog detail | `GET https://xapi.selldone.com/shops/@{shop}/blogs/{blog_id}` |
| Official profile | `GET https://xapi.selldone.com/shops/@{shop}/profiles/{type}` |
| Contact form | `POST https://xapi.selldone.com/shops/@{shop}/contact-us` |
| FAQ tags | `GET https://xapi.selldone.com/shops/@{shop}/faq/tags` |
| FAQ list | `GET https://xapi.selldone.com/shops/@{shop}/faq` |
| FAQ question | `POST https://xapi.selldone.com/shops/@{shop}/faq/question` |
| Page data | `GET https://xapi.selldone.com/shops/@{shop}/pages/{page_name}` |
| Include page data | `GET https://xapi.selldone.com/shops/@{shop}/includes/{include_id}` |
| Page view stats | `POST https://xapi.selldone.com/shops/@{shop}/pages/{page_id}/view` |
| Link preview | `GET https://xapi.selldone.com/link-preview` |

## Article Interactions

| Action | Endpoint |
|---|---|
| Like article | `POST https://xapi.selldone.com/articles/{article_id}/like` |
| Star article | `POST https://xapi.selldone.com/articles/{article_id}/star` |
| Claps | `POST https://xapi.selldone.com/articles/{article_id}/claps` |
| Report | `POST https://xapi.selldone.com/articles/{article_id}/report/{category}` |
| Add comment | `POST https://xapi.selldone.com/article/{article_id}/comment` |

## Special Flows

| Flow | Endpoint |
|---|---|
| Open avocado | `GET https://xapi.selldone.com/shops/@{shop}/avocado` |
| Avocado history | `GET https://xapi.selldone.com/shops/@{shop}/avocados` |
| Add avocado item | `POST https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/items` |
| Reserve avocado | `POST https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/reserve` |
| Avocado customer info | `GET https://xapi.selldone.com/shops/@{shop}/avocado/{hash}` |
| Update avocado customer info | `PUT https://xapi.selldone.com/shops/@{shop}/avocado/{hash}` |
| Pay avocado | `POST https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/pay/{gateway}` |
| Avocado order info | `GET https://xapi.selldone.com/shops/@{shop}/avo-baskets/{avocado_id}` |
| Open hyper | `GET https://xapi.selldone.com/shops/@{shop}/hyper` |
| Add hyper item | `POST https://xapi.selldone.com/shops/@{shop}/hyper/items` |
| Delete hyper item | `DELETE https://xapi.selldone.com/shops/@{shop}/hyper/items/{item_id}` |
| Hyper history | `GET https://xapi.selldone.com/shops/@{shop}/hypers` |
| Pay hyper | `POST https://xapi.selldone.com/shops/@{shop}/hyper/{basket_id}/pay/{gateway}` |
| Hyper basket | `GET https://xapi.selldone.com/shops/@{shop}/hyper/{basket_id}` |
| Instagram channel | `GET https://xapi.selldone.com/shops/@{shop}/channels/instagram` |
| Vendors list | `GET https://xapi.selldone.com/shops/@{shop}/vendors` |
| Vendor info | `GET https://xapi.selldone.com/shops/@{shop}/vendors/{vendor_id}` |
| Vendor page | `GET https://xapi.selldone.com/shops/@{shop}/vendors/{vendor_id}/page` |

## Listing Directory

| Action | Endpoint | Status |
|---|---|---|
| Listing info | `GET https://xapi.selldone.com/shops/@{shop}/listing/info` | Active in SDK. |
| Listing categories | `GET https://xapi.selldone.com/shops/@{shop}/listing/categories` | Active in SDK. |
| Listing items | `GET https://xapi.selldone.com/shops/@{shop}/listing/items` | Active in SDK. |
| Listing item | `GET https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}` | Active in SDK. |
| Listing reviews | `GET https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}/reviews` | Active in SDK. |
| Post review | `POST https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}/reviews` | Active in SDK. |
| Delete review | `DELETE https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}/reviews/{review_id}` | Active in SDK. |
| Listing badges | `GET https://xapi.selldone.com/shops/@{shop}/listing/badges` | Active in SDK. |
| Listing compare | `GET https://xapi.selldone.com/shops/@{shop}/listing/compare` | SDK local `/xapi` route normalized to full URL. |
| Listing message | `POST https://xapi.selldone.com/shops/@{shop}/listing/messages` | `todo-verify`. |
| Listing search | `GET https://xapi.selldone.com/shops/@{shop}/listing/search` | `todo-verify`. |

## Full Catalog Requirement

For any endpoint not summarized here, read `_generated/api-url-builders.md` and `_generated/api-url-builders-supplement.md`. They are the complete endpoint baseline for this guide.

