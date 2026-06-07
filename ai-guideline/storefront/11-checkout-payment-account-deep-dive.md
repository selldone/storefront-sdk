# Checkout, Payment, Orders, Login, And Account Deep Dive

This deep-dive is extracted from the production basket page, payment dialog, order list, login components, and profile page. Use it to build a full storefront that can really checkout, pay, recover pending payments, show orders, and manage customer profile.

## Source Trace

| Source | What to extract |
|---|---|
| `src/Applications/Storefront/pages/basket/cart/StorefrontPageBasketCart.vue` | Basket UI, bill loading, receiver, shipping, guest email, billing, custom form, payment entry, service submit. |
| `@selldone/components-vue/storefront/order/checkout/SOrderCheckoutForm.vue` | Dynamic checkout form from shop options and country override. |
| `@selldone/components-vue/storefront/order/billing/SShopBillingAddressForm.vue` | Billing form, business tax id, tax region loading. |
| `@selldone/components-vue/storefront/order/shipping/vendor/*` | Marketplace vendor package shipping options. |
| `@selldone/components-vue/storefront/order/shipping/store/*` | Store/multi-warehouse package shipping options. |
| `@selldone/components-vue/storefront/payment/SStorefrontMasterPaymentDialog.vue` | Payment event bus, gateway selection, pending transactions, redirect/onsite/QR/COD/free/gift-card flows. |
| `src/Applications/Storefront/components/orders/list/SOrdersList.vue` | Server-side order history table, guest codes, routing to typed dashboards. |
| `@selldone/components-vue/storefront/login/SShopLogin.vue` | Fast login providers and SMS OTP flow. |
| `@selldone/components-vue/storefront/login/widgets/ShopEmailLogin.vue` | Email OTP flow. |
| `src/Applications/Storefront/pages/user/profile/StorefrontPageUserProfile.vue` | Profile, subscribe, leave shop, club, KYC status. |

## Basket Page Runtime State

| State | Source behavior |
|---|---|
| `type` | Taken from `/basket/:type`; drives basket selection and product type rules. |
| `basket` | `getBasket(type)` from global store. |
| `bill` | Stored on `basket.bill`; fetched separately when missing. |
| `delivery_info` | Local clone from `basket.delivery_info`, saved to backend. |
| `receiver_info` | `basket.receiver_info`; address, phone, country, postal, location. |
| `billing` | Business/personal billing object. |
| `form` | Dynamic checkout form values from shop checkout options. |
| `guest_email` | Required for guest payment when guest payment is enabled. |
| `lottery_win_selected_variant` | Selected variant for lottery prize product. |
| `busy_bill`, `busy_save`, `busy_submit` | Independent loading states. |

## Basket Bill Contract

Bill is fetched from:

`GET https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill`

Bill fields used by checkout UI:

| Field | Use |
|---|---|
| `can_pay` | If false, block payment and show error/disabled state. |
| `sum` | Final payable amount. |
| `price` | Price after tax-included adjustment. |
| `items_price` | Raw items subtotal. |
| `items_discount` | Product/variant discount total. |
| `cross_selling_discount` | Cross-sell discount. |
| `offer` | Offer discount total. |
| `discount_code` | Discount-code amount. |
| `club` | Customer club discount. |
| `coupon` | Coupon amount. |
| `lottery` | Lottery prize discount/amount. |
| `tax` | Tax amount. |
| `tax_shipping` | Shipping tax amount. |
| `delivery_price` | Shipping/delivery cost; negative means payable later/after review. |
| `wallet` | Wallet effect/availability. |
| `can_cod` | Delivery and product type support COD. |
| `has_custom_delivery` | At least one item is delivered by the shop itself. |
| `extra_shipping_counts` | Extra packages/shipments, including dropshipping/connect/vendor packages. |
| `connect_shipping_options` | Connect shipping package options. |
| `vendor_shipping_options` | Marketplace vendor package options. |
| `store_shipping_options` | Store/multi-warehouse package options. |

Do not calculate final payable independently. Use bill as source of truth.

## Basket Config Save

Endpoint:

`PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/config`

Body:

| Field | Meaning |
|---|---|
| `receiver_info` | Receiver/shipping contact and location. |
| `delivery_info` | Selected delivery methods, vendor/store/connect shipping options, pickup/custom delivery choices. |
| `billing` | Billing person/business address and tax id. |
| `form` | Dynamic checkout form answers. |
| `guest_email` | Guest customer email. |

