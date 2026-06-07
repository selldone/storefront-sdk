# AI Agent Entrypoint For A Full Selldone Storefront

## Mission

Build a full-function Selldone customer storefront in any frontend framework. The storefront must preserve Selldone behavior across shop bootstrap, routing, product listing, product detail, basket, checkout, payment, customer account, orders, content pages, special commerce modes, localization, and API calls while allowing any custom UI design.

The current Vue source is only a traceability source. A new implementation can use React, Vue, Angular, Svelte, Next.js, Nuxt, Astro, native mobile, server-rendered HTML, or any other stack.

## Non-Negotiable Rules

1. Do not skip modules. Use `06-feature-inventory.md` and `07-module-implementation-matrix.md` as the coverage checklist.
2. Use full XAPI URLs only, always beginning with `https://xapi.selldone.com` unless a deployment explicitly overrides the `selldone-xapi` meta tag.
3. Never invent REST paths. If a full endpoint is not in `_generated/api-url-builders.md` or `_generated/api-url-builders-supplement.md`, mark a documentation gap instead of guessing.
4. Do not couple implementation to Vue, Vuetify, Vuex, Pinia, Selldone components, or global `window.$storefront`. Source names are references, not dependencies.
5. Every storefront route must load shop context before rendering business UI that depends on `shop`, `baskets`, `pending_transactions`, `club`, `orders_state`, `initial_location`, and customer access state.
6. Every request must include the relevant customer, guest, localization, campaign, referrer, location, popup, affiliate, and temporary-access headers when available.
7. Guest checkout is first-class. Do not force login unless the shop option or feature requires it, such as subscription payment or protected customer account pages.
8. Product types must be supported separately: physical, virtual, file, service, subscription, POS, avocado, and hyper flows.
9. Page builder and custom home pages must remain supported even if the app is not built with Selldone Page Builder components.
10. Secondary surfaces may be collapsed in navigation, but they must remain reachable by route, account menu, footer, search, or direct link.

## Mandatory First Pass

Before writing application code, build an internal feature registry from these files:

1. `06-feature-inventory.md`: module and submodule checklist.
2. `07-module-implementation-matrix.md`: route families, endpoints, source traces, UI responsibilities, and completion criteria.
3. `_generated/route-index.md`: exact current path patterns and source lines.
4. `_generated/api-usage-by-area.md`: source areas and XAPI builders used by each area.
5. `_generated/api-url-builders.md`: full endpoint URLs, HTTP methods, auth notes, and source lines.
6. `_generated/api-url-builders-supplement.md`: endpoint builders found inside method bodies, especially basket item, payment, order action, waiting list, chat, and membership endpoints.
7. `storefront/10-product-pricing-marketplace-options.md`: product price, variants, marketplace vendors, options, valuation, subscription, and buy payload rules.
8. `storefront/11-checkout-payment-account-deep-dive.md`: checkout form, shipping, payment modes, order history, login, and profile/account rules.
9. `_generated/source-module-index.md`: source folder coverage check.

The registry should store at least this shape:

~~~json
{
  "module": "Product Detail",
  "placement": "primary",
  "routes": ["/product/:product_id"],
  "required_context": ["shop", "customer", "baskets", "currency", "language", "guest_code"],
  "source": ["src/Applications/Storefront/pages/product/StorefrontPageProduct.vue"],
  "api_usage_areas": ["products", "basket-orders-checkout", "incentives", "customer-account"],
  "core_endpoints": [
    "GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info",
    "PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}",
    "POST https://xapi.selldone.com/shops/@{shop}/products/{product_id}/set-my-rating"
  ]
}
~~~

## What Selldone Storefront Contains

