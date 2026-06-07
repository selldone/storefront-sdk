# Storefront AI Guideline Documentation Plan

This is the execution plan for `@selldone/sdk-storefront/ai-guideline`. The guide is built from production storefront source in `src/Applications/Storefront` and public SDK source in `@selldone/sdk-storefront`.

## Objective

Enable an AI agent to build a complete Selldone storefront in any framework while preserving production routes, UI behavior, guest/auth checkout, and XAPI contracts.

The generated storefront must cover:

- Shop bootstrap, shell, dynamic home, theme, SEO, localization, currency, guest session, and login.
- Product listing, categories, vendor pages, search, filters, sorting, comparison, and product cards.
- Product detail with variants, marketplace vendors, valuation, subscription/file/service behavior, media, articles, comments, rating, wishlist, waiting list, and buy actions.
- Basket, checkout, payment, typed order dashboards, guest checkout, coupons, offers, lottery prizes, returns, and share/import flows.
- Customer account: profile, addresses, order histories, returns, favorites, comments, gift cards, and wallets.
- Content: page-builder pages, include pages, blogs, official profiles, contact, FAQ, and article interactions.
- Special flows: avocado, hyper, POS, Instagram channel, maps, marketplace vendors, listing directory, and community.

## Source Of Truth

| Source | Purpose |
|---|---|
| `src/Applications/Storefront/router/StorefrontRouter.ts` | Public paths, route metadata, page ownership. |
| `src/Applications/Storefront/StorefrontApp.vue` | App shell, dialogs, private shop gates, payment/share/login hosts. |
| `src/Applications/Storefront/layouts/StorefrontLayout.vue` | Header, footer, content menu, search, support widgets. |
| `src/Applications/Storefront/mixin/StorefrontMixin.ts` | Shop bootstrap, basket loading, guest code, currency/language behavior. |
| `src/Applications/Storefront/store/StorefrontStore.ts` | Runtime state to recreate outside Vue. |
| `@selldone/sdk-storefront/apis/XAPI.ts` | Public storefront XAPI URL builders. |
| `@selldone/sdk-storefront/StorefrontSDK.ts` | SDK bootstrap and `window.$storefront` object shape. |
| `@selldone/sdk-storefront/shop/XapiShop.ts` | Shop/product/basket helper behavior. |
| `@selldone/components-vue/storefront/**` | Canonical UI behavior and payload expectations. |

## Generated Catalogs

| File | Coverage |
|---|---|
| `_generated/route-index.md` | 63 normalized public route patterns. |
| `_generated/api-url-builders.md` | 119 first-pass XAPI endpoint rows using `https://xapi.selldone.com`. |
| `_generated/api-url-builders-supplement.md` | 39 additional URL builders extracted from `XAPI.ts` method bodies. |
| `_generated/api-usage-by-area.md` | 63 observed SDK/source XAPI usages grouped by storefront area. |
| `_generated/source-module-index.md` | 185 storefront source files grouped by area. |

## Manual Guide Files

| File | Role |
|---|---|
| `README.md` | Human and agent entry document. |
| `00-ai-agent-entrypoint.md` | Non-negotiable implementation rules and first-pass order. |
| `01-storefront-architecture.md` | Bootstrap, state, headers, auth, localization, route metadata. |
| `02-ai-build-guide.md` | Framework-neutral implementation workflow. |
| `03-routing-and-url-patterns.md` | Route behavior and public URL contracts. |
| `04-api-and-data-contracts.md` | Endpoint usage, auth/session classes, payload expectations. |
| `05-ui-patterns.md` | UI behavior that must survive framework changes. |
| `06-feature-inventory.md` | Complete feature inventory by storefront area. |
| `07-module-implementation-matrix.md` | Planning matrix by page/module. |
| `Agent.md` | Compact AI coding-agent prompt. |

## Section Guides

| File | Surface |
|---|---|
| `storefront/01-shop-shell-and-home.md` | Bootstrap, home routing, shell, layout. |
| `storefront/02-product-listing.md` | Shop/category/vendor product listing. |
| `storefront/03-product-detail.md` | Product page and buy panel. |
| `storefront/04-basket-checkout-payment.md` | Cart, checkout, payment, order details. |
| `storefront/05-user-account-orders.md` | Account dashboard and customer histories. |
| `storefront/06-content-pages-blog-faq.md` | Pages, profiles, blog, contact, FAQ. |
| `storefront/07-special-commerce-flows.md` | Avocado, hyper, POS, Instagram, maps, vendors. |
| `storefront/08-listing-directory.md` | Listing/directory product. |
| `storefront/09-community-localization-integrations.md` | Community, localization, currency, headers, integrations. |
| `storefront/10-product-pricing-marketplace-options.md` | Price calculation, custom pricing, variants, marketplace vendors, subscriptions, buy payload. |
| `storefront/11-checkout-payment-account-deep-dive.md` | Checkout form, shipping, payment modes, order history, login, profile/account. |

## Update Checklist

1. Re-read `StorefrontRouter.ts` after any storefront route change.
2. Re-generate `_generated/route-index.md` when route patterns change.
3. Re-generate `_generated/api-url-builders.md` and `_generated/api-url-builders-supplement.md` after any `XAPI.ts` change.
4. Update prose only from observed source behavior.
5. Keep every endpoint as a full URL starting with `https://xapi.selldone.com`.
6. Mark SDK TODO endpoints as `todo-verify` instead of pretending they are confirmed.
7. Validate that all storefront endpoint examples use the exact `https://xapi.selldone.com` domain.



