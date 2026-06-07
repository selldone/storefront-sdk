# Module Implementation Matrix

Use this matrix for planning, code ownership, and coverage checks.

## Core Shell

| Module | Routes | Primary endpoints | Must implement |
|---|---|---|---|
| Bootstrap | all | `GET https://xapi.selldone.com/shops/@{shop}/info`, `GET https://xapi.selldone.com/me` | Shop/user/baskets/guest/currency/language/campaign state. |
| Layout shell | all non-fullscreen | bootstrap data | Header, footer, search, content menu, support widgets, comparison, dialogs. |
| Auth | `/welcome`, protected routes | login endpoints, `GET https://xapi.selldone.com/me` | SMS/email login, token persistence, logout, auth gate. |
| Dynamic home | `/` | depends on `custom-home` | Route to blog, shop, map, avocado, hyper, community, or custom page. |

## Catalog

| Module | Routes | Primary endpoints | Must implement |
|---|---|---|---|
| Product listing | `/shop` | `GET https://xapi.selldone.com/shops/@{shop}/products/all` | Products, folders, sort, filters, search, availability, pagination. |
| Category listing | `/:category_name-category` | `GET https://xapi.selldone.com/shops/@{shop}/products/all` | Category breadcrumbs, folders, parent page. |
| Vendor listing | `/@:slug-:vendor_id` | `GET https://xapi.selldone.com/shops/@{shop}/products/all`, `GET https://xapi.selldone.com/shops/@{shop}/vendors/{vendor_id}` | Vendor header and vendor product filtering. |
| Vendor landing | `/vendor/@:slug-:vendor_id` | `GET https://xapi.selldone.com/shops/@{shop}/vendors/{vendor_id}/page` | Vendor custom page-builder landing. |
| Product detail | `/product/:product_id` | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info` | Media, variants, vendor, price, buy, sections, comments, related; implement `storefront/10-product-pricing-marketplace-options.md`. |
| Product pricing engine | `/product/:product_id`, product cards, quick-buy | product info plus basket item endpoints | Calculate current currency price from product/vendor product/variant/extra-pricing/subscription, discounts, commission, valuation, tax, and service booking multiplier. |
| Product options and variants | `/product/:product_id` | product info, `PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}/preferences` | Variant matrix, unavailable states, valuation fields, saved preferences, and basket rehydration. |
| Marketplace product vendor | `/product/:product_id`, vendor pages | product info, vendor endpoints | Filter vendor products by selected variant, select `vendor_product_id`, recalculate price/stock, and support vendor shipping at checkout. |
| Comparison | `/comparison` | `GET https://xapi.selldone.com/shops/@{shop}/products/compare` | Compare selected products and floating compare state. |
| Product map | `/map` | `GET https://xapi.selldone.com/shops/@{shop}/products/map` | Fullscreen map and product markers/cards. |

## Checkout And Orders

| Module | Routes | Primary endpoints | Must implement |
|---|---|---|---|
| Basket | `/basket/:type` | basket item/config/bill endpoints | Items, quantity, preferences, receiver, discounts, shipping, bill; implement `storefront/11-checkout-payment-account-deep-dive.md`. |
| Checkout form | `/basket/:type` | `PUT https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/config`, `GET https://xapi.selldone.com/shops/@{shop}/tax/{country}/regions` | Receiver, delivery info, custom billing, tax region, guest email, and shop-configured form fields. |
| Shipping selection | `/basket/:type` | `GET https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill`, basket config endpoint | Connect, vendor, store shipping packages, pickup-only shortcut, and location validation. |
| Payment | `/basket/:type` | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/buy/{gateway_code}`, `POST https://xapi.selldone.com/shops/@{shop}/basket/{basket_id}/bills/{bill_id}/pay/{gateway}` | Gateway selection, redirects, onsite responses, pending payment, callback. |
| Pending payment | `/basket/:type`, callback routes | gateway pending/status endpoints, receipt upload endpoint | Resume pending transactions, poll interval status, check Stripe intent, upload direct receipt, and refresh order. |
| Service checkout | `/basket/service` | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/submit` | Service-specific submit and order result. |
| Order physical | `/orders/physical/SM-:basket_id` | `GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` | Physical dashboard. |
| Order virtual | `/orders/virtual/SV-:basket_id` | `GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` | Virtual dashboard. |
| Order file | `/orders/file/SF-:basket_id` | `GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` | File/download dashboard. |
| Order service | `/orders/service/SS-:basket_id` | `GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` | Service dashboard. |
| Order subscription | `/orders/subscription/SN-:basket_id` | `GET https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}` | Subscription dashboard and portal. |
| POS order | `/orders/pos/POS-:basket_id` | `GET https://xapi.selldone.com/shops/@{shop}/pos-baskets/{basket_id}` | POS order dashboard. |
| Avocado order | `/orders/avocado/AVO-:basket_id` | `GET https://xapi.selldone.com/shops/@{shop}/avo-baskets/{avocado_id}` | Avocado order dashboard. |