Behavior:

- Save is throttled; first call is immediate and later changes are trailing.
- If a later save is pending, do not overwrite local basket with stale response.
- On success, update basket bill, receiver_info, delivery_info, billing, form, and guest_email from response.
- Show backend validation errors directly.

## Receiver And Delivery Rules

| Product type | Requirement |
|---|---|
| Physical | If shop asks shipping address, require address, phone, and valid location unless map disabled. |
| Service | Can require service address; may also be seller-priced after submission. |
| Subscription | Uses delivery rules when the purchased items require delivery; otherwise subscription-specific payment. |
| Virtual | No shipping gate. |
| File | No shipping gate. |

Location behavior:

- If shop map is enabled, valid location requires `receiver_info.location.lat` and `receiver_info.location.lng`.
- If map is disabled, valid location only requires address text.
- Map dialog uses current geolocation as initial center when basket has no receiver location.
- `onClickSetLocation` writes selected map info into `basket.receiver_info` and saves config.

Shipping packages:

| Package source | Component behavior |
|---|---|
| Connect shipping | Writes selected `connect_shippings` to `delivery_info.connect_shippings` and saves config. |
| Vendor shipping | Iterates `bill.vendor_shipping_options` as separate packages; each package saves vendor shipping selection. |
| Store shipping | Iterates `bill.store_shipping_options` for store/multi-warehouse packages. |
| Pickup-only | `all_is_pickup` can skip full shipping address when all selected package methods are pickup, except connect shipping still asks address. |

COD is allowed only when `bill.can_cod` is true and a shop gateway exists with matching basket currency and `cod` enabled.

## Guest Checkout

Guest checkout has two independent shop options:

| Option behavior | Requirement |
|---|---|
| Guest add-to-basket | Product buy button allows basket mutation if guest checkout is enabled. |
| Guest payment | Checkout allows payment without user if guest payment is enabled. |

Rules:

- Use `basket.code` as guest order code in payment and service submit flows.
- If no user and guest payment is enabled, require `guest_email` before payment/submit.
- Store guest order codes in local storage after service submit or payment start so guest order history can be loaded later.
- Order history sends guest `codes` when user is not authenticated.

## Billing Form

Billing can be same as receiver or custom.

| Field | Meaning |
|---|---|
| `name` | Billing person/business name. |
| `country` | Billing country. |
| `state`, `state_code` | Region/state for tax. |
| `address` | Billing address. |
| `business` | True for business billing. |
| `custom` | True when not same as receiver. |
| `tax_id` | Business tax id when business billing is enabled. |

Tax regions are loaded with:

`GET https://xapi.selldone.com/shops/@{shop}/tax/{country}/regions`

## Dynamic Checkout Form

The checkout form comes from `ShopOptionsHelper.GetCheckout(shop)`.

Selection rule:

1. If receiver/billing country exists and `checkout.form_{COUNTRY}` exists, use the country-specific form.
2. Otherwise use `checkout.form`.

Supported rows:

| Type | UI | Value behavior |
|---|---|---|
| `note` | Render formatted note text. | No saved answer. |
| missing or `text` | Text field. | Saved at `form[item.name]`. |
| `select` | Select; `multiple` supports chips. | Saved at `form[item.name]`. |
| `switch` | Smart yes/no switch. | Saved at `form[item.name]`. |

Defaults:

- On init, if a form row has `default` and no current value, set it in local form state.
- Every update emits `changed`, which must trigger basket config save.

## Payment Entry Flow

Normal checkout entry:

1. Validate `can_pay` and `canPayAndComplete`.
2. For subscription baskets, require authenticated user.
3. For subscription, collect allowed gateway codes from `items[].subscription_price.gateway_code` and open subscription payment dialog.
4. For normal physical/virtual/file baskets, require user unless guest payment is enabled.
5. Open payment dialog with basket `code`, `basket`, `type`, `bill`, selected lottery variant id, selected gateway, and `acceptCOD`.
6. On success, navigate to typed order detail route using returned `target_id`.

Service submit without immediate payment:

`POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/submit`

Body:

| Field | Meaning |
|---|---|
| `currency` | Selected user currency. |
| `selected_variant_id` | Selected lottery prize variant id if any. |
| `code` | Guest basket code when user is not authenticated. |

