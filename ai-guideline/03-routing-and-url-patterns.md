# Routing And URL Patterns

The storefront router is part of the public product contract. Use `_generated/route-index.md` as the canonical complete route list.

## Prefix Rule

Every route pattern is relative to the storefront root. If `shop-prefix-address` is not empty, prefix every route with it.

| Prefix | Product route |
|---|---|
| empty | `/product/123` |
| `/my-store` | `/my-store/product/123` |

## Dynamic Home

The `/` route is selected by `custom-home`.

| `custom-home` | Home behavior |
|---|---|
| `blog` | Blog list home. |
| `avocado` | Avocado inquiry home. |
| `hyper` | Hyper cart/home. |
| `community` | Community home. |
| `shop` or empty | Product listing home. |
| `map` | Product map home. |
| numeric id | Custom page-builder landing page. |

Do not hardcode `/` to products.

## Commerce Routes

| Surface | Path | Notes |
|---|---|---|
| Product listing | `/shop` | Search, filters, category folders, product cards. |
| Category listing | `/:category_name-category` | Same page as `/shop` with category param. |
| Vendor listing | `/@:slug-:vendor_id` | Marketplace vendor product listing. |
| Vendor landing | `/vendor/@:slug-:vendor_id` | Vendor page-builder landing. |
| Page builder | `/pages/:page_name` | Custom shop page. |
| Include page | `/in/:path-:include_id` | Dynamic include/profile page. |
| Product detail | `/product/:product_id` | Full product page and buy panel. |
| Comparison | `/comparison` | Product comparison page. |
| Mobile info | `/info` | Compact shop info page. |
| Basket | `/basket/:type` | Cart/checkout by product type. |

`/basket/:type` supports product/basket types such as `physical`, `virtual`, `file`, `service`, and `subscription`.

## Customer Account Routes

| Surface | Path | Auth |
|---|---|---|
| Account shell | `/user` | Customer shell. |
| Orders parent | `/user/orders` | Customer. |
| Physical orders | `/user/orders/physical` | Customer. |
| Virtual orders | `/user/orders/virtual` | Customer. |
| File orders | `/user/orders/file` | Customer. |
| Service orders | `/user/orders/service` | Customer. |
| Subscription orders | `/user/orders/subscription` | Customer. |
| POS orders | `/user/orders/pos` | Customer. |
| Avocado orders | `/user/orders/avocado` | Customer. |
| Profile | `/user/profile` | `requiresAuth`. |
| Addresses | `/user/addresses` | `requiresAuth`. |
| Returns | `/user/orders-return` | `requiresAuth`. |
| Favorites | `/user/favorites` | `requiresAuth`. |
| Comments | `/user/comments` | `requiresAuth`. |
| Gift cards | `/user/gift-cards` | `requiresAuth`. |
| Wallets | `/user/wallets` | `requiresAuth`. |

## Order Detail Routes

Preserve order type prefixes.

| Type | Path |
|---|---|
| Physical | `/orders/physical/SM-:basket_id` |
| Virtual | `/orders/virtual/SV-:basket_id` |
| File | `/orders/file/SF-:basket_id` |
| Service | `/orders/service/SS-:basket_id` |
| Subscription | `/orders/subscription/SN-:basket_id` |
| POS | `/orders/pos/POS-:basket_id` |
| Avocado | `/orders/avocado/AVO-:basket_id` |

## Content Routes

| Surface | Path |
|---|---|
| Blog list | `/blog` |
| Author/team page | `/team/:author-:author_id` |
| Blog detail by slug | `/blog/:slug-:blog_id` |
| Blog detail by id | `/blog/:blog_id` |
| About | `/about-us` |
| Terms | `/terms` |
| Privacy | `/privacy` |
| Contact | `/contact-us` |
| FAQ | `/faq/:tag?` |

## Special Commerce Routes

| Surface | Path |
|---|---|
| Product map | `/map` |
| Vendor map | `/map-vendors` |
| Instagram channel | `/instagram` |
| Avocado order form | `/avocado/:hash` |
| Avocado inquiry | `/avocado` |
| Hyper order detail | `/hyper/:basket_id` |
| Hyper cart | `/hyper` |
| POS scan cart | `/pos/:basket_id` |

## Community Routes

| Surface | Path |
|---|---|
| Community home | `/community` |
| Community feed | `/community/feed` |
| My community comments | `/community/comments` |
| Community category | `/community/:category_id-:category_slug?` |
| Community topic | `/community/:category_id-:category_slug?/:topic_id-:topic_slug?` |

## Listing Directory Routes

| Surface | Path |
|---|---|
| Listing root | `/listing` |
| Listing compare | `/listing/compare` |
| Listing category | `/listing/:category?` |
| Listing item profile | `/listing/:category/:item` |

## 404 Route

The final route is `/:pathMatch(.*)*`. Add it after every specific route, including listing and community.

## Route Metadata Rules

| Metadata | Use |
|---|---|
| `requiresAuth` | Redirect or show login gate. |
| `footer` | Footer visibility. |
| `search` | Header search visibility. |
| `comparison` | Product comparison floating entry. |
| `support` | Support/contact widgets. |
| `fullscreen` | Map/POS/special fullscreen pages. |
| `channel` | Channel-specific pages like Instagram. |
| `title` | SEO fallback. |