## Account

| Module | Routes | Primary endpoints | Must implement |
|---|---|---|---|
| Orders history | `/user/orders/**` | `GET https://xapi.selldone.com/shops/@{shop}/basket/orders-{type}` | History tabs for all order types; pass guest order `codes` when unauthenticated. |
| Profile | `/user/profile` | `POST https://xapi.selldone.com/shops/@{shop}/customer`, `POST https://xapi.selldone.com/shops/@{shop}/subscribe`, `POST https://xapi.selldone.com/shops/@{shop}/leave` | Profile save, subscribe, leave shop. |
| Addresses | `/user/addresses` | address CRUD endpoints | List, create, edit, delete, autocomplete. |
| Returns | `/user/orders-return` | `GET https://xapi.selldone.com/shops/@{shop}/basket/orders/return-requests` | Return list and item return flow. |
| Favorites | `/user/favorites` | product wishlist/card endpoints | Favorite product list. |
| Comments | `/user/comments` | `GET https://xapi.selldone.com/shops/@{shop}/comments` | My comments list. |
| Gift cards | `/user/gift-cards` | gift card endpoints | Gift card list/add. |
| Wallets | `/user/wallets` | `GET https://xapi.selldone.com/shops/@{shop}/wallets` | Wallet balances/list. |

## Content

| Module | Routes | Primary endpoints | Must implement |
|---|---|---|---|
| Page builder | `/pages/:page_name` | `GET https://xapi.selldone.com/shops/@{shop}/pages/{page_name}` | Dynamic blocks/styles. |
| Include page | `/in/:path-:include_id` | `GET https://xapi.selldone.com/shops/@{shop}/includes/{include_id}` | Include profile/page. |
| Blog list | `/blog`, `/team/:author-:author_id` | `GET https://xapi.selldone.com/shops/@{shop}/blogs` | List, pagination, author filter. |
| Blog detail | `/blog/:slug-:blog_id`, `/blog/:blog_id` | `GET https://xapi.selldone.com/shops/@{shop}/blogs/{blog_id}` | Article render, SEO, interactions. |
| Official profiles | `/about-us`, `/terms`, `/privacy` | `GET https://xapi.selldone.com/shops/@{shop}/profiles/{type}` | Typed official content. |
| Contact | `/contact-us` | profile endpoint, `POST https://xapi.selldone.com/shops/@{shop}/contact-us` | Contact profile and form. |
| FAQ | `/faq/:tag?` | FAQ endpoints | Tags, filtered questions, ask question. |

## Special

| Module | Routes | Primary endpoints | Must implement |
|---|---|---|---|
| Avocado | `/avocado`, `/avocado/:hash` | avocado endpoints | Open/history, item edit, reserve, customer info, pay. |
| Hyper | `/hyper`, `/hyper/:basket_id` | hyper endpoints | Open cart, item edit, history, pay, order detail. |
| POS | `/pos/:basket_id` | `GET https://xapi.selldone.com/shops/@{shop}/pos-baskets/{basket_id}` | Customer POS basket view. |
| Instagram | `/instagram` | `GET https://xapi.selldone.com/shops/@{shop}/channels/instagram` | Channel page and product links. |
| Vendor map | `/map-vendors` | vendor/listing data | Fullscreen vendor map. |
| Listing | `/listing/**` | listing endpoints | Categories/items/profile/reviews/compare. |
| Community | `/community/**` | CAPI/community SDK | Home, feed, category, topic, comments. |

## Completion Labels

| Label | Meaning |
|---|---|
| `required` | Needed for normal storefront compatibility. |
| `conditional` | Needed when shop config enables the feature. |
| `auth-required` | Requires customer token. |
| `guest-compatible` | Must work for guest session when shop permits it. |
| `todo-verify` | Endpoint exists in SDK but backend status must be verified. |