If service needs seller pricing later, payment happens through bill payment:

`POST https://xapi.selldone.com/shops/@{shop}/basket/{basket_id}/bills/{bill_id}/pay/{gateway}`

## Payment Dialog Contract

The global payment dialog listens to these events:

| Event | Purpose |
|---|---|
| `payment-form-basket` | Normal basket payment. |
| `payment-form-subscription` | Subscription payment with restricted gateway codes. |
| `payment-form-bill` | Pay seller-priced service bill. |
| `payment-form-avocado` | Avocado payment. |
| `payment-form-hyper` | Hyper payment. |
| `try-to-pay` | Resume pending transaction. |

Normal buy endpoint:

`POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/buy/{gateway_code}`

Payment request body:

| Field | Meaning |
|---|---|
| `code` | Guest code when no authenticated user exists. |
| `amount_check` | Amount user confirms in payment form. |
| `delivery_price` | Bill delivery price. |
| `currency` | Selected currency code. |
| `return` | Current shop URL for gateway return. |
| `gift_cards` | Gift card selections. |
| `selected_variant_id` | Lottery prize variant id. |
| extra `params` | Gateway-specific fields from payment form. |

Payment response modes to support:

| Response field | Required behavior |
|---|---|
| `payed_by_gift_card` | Treat as completed and navigate to order. |
| `free_order` | Treat as completed and navigate to order. |
| `cod` | Treat as completed COD and navigate to order. |
| `dir` | Direct/manual payment completed; navigate to order. |
| `address`, `amount`, `qr_code` | Show QR payment and poll/handle timeout. |
| `mode` in `stripe`, `razorpay`, `paypal`, `paypal-standard`, `mercadopago`, `paymob`, `squareup` | Show onsite payment form with `pack`. |
| `link` and `method` | Fill hidden form and submit redirect. |
| `que` | Add pending transaction to store and show payment progress circle. |
| `interval_check` | Poll payment status with interval endpoint. |
| `billing` | Feed payment gateway billing details. |
| `order_url` | Provide order redirect URL for supported gateways. |

Pending payment endpoints:

| Action | Endpoint |
|---|---|
| Pending payment info | `GET https://xapi.selldone.com/shops/@{shop}/gateways/{gateway}/{transaction_id}` |
| Interval status | `GET https://xapi.selldone.com/shops/@{shop}/gateways/{gateway}/transactions/{transaction_id}/{unique_id}` |
| Stripe intent check | `GET https://xapi.selldone.com/shops/@{shop}/gateways/stripe/{paymentIntent_id}/check` |
| Direct payment receipt | `POST https://xapi.selldone.com/shops/@{shop}/transactions/{transaction_id}/receipt/{currency}` |

## Order History And Dashboards

Order history endpoint:

`GET https://xapi.selldone.com/shops/@{shop}/basket/orders-{type}`

Query params:

| Param | Meaning |
|---|---|
| `offset` | `(page - 1) * itemsPerPage`. |
| `limit` | Page size. |
| `sortBy` | Server-side sort key. |
| `sortDesc` | Boolean sort direction. |
| `codes` | Guest order codes from local storage when no user exists. |

Order list UI must show:

- Order code prefix: `SM`, `SV`, `SF`, `SS`, `SN`, `POS`, or `AVO`.
- Items image stack.
- Price or `waiting_review` for reserved service orders without price.
- Payment/order status.
- Delivery state stepper for non-POS orders.
- Receiver info hover/card for physical/service/avocado orders.
- Return request badge where applicable.
- Chat badge when latest message is from officer/admin.
- Server-side pagination.

Typed order routes:

| Type | Route |
|---|---|
| Physical | `/orders/physical/SM-:basket_id` |
| Virtual | `/orders/virtual/SV-:basket_id` |
| File | `/orders/file/SF-:basket_id` |
| Service | `/orders/service/SS-:basket_id` |
| Subscription | `/orders/subscription/SN-:basket_id` |
| POS | `/orders/pos/POS-:basket_id` |
| Avocado | `/orders/avocado/AVO-:basket_id` |

Order action endpoints:

