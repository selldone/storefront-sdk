# AI Build Guide

Use this as the implementation workflow for a Selldone storefront in any framework.

## First Rule

Do not start from visual components. Start from data contracts, public routes, session headers, and business flows. A storefront that looks correct but ignores guest code, basket types, route prefixes, or payment states is not compatible.

## Recommended Build Order

1. Runtime config and XAPI client.
2. Shop bootstrap and global state.
3. Route table and route metadata.
4. App shell: header, footer, search, campaign, support, bottom navigation, global dialogs.
5. Product listing and product detail.
6. Basket, checkout, payment, and typed order dashboards.
7. Customer account and order histories.
8. Content pages, blog, FAQ, and official profiles.
9. Special flows: avocado, hyper, POS, Instagram, maps, marketplace vendors, listing, community.
10. SEO, analytics, localization, currency, skeletons, empty states, responsive behavior.

## Framework-Neutral Project Shape

| Module | Responsibility |
|---|---|
| `config/storefront` | Reads shop name, prefix path, API base, CDN, language, currency. |
| `api/xapi` | HTTP client with Selldone headers and full XAPI endpoints. |
| `state/storefront` | Shop, user, baskets, orders, comparison, campaigns, global UI. |
| `routes/storefront` | Public path patterns and route metadata. |
| `ui/shell` | Header, footer, search, campaign, dialogs, support widgets. |
| `features/products` | Listing, category tree, product detail, cards, comparison. |
| `features/basket` | Cart, bill, checkout, payment, shipping, discounts, order detail. |
| `features/account` | Login, profile, addresses, orders, returns, wallet, gift cards. |
| `features/content` | Page builder, include pages, blog, official profiles, FAQ. |
| `features/special` | Avocado, hyper, POS, Instagram, maps, listing, community. |

## API Client Requirements

Your client must:

- Default to `https://xapi.selldone.com`.
- Support runtime `selldone-xapi` override.
- Attach customer bearer token and guest code independently.
- Attach attribution headers and `X-Localization`.
- Send query params without renaming backend fields.
- Handle validation errors, payment redirects, auth-required responses, and recoverable network errors.
- Use `_generated/api-url-builders.md` as the complete endpoint catalog.

Minimum endpoints for a usable storefront:

| Use case | Endpoint |
|---|---|
| Shop bootstrap | `GET https://xapi.selldone.com/shops/@{shop}/info` |
| Current user | `GET https://xapi.selldone.com/me` |
| Products listing | `GET https://xapi.selldone.com/shops/@{shop}/products/all` |
| Product detail | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info` |
| Add basket item | `PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}` |
| Delete basket item | `DELETE https://xapi.selldone.com/shops/@{shop}/basket/{product_id}` |
| Basket bill | `GET https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill` |
| Buy basket | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/buy/{gateway_code}` |
| Order detail | `GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` |
| Order history | `GET https://xapi.selldone.com/shops/@{shop}/basket/orders-{type}` |

## Route Implementation Protocol

1. Copy public route patterns from `_generated/route-index.md`.
2. Prefix every path with `shop-prefix-address` when configured.
3. Implement `/` as dynamic home, not a fixed product page.
4. Preserve SEO routes:
   - `/shop`
   - `/:category_name-category`
   - `/@:slug-:vendor_id`
   - `/vendor/@:slug-:vendor_id`
   - `/product/:product_id`
5. Preserve typed order routes:
   - `/orders/physical/SM-:basket_id`
   - `/orders/virtual/SV-:basket_id`
   - `/orders/file/SF-:basket_id`
   - `/orders/service/SS-:basket_id`
   - `/orders/subscription/SN-:basket_id`
   - `/orders/pos/POS-:basket_id`
   - `/orders/avocado/AVO-:basket_id`
6. Add catch-all 404 only after all special routes.

## Data Loading Protocol

1. Read route params and query params.
2. Ensure shop bootstrap is loaded.
3. Load page data from the exact endpoint.
4. Render loading state.
5. Render empty state when response is valid but empty.
6. Render recoverable error with retry.
7. Update SEO/title/canonical from loaded data.
8. Update global state only when response changes shop, user, basket, order, or campaign state.

## Product Listing Checklist

A listing page is complete only when it supports:

- `/shop`, category route, and vendor route.
- Query-driven search with `search` and `search_type` where used.
- Sorting, filter payload, availability toggle, and pagination/load-more.
- Category/folder browsing with breadcrumbs.
- Marketplace vendor context and vendor header.
- Product card actions: open product, quick buy when allowed, compare, wishlist.
- Custom page rendering when a parent folder has page-builder content.

Primary endpoint:

`GET https://xapi.selldone.com/shops/@{shop}/products/all`

## Product Detail Checklist

A product page is complete only when it supports:

- Product bootstrap with categories, variants, valuation, tax profile, cross-sells.
- Media gallery, badges, brand, rating, share, optional QR/admin actions.
- Variant selection and service/subscription preferences.
- Product type differences: physical, virtual, file, service, subscription.
- Marketplace vendor selection.
- Wishlist, comparison, waiting list, rating summary.
- Article/content sections, guide, shipping, warranty, comments, related products.
- Buy/add-to-basket flow with basket refresh.

Primary endpoint:

`GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info`

## Checkout Checklist

Checkout is complete only when it supports:

- `/basket/:type` for physical, virtual, file, service, subscription.
- Basket item quantity/update/delete by product id and selected variant.
- Receiver/customer info and shipping/location where required.
- Basket config, bill calculation, coupon/discount code, lottery, offers.
- Guest email and guest code behavior.
- Payment gateway selection and payment redirect.
- Service basket submit where applicable.
- Typed order detail pages after checkout.

Primary endpoints:

| Action | Endpoint |
|---|---|
| Basket config | `PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/config` |
| Basket bill | `GET https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill` |
| Buy | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/buy/{gateway_code}` |
| Service submit | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/submit` |
| Set location | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_type}/my-location` |

## Quality Gates

- Routes match `_generated/route-index.md`.
- Endpoints match `_generated/api-url-builders.md`.
- Public, guest, and authenticated customer modes work.
- Listing, detail, basket, checkout, and order detail work for enabled product types.
- Mobile and desktop layouts are usable.
- SEO URLs remain stable.
- Localization and currency survive navigation.
- Private shop and auth-required routes do not leak protected data.

