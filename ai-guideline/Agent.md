# Agent Instructions: Build A Selldone Storefront

You are building a Selldone customer storefront in the user's requested framework.

## Non-Negotiable Rules

- Use storefront XAPI, not backoffice APIs.
- Default API base is `https://xapi.selldone.com`.
- Use full endpoints from `_generated/api-url-builders.md` and `_generated/api-url-builders-supplement.md`; do not invent paths.
- Preserve public route patterns from `_generated/route-index.md`.
- Prefix routes with `shop-prefix-address` when configured.
- Support public visitor, guest checkout with `S-Guest`, and authenticated customer with bearer token.
- Bootstrap shop before business pages: `GET https://xapi.selldone.com/shops/@{shop}/info`.
- Load current user only when a token exists: `GET https://xapi.selldone.com/me`.
- Implement product type differences; do not treat all products as physical goods.

## Build Order

1. Runtime config: shop name, prefix URL, API base, CDN, language, currency.
2. XAPI client with Selldone headers.
3. Storefront state: shop, user, baskets, guest code, orders, comparison, campaigns.
4. Router and metadata.
5. App shell: header, footer, search, support, comparison, dialogs.
6. Product listing.
7. Product detail, including `storefront/10-product-pricing-marketplace-options.md`.
8. Basket, checkout, payment, order detail, including `storefront/11-checkout-payment-account-deep-dive.md`.
9. Customer account.
10. Content pages/blog/FAQ.
11. Special flows: avocado, hyper, POS, Instagram, maps, listing, community.

## Required Routes

- `/`
- `/shop`
- `/:category_name-category`
- `/@:slug-:vendor_id`
- `/vendor/@:slug-:vendor_id`
- `/product/:product_id`
- `/comparison`
- `/basket/:type`
- `/user/**`
- `/orders/physical/SM-:basket_id`
- `/orders/virtual/SV-:basket_id`
- `/orders/file/SF-:basket_id`
- `/orders/service/SS-:basket_id`
- `/orders/subscription/SN-:basket_id`
- `/orders/pos/POS-:basket_id`
- `/orders/avocado/AVO-:basket_id`
- `/pages/:page_name`
- `/in/:path-:include_id`
- `/blog/**`
- `/about-us`, `/terms`, `/privacy`, `/contact-us`, `/faq/:tag?`
- `/avocado/**`, `/hyper/**`, `/pos/:basket_id`, `/instagram`, `/map`, `/map-vendors`
- `/listing/**`
- `/community/**`
- `/:pathMatch(.*)*`

## Minimum Endpoints

- `GET https://xapi.selldone.com/shops/@{shop}/info`
- `GET https://xapi.selldone.com/me`
- `POST https://xapi.selldone.com/shops/@{shop}/sms-login/request`
- `POST https://xapi.selldone.com/shops/@{shop}/sms-login/verify`
- `POST https://xapi.selldone.com/shops/@{shop}/email-login/request`
- `POST https://xapi.selldone.com/shops/@{shop}/email-login/verify`
- `GET https://xapi.selldone.com/shops/@{shop}/products/all`
- `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info`
- `PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}`
- `DELETE https://xapi.selldone.com/shops/@{shop}/basket/{product_id}`
- `GET https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill`
- `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/buy/{gateway_code}`
- `GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}`
- `GET https://xapi.selldone.com/shops/@{shop}/basket/orders-{type}`

## Done Criteria

A storefront is complete only when it can browse, search, filter, view a product, select variants/vendor/preferences, add to basket, calculate bill, checkout/pay, show typed order details, authenticate a customer, manage account data, render content pages, and handle all shop-enabled special flows.


