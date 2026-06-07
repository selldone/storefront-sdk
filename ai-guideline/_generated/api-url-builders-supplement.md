# Storefront XAPI URL Builders Supplement

This supplement was extracted from `@selldone/sdk-storefront/apis/XAPI.ts` by scanning URL builder method bodies after the first endpoint catalog pass. Use it together with `_generated/api-url-builders.md`.

Rules:

- These endpoints are real SDK URL builders even if they were missing from the first generated catalog.
- Use full `https://xapi.selldone.com` endpoints exactly as shown, except rows explicitly marked as runtime-domain.
- Item-level basket add/delete/message/preferences use `{product_id}` in the path and `variant_id` in body/query.
- Basket file delete uses `{basket_id}` and `{file_id}`.

Total supplement builders: 39

| Builder | Method | Full endpoint | Notes | Source |
|---|---|---|---|---|
| `GET_PRODUCT_INFO_CARD(shop_name, product_id)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info-card` | Product card/detail helper. | `@selldone/sdk-storefront/apis/XAPI.ts:784` |
| `GET_PRODUCT_INFO_INSTAGRAM(shop_name, product_id)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info-instagram` | Instagram product info. | `@selldone/sdk-storefront/apis/XAPI.ts:829` |
| `GET_PRODUCT_INFO_HYPER(shop_name, product_id)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info-hyper` | Hyper product info. | `@selldone/sdk-storefront/apis/XAPI.ts:874` |
| `POST_SET_PRODUCT_RATING(shop_name, product_id)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/set-my-rating` | Product rating submit. | `@selldone/sdk-storefront/apis/XAPI.ts:919` |
| `PUT_PHYSICAL_ITEM_IN_BASKET(shop_name, product_id)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/basket/{product_id}` | Add/update basket item. Body carries `variant_id`, `count`, `preferences`, `vendor_product_id`, `price_id`, `currency`. | `@selldone/sdk-storefront/apis/XAPI.ts:966` |
| `DELETE_PHYSICAL_ITEM_FROM_BASKET(shop_name, product_id)` | `DELETE` | `https://xapi.selldone.com/shops/@{shop}/basket/{product_id}` | Remove basket item. Query/body carries `variant_id` when needed. | `@selldone/sdk-storefront/apis/XAPI.ts:1011` |
| `POST_BASKET_ITEM_MESSAGE(shop_name, product_id)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/basket/{product_id}/message` | Basket item customer message; SDK comment says PUT is also supported. | `@selldone/sdk-storefront/apis/XAPI.ts:1056` |
| `DELETE_BASKET_ITEM_FILE(shop_name, basket_id, file_id)` | `DELETE` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/files/{file_id}` | Delete uploaded/file attachment from basket. | `@selldone/sdk-storefront/apis/XAPI.ts:1103` |
| `PUT_BASKET_ITEM_PREFERENCES(shop_name, product_id)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/basket/{product_id}/preferences` | Update preferences for an existing basket item. Body includes `basket_id`, `variant_id`, `preferences`. | `@selldone/sdk-storefront/apis/XAPI.ts:1149` |
| `POST_PAY_BILL(shop_name, basket_id, bill_id, gateway)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/basket/{basket_id}/bills/{bill_id}/pay/{gateway}` | Pay seller-priced service bill. | `@selldone/sdk-storefront/apis/XAPI.ts:1325` |
| `PUT_ORDER_EDIT_RECEIVER_INFO(shop_name, basket_id)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/receiver-info` | Edit receiver info after order creation where allowed. | `@selldone/sdk-storefront/apis/XAPI.ts:1456` |
| `POST_BASKET_GENERATE_SHARE_LINK(shop_name, basket_id)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/share` | Generate share link for basket/order. | `@selldone/sdk-storefront/apis/XAPI.ts:1501` |
| `POST_BASKET_CREATE_SUBSCRIPTION_PORTAL_URL(shop_name, basket_id)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/portal` | Subscription portal URL for purchased subscription basket. | `@selldone/sdk-storefront/apis/XAPI.ts:1590` |
| `GET_ORDER_POS_BASKET_INFO(shop_name, basket_id)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/pos-baskets/{basket_id}` | POS order detail. | `@selldone/sdk-storefront/apis/XAPI.ts:1679` |
| `POST_ORDER_BASKET_CONFIRM_RECEIVED(shop_name, basket_id)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/confirm-received` | Customer confirms received. | `@selldone/sdk-storefront/apis/XAPI.ts:1724` |
| `PUT_ORDER_EDIT_BILLING(shop_name, basket_id)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/billing` | Edit billing data where allowed. | `@selldone/sdk-storefront/apis/XAPI.ts:1769` |
| `POST_BASKET_ITEM_RETURN_REQUEST(shop_name, basket_id, item_id)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{item_id}` | Return request for one basket item. | `@selldone/sdk-storefront/apis/XAPI.ts:1898` |
| `GENERATE_DOWNLOAD_PRODUCT_FILE_TEMP_URL(shop_name, product_id, file_id)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/files/{file_id}` | Temporary file download URL. | `@selldone/sdk-storefront/apis/XAPI.ts:1945` |
| `PUT_TO_WAITING_FOR_BE_AVAILABLE(shop_id, product_id)` | `PUT` | `https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-be-available` | Add availability waiting request. | `@selldone/sdk-storefront/apis/XAPI.ts:2078` |
| `DELETE_FROM_WAITING_FOR_BE_AVAILABLE(shop_id, product_id)` | `DELETE` | `https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-be-available` | Remove availability waiting request. | `@selldone/sdk-storefront/apis/XAPI.ts:2123` |
| `PUT_TO_WAITING_FOR_AUCTION(shop_id, product_id)` | `PUT` | `https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-auction` | Add auction waiting request. | `@selldone/sdk-storefront/apis/XAPI.ts:2168` |
| `DELETE_FROM_WAITING_FOR_AUCTION(shop_id, product_id)` | `DELETE` | `https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-auction` | Remove auction waiting request. | `@selldone/sdk-storefront/apis/XAPI.ts:2213` |
| `DELETE_WISHLIST_PRODUCT(shop_name, product_id)` | `DELETE` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/wishlist` | Remove wishlist product. | `@selldone/sdk-storefront/apis/XAPI.ts:2301` |
| `GET_PENDING_PAYMENT_INFO(shop_name, gateway, transaction_id)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/gateways/{gateway}/{transaction_id}` | Resolve pending payment and continue/refresh payment flow. | `@selldone/sdk-storefront/apis/XAPI.ts:2688` |
| `GET_PAYMENT_STATUS_INTERVAL(shop_name, gateway, transaction_id, unique_id)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/gateways/{gateway}/transactions/{transaction_id}/{unique_id}` | Poll interval-payment status. | `@selldone/sdk-storefront/apis/XAPI.ts:2736` |
| `POST_UPLOAD_RETURN_REQUEST_FILE(shop_name, basket_id, basketItem_id, type)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{basketItem_id}/temp/upload/{type}` | Upload return request file. | `@selldone/sdk-storefront/apis/XAPI.ts:2838` |
| `GET_CHECK_SHOP_STRIPE_PAYMENT_INTENT(shop_name, paymentIntent_id)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/gateways/stripe/{paymentIntent_id}/check` | Stripe payment intent check. | `@selldone/sdk-storefront/apis/XAPI.ts:3224` |
| `POST_UPLOAD_DIRECT_PAYMENT_RECEIPT(shop_name, transaction_id, currency)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/transactions/{transaction_id}/receipt/{currency}` | Upload direct payment receipt. | `@selldone/sdk-storefront/apis/XAPI.ts:3315` |
| `PUT_SHOP_TICKET_UPDATE_MESSAGE(shop_name, contact_id)` | `PUT` | `https://xapi.selldone.com/shops/@{shop}/contacts/{contact_id}` | Contact/ticket update. | `@selldone/sdk-storefront/apis/XAPI.ts:4149` |
| `DELETE_SHOP_TICKET_MESSAGE_RESPONSE(shop_name, contact_id, index)` | `DELETE` | `https://xapi.selldone.com/shops/@{shop}/contacts/{contact_id}/{index}` | Delete contact/ticket response. | `@selldone/sdk-storefront/apis/XAPI.ts:4196` |
| `DELETE_OPEN_AVOCADO_ITEM(shop_name, hash, item_id)` | `DELETE` | `https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/items/{item_id}` | Delete avocado item. | `@selldone/sdk-storefront/apis/XAPI.ts:4494` |
| `POST_TRANSLATE_PRODUCT_ARTICLE(shop_id, product_id)` | `POST` | `https://xapi.selldone.com/shops/{shop_id}/products/{product_id}/translate-article` | Product article translation. | `@selldone/sdk-storefront/apis/XAPI.ts:5133` |
| `POST_SET_SHOP_ARTICLE_TAGS(shop_id, article_id)` | `POST` | `https://xapi.selldone.com/shops/{shop_id}/articles/tags/{article_id}` | Article tag update. | `@selldone/sdk-storefront/apis/XAPI.ts:5645` |
| `POST_CUSTOMER_BASKET_CHAT_ADD_MESSAGE(shop_name, basket_id)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/chat` | Customer order chat add message. | `@selldone/sdk-storefront/apis/XAPI.ts:5856` |
| `DELETE_CUSTOMER_BASKET_CHAT_MESSAGE(shop_name, basket_id, message_index)` | `DELETE` | `https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/chat/{message_index}` | Customer order chat delete message. | `@selldone/sdk-storefront/apis/XAPI.ts:5902` |
| `GET_PRODUCT_MEMBERSHIP_CONTENTS(shop_name, product_id)` | `GET` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/contents` | Subscription membership contents. | `@selldone/sdk-storefront/apis/XAPI.ts:6116` |
| `POST_PRODUCT_MEMBERSHIP_CONTENTS_SEND_MY_RATING(shop_name, product_id, content_id)` | `POST` | `https://xapi.selldone.com/shops/@{shop}/products/{product_id}/contents/{content_id}/rate` | Membership content rating. | `@selldone/sdk-storefront/apis/XAPI.ts:6162` |
| `POST_STREAM_USER_ADD(domain, shop_id, key)` | `POST` | `{domain}/shops/{shop_id}/audience/{key}` | Runtime-domain audience endpoint; not fixed to XAPI base. | `@selldone/sdk-storefront/apis/XAPI.ts:6217` |
| `POST_STREAM_USER_ADD_NEWSLETTER(shop_id, key)` | `POST` | `https://xapi.selldone.com/shops/{shop_id}/audience/{key}` | Newsletter/audience endpoint. | `@selldone/sdk-storefront/apis/XAPI.ts:6262` |
