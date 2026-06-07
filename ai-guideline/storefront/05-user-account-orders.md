# User Account And Orders

Customer account pages live under `/user`. Auth-required pages must show a login gate and resume the requested route after login. For login modes, guest order history, profile fields, subscribe/leave behavior, and payment/order action details, read `storefront/11-checkout-payment-account-deep-dive.md`.

## Routes

| Route | Purpose |
|---|---|
| `/user` | Account shell. |
| `/user/orders` | Orders parent. |
| `/user/orders/physical` | Physical orders. |
| `/user/orders/virtual` | Virtual orders. |
| `/user/orders/file` | File orders. |
| `/user/orders/service` | Service orders. |
| `/user/orders/subscription` | Subscription orders. |
| `/user/orders/pos` | POS orders. |
| `/user/orders/avocado` | Avocado orders. |
| `/user/profile` | Profile. |
| `/user/addresses` | Address manager. |
| `/user/orders-return` | Return requests. |
| `/user/favorites` | Wishlist/favorites. |
| `/user/comments` | My comments. |
| `/user/gift-cards` | Gift cards. |
| `/user/wallets` | Wallets. |

## Auth

| Action | Endpoint |
|---|---|
| Current user | `GET https://xapi.selldone.com/me` |
| SMS request | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/request` |
| SMS verify | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/verify` |
| Email request | `POST https://xapi.selldone.com/shops/@{shop}/email-login/request` |
| Email verify | `POST https://xapi.selldone.com/shops/@{shop}/email-login/verify` |
| Logout | `POST https://xapi.selldone.com/shops/@{shop}/logout` |

## Order Histories

Use typed history endpoint for order tabs:

`GET https://xapi.selldone.com/shops/@{shop}/basket/orders-{type}`

## Profile Endpoints

| Action | Endpoint |
|---|---|
| Save profile | `POST https://xapi.selldone.com/shops/@{shop}/customer` |
| Leave shop | `POST https://xapi.selldone.com/shops/@{shop}/leave` |
| Subscribe | `POST https://xapi.selldone.com/shops/@{shop}/subscribe` |
| Register FCM | `POST https://xapi.selldone.com/shops/@{shop}/fcm/token` |

## Address Endpoints

| Action | Endpoint |
|---|---|
| List | `GET https://xapi.selldone.com/address/all` |
| Create | `POST https://xapi.selldone.com/address` |
| Update | `PUT https://xapi.selldone.com/address/{address_id}` |
| Delete | `DELETE https://xapi.selldone.com/address/{address_id}` |
| Geo to address | `GET https://xapi.selldone.com/address/gto-to-address` |
| Autocomplete | `GET https://xapi.selldone.com/address/autocomplete` |

## Returns

| Action | Endpoint |
|---|---|
| Return requests | `GET https://xapi.selldone.com/shops/@{shop}/basket/orders/return-requests` |
| Return item | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{item_id}` |
| Upload return file | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{basketItem_id}/temp/upload/{type}` |

## Other Account Areas

| Area | Endpoint |
|---|---|
| My comments | `GET https://xapi.selldone.com/shops/@{shop}/comments` |
| Gift cards | `GET https://xapi.selldone.com/shops/@{shop}/giftcards` |
| Add gift card | `POST https://xapi.selldone.com/shops/@{shop}/giftcards` |
| Wallets | `GET https://xapi.selldone.com/shops/@{shop}/wallets` |

## UI Requirements

- Show account navigation with all enabled sections.
- Gate protected pages before loading protected endpoints.
- Keep order histories split by type.
- Use empty states for no orders, addresses, comments, cards, or wallets.
- Allow address create/edit/delete without leaving checkout context when invoked from checkout.
- Refresh current user after profile changes.