| Action | Endpoint |
|---|---|
| Standard order detail | `GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` |
| POS order detail | `GET https://xapi.selldone.com/shops/@{shop}/pos-baskets/{basket_id}` |
| Avocado order detail | `GET https://xapi.selldone.com/shops/@{shop}/avo-baskets/{avocado_id}` |
| Confirm received | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/confirm-received` |
| Edit receiver info | `PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/receiver-info` |
| Edit billing | `PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/billing` |
| Return item | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{item_id}` |
| Upload return file | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{basketItem_id}/temp/upload/{type}` |
| Add order chat message | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/chat` |
| Delete order chat message | `DELETE https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/chat/{message_index}` |

## Login Flow

Login modes come from `shop.login_modes`.

Supported fast-login entries:

- Google.
- Apple.
- Email OTP.
- Facebook/Meta.
- Selldone account login.
- SMS OTP.

SMS OTP flow:

1. Request OTP with country dial code, country ISO2, and phone.
2. Move to verify step and start 60-second resend countdown.
3. Verify 6-digit code.
4. Backend can return `select`, `login`, or `register` method.
5. If `select`, show returned users and call select-user endpoint with selected user code.
6. If `register`, collect name, optional email/password, or no-email mode, then register user.
7. On token response, call `SetToken(token, expire_date, access_token)` and let app reload/fetch current user.

Email OTP flow:

1. Collect email or use `?email=` prefilled/locked value.
2. Request email OTP.
3. Verify OTP.
4. Emit token and expires_in to shared login handler.

Auth endpoints:

| Action | Endpoint |
|---|---|
| SMS request | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/request` |
| SMS verify | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/verify` |
| SMS select user | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/select-user` |
| SMS register user | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/new-user` |
| Email request | `POST https://xapi.selldone.com/shops/@{shop}/email-login/request` |
| Email verify | `POST https://xapi.selldone.com/shops/@{shop}/email-login/verify` |
| Current user | `GET https://xapi.selldone.com/me` |
| Logout | `POST https://xapi.selldone.com/shops/@{shop}/logout` |

## Profile And Account

Profile page behavior:

- Requires `USER()`.
- Shows avatar, name, email, email verification, logout.
- Shows `USER().customer` profile fields: name, phone, email, birthday, currency, country, address, created_at, purchase_at.
- Shows subscription state and allows subscribe/unsubscribe.
- Shows customer club level, percent, limit, currency, free shipping.
- Shows KYC status and links to main service KYC URL.
- Allows leave shop with danger confirmation and then logout.
- Edit profile clones `customer`, edits fields, map address, and saves to backend.

Profile endpoints:

| Action | Endpoint |
|---|---|
| Save customer profile | `POST https://xapi.selldone.com/shops/@{shop}/customer` |
| Subscribe/unsubscribe shop | `POST https://xapi.selldone.com/shops/@{shop}/subscribe` |
| Leave shop | `POST https://xapi.selldone.com/shops/@{shop}/leave` |

Account areas that must be present for a full storefront:

| Area | Route | Endpoint contract |
|---|---|---|
| Addresses | `/user/addresses` | Address CRUD, geo-to-address, autocomplete. |
| Orders | `/user/orders/**` | Typed history endpoint with pagination/sort/guest codes. |
| Returns | `/user/orders-return` | Return requests and return item/upload endpoints. |
| Favorites | `/user/favorites` | Wishlist/card/product endpoints. |
| Comments | `/user/comments` | `GET https://xapi.selldone.com/shops/@{shop}/comments`. |
| Gift cards | `/user/gift-cards` | `GET` and `POST https://xapi.selldone.com/shops/@{shop}/giftcards`. |
| Wallets | `/user/wallets` | `GET https://xapi.selldone.com/shops/@{shop}/wallets`. |

## Checkout Completion Criteria

A checkout implementation is complete only when it supports:

1. Basket item add/update/delete by `product_id` with `variant_id`, `preferences`, `vendor_product_id`, and `price_id`.
2. Bill refresh and basket config save.
3. Receiver, map/location, shipping package selection, billing, and dynamic checkout form.
4. Guest email and guest code history.
5. Coupons, discount code, club, offers, lottery prize variant selection, tax, shipping, COD.
6. Service submit and later bill payment.
7. Subscription auth gate and gateway restriction by subscription plan.
8. Payment response modes: free, gift card, COD, direct, QR, onsite, redirect, pending queue, polling.
9. Typed order dashboards and paginated order histories.
10. Login, profile edit, subscribe/leave, addresses, returns, comments, favorites, gift cards, wallets.
