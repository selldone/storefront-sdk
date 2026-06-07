# Shop Shell And Home

This guide covers bootstrap, layout, route shell, and home resolution.

## Bootstrap

First request:

`GET https://xapi.selldone.com/shops/@{shop}/info`

Store these response areas when present:

| Data | Use |
|---|---|
| `shop` | Theme, title, logo, rules, marketplace/content settings. |
| `baskets` | Active baskets by product type. |
| `pending_transactions` | Payment callback or unfinished payment UX. |
| `initial_location` | Delivery and map defaults. |
| `club` | Loyalty/customer club state. |
| `orders_state` | Account/order badges. |
| `seen_pops` | Popup campaign suppression. |
| `guest_code` | Store and send as `S-Guest`. |

If a customer token exists, also call:

`GET https://xapi.selldone.com/me`

## Config Inputs

| Input | Required behavior |
|---|---|
| `shop-name` | Use as `@{shop}` in endpoints. |
| `shop-prefix-address` | Prefix every public route. |
| `custom-home` | Select `/` home behavior. |
| `selldone-xapi` | Optional API base override. Default `https://xapi.selldone.com`. |
| `cdn` | Media URL generation. |
| `iframe` | Embedded mode. |

## Dynamic Home

| `custom-home` | Render |
|---|---|
| `shop` or empty | Product listing. |
| `blog` | Blog list. |
| `avocado` | Avocado inquiry. |
| `hyper` | Hyper cart. |
| `community` | Community home. |
| `map` | Product map. |
| numeric id | Custom page-builder landing. |

## Shell Components

- Header with logo, navigation, search, account, basket.
- Footer, disabled by route metadata where needed.
- Content header/top menu if shop settings provide it.
- Campaign banner and popup system.
- Support/contact floating widgets.
- Product comparison floating button.
- Login-required dialog.
- Payment dialog/callback host.
- Notification side panel.
- Cookie consent and PWA/version prompt.
- Fullscreen image viewer.

## Route Metadata

| Metadata | Shell behavior |
|---|---|
| `footer: false` | Hide footer. |
| `fullscreen: true` | Hide normal shell, use full viewport. |
| `search: true` | Show global search. |
| `comparison: true` | Show product comparison affordance. |
| `support: true` | Show support/contact widgets. |
| `requiresAuth: true` | Gate with login. |
| `transparent_header` | Overlay header. |
| `light_header` / `dark` | Adjust colors. |

## Private Shop Handling

1. Check shop privacy/access flags from bootstrap.
2. Keep app shell minimal when restricted.
3. Show login/access gate.
4. Do not fetch protected product/order/customer data.
5. Resume requested route after login when possible.

## Implementation Notes

- Keep bootstrap idempotent.
- Scope guest code to shop storage.
- Do not clear baskets on login; reconcile after bootstrap refresh.
- Make API client available before page data loaders run.