| Surface group | Main modules |
|---|---|
| App bootstrap | Meta tags, SDK setup, XAPI base, CDN base, shop prefix, custom home, theme variables, language, PWA, native app mode. |
| Shop shell | Global shop context, header, search, top menu, footer, support, social buttons, campaign banners, popups, comparison, payment dialog, cookie consent, notifications, private-shop access check. |
| Commerce discovery | Home, page builder landing pages, shop listing, category listing, vendor listing, product cards, quick buy, map products/vendors, Instagram channel. |
| Product detail | Product overview, images, share, brand, ratings, variants, marketplace vendor selector, price, tax, cashback, coupons, buy button, waiting lists, auctions, valuation, service preferences, subscription plan selector, article, files, membership content, shipping, warranty, guide, comments, related products/categories, cross-sell, offers. |
| Basket and checkout | Basket by type, item add/remove, coupon, lottery prize, discount code, cross-selling discount, receiver info, delivery options, pickup, billing, form data, calculated bill, COD, gateway payment, subscription payment, service submit, share order, imported baskets. |
| Customer account | Login by OAuth/SMS/email, profile, addresses, wishlist, comments, gift cards, wallets, return requests, order history, logout, leave shop, subscribe to shop, currency preference, push FCM token. |
| Orders | Customer order detail pages for physical, virtual, file, service, subscription, POS, avocado, and hyper; chat; billing; confirm received; return request upload. |
| Content | Blog list/detail, author pages, official pages, contact us, FAQ, page builder pages, includes, custom home pages. |
| Incentives | Coupons, offers, discount code, lottery, cashback, gift cards, campaign/affiliate/email/stream tracking headers. |
| Special commerce | Avocado inquiry/order, hyper inquiry/order, POS scan/order, marketplace vendor pages, listing/directory with search, categories, item profile, reviews, badges, messages, compare. |
| Community | Community home, feed, comments, category topics, topic detail via community SDK/CAPI. |
| Localization | Shop language, `X-Localization`, custom language packs, currency selection, exchange rates, RTL/LTR, translated product articles and page content. |

## Required Reading Order

1. `README.md`
2. `01-storefront-architecture.md`
3. `06-feature-inventory.md`
4. `07-module-implementation-matrix.md`
5. `02-ai-build-guide.md`
6. `03-routing-and-url-patterns.md`
7. `04-api-and-data-contracts.md`
8. `05-ui-patterns.md`
9. The matching `storefront/` section file for the module being implemented.
10. `_generated/route-index.md`
11. `_generated/api-usage-by-area.md`
12. `_generated/api-url-builders.md`
13. `_generated/api-url-builders-supplement.md`
14. `storefront/10-product-pricing-marketplace-options.md` for product pricing, vendor, variant, option, valuation, subscription, and buy flows.
15. `storefront/11-checkout-payment-account-deep-dive.md` for checkout, payment, order, login, and account flows.
16. `_generated/source-module-index.md`

## Implementation Sequence

### 1. Foundation

Implement a framework-neutral HTTP client and runtime context.

Baseline public request:

~~~http
GET https://xapi.selldone.com/shops/@{shop}/info
Accept: application/json
X-Localization: {locale}
S-Location: {current_url}
S-Referrer: {referrer_url}
S-Guest: {guest_code_if_any}
~~~

Baseline authenticated customer request:

~~~http
GET https://xapi.selldone.com/me
Authorization: Bearer {customer_access_token}
Accept: application/json
X-Localization: {locale}
~~~

### 2. Shop Bootstrap

Load the shop before most pages:

~~~http
GET https://xapi.selldone.com/shops/@{shop}/info
~~~

Store response fields: `shop`, `baskets`, `pending_transactions`, `club`, `orders_state`, `initial_location`, `seen_pops`, and `shop.guest_code`. Persist and send `S-Guest` for guest baskets.

### 3. Routing And Layout

Build the route tree from `_generated/route-index.md`. Prefix paths with `shop-prefix-address` if the shop is mounted under a subpath. Implement dynamic home selection from `custom-home`: `blog`, `avocado`, `hyper`, `community`, `shop`, `map`, numeric landing page id, or default shop listing.

### 4. Product Listing And Search

Implement `/shop`, category routes, vendor routes, map routes, and search query state around:

~~~http
GET https://xapi.selldone.com/shops/@{shop}/products/all
GET https://xapi.selldone.com/shops/@{shop}/products/list
GET https://xapi.selldone.com/shops/@{shop}/search/suggestion/{text}
~~~

