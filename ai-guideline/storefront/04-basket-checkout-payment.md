# Basket, Checkout, Payment, And Orders

Checkout is type-aware and session-aware. Support authenticated and guest customers when shop settings allow guest checkout. For exact checkout form, shipping package, payment dialog, order history, login, and profile behavior, read `storefront/11-checkout-payment-account-deep-dive.md`.

## Routes

| Route | Purpose |
|---|---|
| `/basket/:type` | Active basket/cart/checkout by product type. |
| `/orders/physical/SM-:basket_id` | Physical order detail. |
| `/orders/virtual/SV-:basket_id` | Virtual order detail. |
| `/orders/file/SF-:basket_id` | File order detail. |
| `/orders/service/SS-:basket_id` | Service order detail. |
| `/orders/subscription/SN-:basket_id` | Subscription order detail. |
| `/orders/pos/POS-:basket_id` | POS order detail. |
| `/orders/avocado/AVO-:basket_id` | Avocado order detail. |

## Basket Types

| Type | Checkout requirements |
|---|---|
| `physical` | Receiver/address, shipping, delivery/pickup, tax, payment. |
| `virtual` | Receiver/contact info, virtual delivery, payment. |
| `file` | Payment and post-payment download/access. |
| `service` | Preferences, messages/files, submit or payment depending on config. |
| `subscription` | Plan/period, recurring payment/portal support. |

## Core Endpoints

| Action | Endpoint |
|---|---|
| Add/update item | `PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}` |
| Delete item | `DELETE https://xapi.selldone.com/shops/@{shop}/basket/{product_id}` |
| Item message | `POST https://xapi.selldone.com/shops/@{shop}/basket/{product_id}/message` |
| Delete item file | `DELETE https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/files/{file_id}` |
| Preferences | `PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}/preferences` |
| Basket config | `PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/config` |
| Basket bill | `GET https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill` |
| Buy basket | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/buy/{gateway_code}` |
| Pay seller-priced service bill | `POST https://xapi.selldone.com/shops/@{shop}/basket/{basket_id}/bills/{bill_id}/pay/{gateway}` |
| Submit service | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/submit` |
| Set my location | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_type}/my-location` |
| Receiver info | `PUT https://xapi.selldone.com/shops/@{shop}/basket/{type}/receiver-info` |
| Share basket | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/share` |
| Import basket | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/import` |
| Subscription portal | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/portal` |

## Checkout State Machine

1. Load basket from bootstrap state or refresh if missing.
2. Validate all items: stock, variant, vendor, preferences, required messages/files.
3. Collect receiver/customer information.
4. Collect shipping/location/delivery data where required.
5. Save basket config and receiver info.
6. Call basket bill endpoint.
7. Apply discount/coupon/lottery/offer state.
8. Select gateway/payment method.
9. Buy basket or submit service basket.
10. Handle redirect/callback/pending transaction.
11. Navigate to typed order detail route.

## Bill Handling

Use backend bill as source of truth:

`GET https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill`

Render subtotal, discounts, coupon, shipping, tax, wallet/gift card effects, lottery/offer effects, and final payable when present.

## Payment Handling

| Payment path | Endpoint |
|---|---|
| Normal basket buy | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/buy/{gateway_code}` |
| Pay existing service bill | `POST https://xapi.selldone.com/shops/@{shop}/basket/{basket_id}/bills/{bill_id}/pay/{gateway}` |
| Avocado payment | `POST https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/pay/{gateway}` |
| Hyper payment | `POST https://xapi.selldone.com/shops/@{shop}/hyper/{basket_id}/pay/{gateway}` |

After payment, handle redirect URL or inline payment response, preserve pending transaction state, refresh order detail after callback, and show retry/gateway change on failure.

## Order Detail Endpoints

| Order | Endpoint |
|---|---|
| Standard basket order | `GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` |
| POS order | `GET https://xapi.selldone.com/shops/@{shop}/pos-baskets/{basket_id}` |
| Avocado order | `GET https://xapi.selldone.com/shops/@{shop}/avo-baskets/{avocado_id}` |

## Customer Order Actions

| Action | Endpoint |
|---|---|
| Confirm received | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/confirm-received` |
| Edit receiver info | `PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/receiver-info` |
| Edit billing | `PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/billing` |
| Return item | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{item_id}` |
| Upload return file | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{basketItem_id}/temp/upload/{type}` |
| Add order chat message | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/chat` |
| Delete order chat message | `DELETE https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/chat/{message_index}` |

## Guest Checkout

- Store `guest_code` from bootstrap.
- Send it as `S-Guest` on basket/checkout requests.
- Collect guest email when required.
- Do not require `/user` authentication unless shop settings or route requires it.
- After login, refresh baskets and reconcile guest basket from backend response.

## Failure States

Handle empty basket, unavailable item, missing address/receiver, invalid shipping, changed bill, unavailable gateway, canceled payment, pending payment, auth required, and guest checkout not allowed.

