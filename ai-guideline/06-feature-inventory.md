# Storefront Feature Inventory

Use this as a coverage checklist for a complete Selldone storefront.

## Foundation

| Feature | Required behavior |
|---|---|
| Shop bootstrap | Load shop info, baskets, pending transactions, location, club, order state, guest code. |
| Guest session | Store and send `S-Guest`; allow guest checkout where shop permits it. |
| Customer auth | SMS/email login, current user load, logout, auth route gate. |
| Localization | Send `X-Localization`, load language pack, preserve selected language. |
| Currency | Display selected currency, fetch rates, persist changes. |
| Attribution | Preserve campaign, link, email, affiliate, referrer headers. |
| Private shop | Show access/login gate before protected content. |
| PWA/version | Handle update/version prompts where implemented. |
| Popups | Show shop popups and persist seen ids. |

## Products And Catalog

| Feature | Required behavior |
|---|---|
| Main listing | `/shop` grid/list with filters, sort, search, availability. |
| Category listing | `/:category_name-category` with breadcrumbs, folders, parent page. |
| Vendor listing | `/@:slug-:vendor_id` with vendor context and products. |
| Vendor landing | `/vendor/@:slug-:vendor_id` custom vendor page. |
| Product detail | `/product/:product_id` with overview, media, buy panel, sections. |
| Comparison | `/comparison` and floating compare entry. |
| Product map | `/map` fullscreen product map. |
| Price engine | Currency conversion, commission, active discount windows, extra-pricing tiers, valuation modifiers, tax display, and service booking day multiplier. |
| Variant engine | Multi-dimensional option selection, image variants, availability filters, existing-basket variant rehydration, and auto-select of one eligible variant. |
| Marketplace vendors | Vendor product selection, vendor-specific price/stock, variant-specific vendor filtering, selected `vendor_product_id`, and vendor shipping packages. |
| Custom valuation/options | Product `price_input=custom`, structured valuation rows, unavailable combinations, number/select/switch fields, and saved preferences. |
| Subscription plans | Currency-filtered subscription prices, selected `price_id`, membership contents, authenticated checkout requirement, and portal after purchase. |
| Related/cross-sell | Related products, categories, cross-sells. |
| Wishlist | Customer product favorite behavior. |
| Waiting list | Product availability subscription. |
| Ratings/comments | Product rating and comment surfaces. |
| Auctions | Product auction bid where supported. |
| Membership contents | Subscription/file content list and ratings. |

## Checkout And Orders

| Feature | Required behavior |
|---|---|
| Basket by type | `/basket/:type` for physical, virtual, file, service, subscription. |
| Item management | Add/update/delete, preferences, messages, uploaded files. |
| Bill calculation | Bill endpoint, discounts, shipping, tax, payable. |
| Payment | Gateway selection, buy/pay bill, redirects/callbacks. |
| Checkout form | Shop-configured checkout form, country override form, defaults, required fields, note/text/select/switch rows. |
| Shipping packages | Connect shipping, vendor shipping, store shipping, pickup-only handling, custom delivery, extra shipping counts, and invalid-location states. |
| Billing form | Same-as-receiver or custom billing, business/tax id, country/state/region loading, and tax region lookup. |
| Payment modes | Gift-card paid, free order, COD, redirect, QR/direct, queued/pending, interval check, and onsite gateway flows. |
| Pending payment | Pending transaction resume, gateway status polling, Stripe intent check, and direct receipt upload. |
| Service submit | Submit service basket where applicable. |
| Receiver info | Receiver/address/customer info per basket type. |
| Location | Basket location for delivery/map flows. |
| Share/import | Share basket/order and import basket. |
| Subscription portal | Subscription management/portal endpoint. |
| Order dashboards | Typed dashboards for physical, virtual, file, service, subscription, POS, avocado. |
| Order histories | Account order history by type. |
| Returns | Return list, item return, upload return file. |
| Confirm received | Customer confirms order received. |

## Customer Account

| Feature | Required behavior |
|---|---|
| Account shell | `/user` layout and navigation. |
| Login modes | Shop-configured Google, Apple, Facebook, Selldone, SMS OTP, email OTP, select-user, and register-new-user flows. |
| Profile | View/edit profile, subscribe/unsubscribe to shop. |
| Addresses | CRUD, autocomplete, geo-to-address. |
| Favorites | Wishlist/favorite product list. |
| Comments | Customer comments list. |
| Gift cards | List and add gift cards. |
| Wallets | Wallet list and balances. |
| Notifications | FCM registration where supported. |
| Guest orders | Guest email requirement, local guest order codes, and order history query by `codes` when no user is authenticated. |

## Content And Marketing

| Feature | Required behavior |
|---|---|
| Dynamic home | `/` resolves from `custom-home`. |
| Page builder | `/pages/:page_name` custom pages. |
| Include page | `/in/:path-:include_id`. |
| Blog list | `/blog` and blog home mode. |
| Author/team blog | `/team/:author-:author_id`. |
| Blog detail | `/blog/:slug-:blog_id` and `/blog/:blog_id`. |
| Official profiles | About, terms, privacy, contact. |
| Contact form | Customer message submission. |
| FAQ | Tags, list, optional tag route, ask question. |
| Article interactions | Like, star, claps, report, comment where enabled. |

## Special Commerce And Channels

| Feature | Required behavior |
|---|---|
| Avocado | Inquiry/open order, hash cart, reserve, pay, history, dashboard. |
| Hyper | Open cart, item add/delete, history, pay, order page. |
| POS | `/pos/:basket_id` cart view and `/orders/pos/POS-:basket_id` dashboard. |
| Instagram | `/instagram` channel page and product info. |
| Marketplace vendors | Vendors list, vendor info, vendor page. |
| Map vendors | `/map-vendors` fullscreen map. |
| Listing directory | Categories, items, item profile, reviews, badges, compare. |
| Community | Home, feed, comments, category, topic routes. |

## Minimum Viable Storefront

1. Bootstrap: `GET https://xapi.selldone.com/shops/@{shop}/info` and guest/token headers.
2. Routes: `/`, `/shop`, `/:category_name-category`, `/product/:product_id`, `/basket/:type`, order details, `/user/profile`, `/blog`, official profiles, 404.
3. Products: listing, search, filter, sort, product detail, variant selection, add to basket.
4. Checkout: item management, bill, receiver info, payment.
5. Account: login, current user, order histories, addresses.
6. Content: page builder, blog, FAQ/contact.

Do not call implementation complete until shop-enabled special modes are implemented or explicitly disabled from shop config.