Support `dir`, `offset`, `limit`, `sort`, `available`, `search`, `search_type`, `filter`, `tags`, `vendor_id`, `with_parent`, `with_page`, and `with_total`.

### 5. Product Detail

Implement the full product page early because basket, subscriptions, files, cross-sell, ratings, wishlist, and marketplace vendor flows depend on it.

~~~http
GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info
POST https://xapi.selldone.com/shops/@{shop}/products/{product_id}/set-my-rating
PUT https://xapi.selldone.com/shops/@{shop}/products/{product_id}/wishlist
DELETE https://xapi.selldone.com/shops/@{shop}/products/{product_id}/wishlist
PUT https://xapi.selldone.com/shops/@{shop}/products/{product_id}/waiting-be-available
DELETE https://xapi.selldone.com/shops/@{shop}/products/{product_id}/waiting-be-available
GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/contents
POST https://xapi.selldone.com/shops/@{shop}/products/{product_id}/subscribe
~~~

### 6. Basket, Checkout, Payment

Implement basket by product type and keep guest/user parity.

~~~http
PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}
DELETE https://xapi.selldone.com/shops/@{shop}/basket/{product_id}
GET https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill
PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/config
POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/buy/{gateway_code}
POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/submit
POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/share
POST https://xapi.selldone.com/shops/@{shop}/basket/{basket_id}/bills/{bill_id}/pay/{gateway}
POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/portal
~~~

### 7. Customer Account And Orders

Implement account routes after shop bootstrap and basket. Gate `requiresAuth` routes unless guest checkout is allowed.

~~~http
GET https://xapi.selldone.com/me
GET https://xapi.selldone.com/address/all
GET https://xapi.selldone.com/shops/@{shop}/basket/orders-{type}
GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}
GET https://xapi.selldone.com/shops/@{shop}/basket/orders/return-requests
POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/return/{item_id}
~~~

### 8. Content, Special Flows, Listing, Community

Implement the remaining route families from `07-module-implementation-matrix.md`, using `_generated/api-url-builders.md` for all endpoints. Special flows are not optional: avocado, hyper, POS, listing, marketplace vendor pages, blog, FAQ, official pages, contact, page builder pages, and community route shells must be present or explicitly marked unsupported by product decision.

## API Resolution Protocol

For each screen and action:

1. Locate the module in `07-module-implementation-matrix.md`.
2. Read the matching `storefront/` section doc.
3. Open `_generated/api-usage-by-area.md` and find all listed API areas.
4. Copy the referenced builder names used by the current source.
5. Resolve every builder in `_generated/api-url-builders.md`.
6. If the builder is not present there, resolve it in `_generated/api-url-builders-supplement.md`.
7. Implement only the resolved full URL, method, params, auth, and response/error contract.
8. Add loading, empty, success, validation, forbidden, unauthenticated, not-found, and retry states.

## Done Criteria

A storefront implementation is complete only when all of these are true:

1. Every module and submodule in `06-feature-inventory.md` has an implemented route or reachable screen.
2. Every route pattern in `_generated/route-index.md` is implemented or explicitly listed as an intentional unsupported gap.
3. Every source directory listed in `_generated/source-module-index.md` is covered by a module, helper, section, or explicit unsupported-gap note.
4. Every implemented API call uses a full endpoint from `_generated/api-url-builders.md` or `_generated/api-url-builders-supplement.md`.
5. Shop context loads before product, basket, account, content, listing, and special-flow pages render.
6. Guest basket and authenticated customer behavior both work.
7. Product page supports all product types and sections: variants, price, coupons, cashback, marketplace vendors, subscription, file/member content, service preferences, shipping, warranty, article, comments, related items, cross-sell, offers, ratings, wishlist, waiting lists, and buy button.
8. Checkout supports physical, virtual, file, service, subscription, COD, pickup, delivery, billing, receiver info, coupon, lottery, discount code, calculated bill, and gateway payment states.
9. Customer account supports profile, addresses, orders, returns, wishlist, comments, gift cards, wallets, and logout.
10. Localization, currency, shop theme, campaign/affiliate/email tracking headers, popups, private-shop access, and cookie consent are handled.

