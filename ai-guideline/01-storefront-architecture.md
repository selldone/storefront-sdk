# Storefront Architecture

This file translates the production Vue storefront architecture into framework-neutral concepts.

## Runtime Layers

| Layer | Production source | Framework-neutral responsibility |
|---|---|---|
| App bootstrap | `StorefrontApp.vue`, `storefront.ts` | Initialize SDK, router, store, theme, auth, language, currency, dialogs. |
| Public router | `router/StorefrontRouter.ts` | Map SEO/customer URLs to pages and route metadata. |
| Layout shell | `layouts/StorefrontLayout.vue` | Header, footer, search, content header, bottom nav, support widgets. |
| Storefront state | `store/StorefrontStore.ts` | Shop, user, baskets, orders, guest, campaigns, comparison, location. |
| SDK/XAPI | `@selldone/sdk-storefront` | Build XAPI URLs, configure HTTP client, expose shop/product/basket helpers. |
| UI components | `@selldone/components-vue/storefront/**` | Canonical UX and payload behavior. |

## Required Bootstrap Sequence

1. Read server-rendered meta/config values.
2. Configure XAPI base as `https://xapi.selldone.com` unless runtime `selldone-xapi` overrides it.
3. Initialize customer token, guest code, attribution headers, localization, and shop-scoped local storage.
4. Fetch shop bootstrap with `GET https://xapi.selldone.com/shops/@{shop}/info`.
5. Save shop, baskets, pending transactions, initial location, club, order state, popups, and guest code.
6. If a customer token exists, fetch `GET https://xapi.selldone.com/me`.
7. Apply language, currency, theme, popup, campaign, and PWA state.
8. Resolve the route and render the page shell.

## Runtime Config Inputs

| Config | Meaning |
|---|---|
| `shop-name` | Store handle used in `@{shop}` endpoints. |
| `shop-prefix-address` | Optional public path prefix. Prefix all route patterns with it. |
| `custom-home` | Selects `/`: `blog`, `avocado`, `hyper`, `community`, `shop`, `map`, or numeric page id. |
| `selldone-xapi` | Optional storefront XAPI base override. Default `https://xapi.selldone.com`. |
| `selldone-capi` | Community API base when community is enabled. |
| `selldone-gapi` | Growth/analytics API base. |
| `service-url` | Service/backend integration URL. |
| `cdn` | Media CDN for shop/product/article assets. |
| `iframe` | Embedded storefront mode. |
| `debug` | Diagnostic mode. |

## Global Storefront Object

`StorefrontSDK.Setup()` creates `window.$storefront`. Recreate an equivalent runtime object in other frameworks.

| Field | Purpose |
|---|---|
| `name` | Current shop name. |
| `prefix_url` | Public path prefix. |
| `local_storage_path` | Shop-scoped storage namespace. |
| `database` | Local persisted state helper. |
| `currency` | Currency selection and formatting context. |
| `home` | Resolved home mode. |
| `user` | Customer auth/user helper. |
| `shop` | Shop API helper. |
| `auth` | Login/logout helper. |
| `products` | Product listing/detail helper. |
| `basket` | Basket helper. |
| `vendor` | Marketplace vendor helper. |
| `avocado` | Avocado flow helper. |
| `article` | Article/blog/product-content helper. |
| `lottery`, `coupon`, `offer`, `cashback` | Promotion helpers. |
| `routes` | Route builder helpers. |

## Store State To Recreate

| State | Why it matters |
|---|---|
| `shop` | Theme, business model, marketplace, privacy, product/checkout rules. |
| `user` | Authenticated customer, club, profile, wallets, addresses. |
| `baskets` | Active baskets by product type: physical, virtual, file, service, subscription. |
| `pending_transactions` | Payment callback and unfinished payment UX. |
| `initial_location` | Delivery/location defaults and map pages. |
| `orders_state` | Account/order badges and navigation. |
| `club` | Loyalty state. |
| `products_comparison` | Product comparison tray/page. |
| `coupons`, `offers`, `lottery_prizes` | Promotions in product/cart flows. |
| `channel_entry` | Campaign/channel attribution. |
| `seen_pops` | Popup/campaign suppression. |
| `globalStyle` | Theme/page-builder style overrides. |

## Request Headers

| Header | When to send |
|---|---|
| `Authorization: Bearer {token}` | Customer-authenticated requests. |
| `X-CSRF-TOKEN` | Browser/session environments that require CSRF. |
| `S-Guest` | Guest checkout/session code returned by bootstrap. |
| `S-Referrer` | Referrer tracking. |
| `S-Location` | Customer location context. |
| `S-Temp-Access` | Temporary/private/shared access. |
| `S-Pops` | Seen popup/campaign ids. |
| `S-Campaign-Id` | Campaign attribution. |
| `S-Link-Id` | Link attribution. |
| `S-Email-Id` | Email campaign attribution. |
| `S-Affiliate-Id` | Affiliate attribution. |
| `X-Localization` | Selected locale/language. |

## Auth And Guest Model

| Mode | Behavior |
|---|---|
| Public visitor | Can browse products, blogs, FAQ, pages, and public listing surfaces. |
| Guest customer | Can create baskets and checkout when allowed. Send `S-Guest`. |
| Authenticated customer | Can access `/user/**`, favorites, comments, addresses, wallets, returns, histories. |
| Private shop | Show login/access gate before protected content. |

Primary auth endpoints:

| Action | Endpoint |
|---|---|
| SMS request | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/request` |
| SMS verify | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/verify` |
| Select login user | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/select-user` |
| Create login user | `POST https://xapi.selldone.com/shops/@{shop}/sms-login/new-user` |
| Email request | `POST https://xapi.selldone.com/shops/@{shop}/email-login/request` |
| Email verify | `POST https://xapi.selldone.com/shops/@{shop}/email-login/verify` |
| Current user | `GET https://xapi.selldone.com/me` |
| Logout | `POST https://xapi.selldone.com/shops/@{shop}/logout` |

## Route Metadata Contract

| Meta | Effect |
|---|---|
| `footer` | Show/hide footer. |
| `comparison` | Enable product comparison floating UI. |
| `support` | Enable support/contact widgets. |
| `search` | Show global search. |
| `fullscreen` | Remove standard chrome for map/POS/special flows. |
| `bg_color`, `page_background` | Page background. |
| `requiresAuth` | Enforce authenticated customer. |
| `title` | SEO title fallback. |
| `dark`, `light_header`, `transparent_header` | Header/text treatment. |
| `channel` | Channel-specific mode, for example Instagram. |
| `card` | Account card/chrome treatment. |

## Error And Loading Behavior

- Show global loading during shop bootstrap.
- Treat bootstrap failure as unavailable/private shop state, not blank page.
- Use catch-all `/:pathMatch(.*)*` for 404.
- Preserve payment callback, pending transaction, and share-order retrieval on app load.
- Do not clear all baskets if one basket-specific request fails.

