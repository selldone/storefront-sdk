# UI Patterns

This document captures storefront UI behavior that must survive framework changes. It is a functional UX contract, not a visual theme.

## App Shell

The shell must provide:

- Campaign/announcement banner.
- Primary shop header with logo/name, navigation, search, account, and basket entry.
- Content header/top menu when shop settings enable it.
- Footer unless route metadata disables it.
- Mobile bottom navigation where appropriate.
- Floating product comparison button.
- Support/contact widgets.
- Payment dialog and callback host.
- Login-required dialog.
- Global notification side panel.
- Cookie consent and PWA/version handling.
- Popup/campaign viewer with `seen_pops` tracking.
- Fullscreen image viewer.
- Share-order retrieval dialog.

## Header And Search

| Condition | Behavior |
|---|---|
| `search` enabled | Show global product search. |
| `fullscreen` page | Hide normal header/footer or use minimal chrome. |
| `transparent_header` | Overlay header on hero/background. |
| `light_header` / `dark` | Adjust contrast. |
| Mobile | Compact navigation, bottom nav, basket/account shortcuts. |

Search should navigate to compatible listing results and preserve query params.

## Product Cards

Product cards should include, when data exists:

- Product image with fallback.
- Title and subtitle/brand.
- Price, discount, compare price, currency.
- Availability and stock state.
- Variant hint or selected variant.
- Rating summary.
- Badges/campaign labels.
- Marketplace vendor hint.
- Quick add/buy only when product type and shop rules allow it.
- Wishlist and comparison actions.

## Product Listing Layout

Required listing UX:

- Breadcrumbs from category/folder hierarchy.
- Category/folder tiles with pagination/load-more.
- Product grid/list with skeletons.
- Filter side panel or mobile sheet.
- Sort selector.
- `only_available` toggle.
- Search text and search type awareness.
- Local persistence of preferred view mode.
- Empty state.
- Vendor header on vendor listing routes.
- Custom page-builder rendering when parent folder has a page.

## Product Detail Layout

| Zone | Content |
|---|---|
| Breadcrumbs | Category/product path. |
| Media | Image/video gallery and fullscreen viewer. |
| Overview | Title, brand, type, rating, badges, share, optional QR/admin actions. |
| Buy panel | Price, variants, vendor, quantity, preferences, valuation/subscription selectors, tax/shipping hints, add-to-basket. |
| Promotions | Cashback, coupons, offers, incentivise blocks. |
| Details | Specs, includes, pros/cons, guide, shipping, warranty. |
| Article | Product article/page-builder content. |
| Membership/file content | Subscription or file-specific downloadable/locked content. |
| Comments | Customer comments and ratings. |
| Related | Cross-sells, related products, related categories. |

## Variant And Vendor Selection

- Variant selection changes price, availability, media, SKU, and basket payload.
- Marketplace products may require vendor selection before checkout.
- Service products can require preferences, schedule/time, messages, or files.
- Subscription products can require plan/period selection.
- Valuation/custom-price products need custom price or quote inputs before buy.

## Basket UI

| Type | UX differences |
|---|---|
| Physical | Shipping, address, receiver, delivery method, pickup, tax. |
| Virtual | Receiver/contact info without physical shipping. |
| File | Download/access after payment. |
| Service | Preferences, messages/files, service submission, scheduling. |
| Subscription | Plan, recurring payment, subscription portal behavior. |

Required basket states:

- Empty basket.
- Loading bill.
- Invalid item or out-of-stock item.
- Missing receiver/address.
- Payment pending or redirecting.
- Payment failed/retry.
- Successful order link.
- Guest email required.

## Account UI

The account shell should expose:

- Order tabs by type.
- Profile editor and shop subscription/unsubscribe.
- Address manager with autocomplete/map support.
- Return requests and item return flow.
- Wishlist/favorites.
- My comments.
- Gift cards.
- Wallets.

Use login gate for protected pages.

## Content UI

- Page-builder pages can include structured blocks and custom styles.
- Include pages use `/in/:path-:include_id`.
- Official profiles use typed content: about, privacy, terms, contact.
- Blog supports list, author/team filter, slug detail, and legacy id detail.
- FAQ supports tags and user question submission.

## Special Flow UI

| Flow | UI requirement |
|---|---|
| Avocado | Inquiry/order form by hash, reserve, item edit, payment, order dashboard. |
| Hyper | Open cart, item edit, history, payment, order detail. |
| POS | Scan/open POS basket and show authenticated POS order detail. |
| Instagram | Channel-specific product/social feed and product links. |
| Map | Fullscreen product/vendor map with route chrome disabled. |
| Listing | Directory categories, filters, location, item profile, reviews, compare. |
| Community | Home/feed/category/topic pages integrated into storefront routing. |

## Responsive Requirements

- Mobile listing must keep filters/search accessible.
- Mobile product detail should keep add-to-basket accessible near the bottom.
- Checkout should keep validation visible and reduce form fragmentation.
- Fullscreen map/POS flows should avoid footer/header overflow.
- Desktop listing should support side filters and wide product grids.

## Accessibility And SEO

- Preserve semantic links for product, category, vendor, blog, and order routes.
- Use SSR/server metadata where framework supports it.
- Use meaningful alt text from product/shop media.
- Dialogs must trap focus and be dismissible when not blocking.
- Do not hide payment/auth errors in toast-only UI.

