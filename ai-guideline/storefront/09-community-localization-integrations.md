# Community, Localization, And Integrations

This guide covers storefront behavior beyond normal product/catalog XAPI calls.

## Community Routes

| Route | Purpose |
|---|---|
| `/community` | Community home/categories. |
| `/community/feed` | Community feed. |
| `/community/comments` | My community comments. |
| `/community/:category_id-:category_slug?` | Category topics. |
| `/community/:category_id-:category_slug?/:topic_id-:topic_slug?` | Topic detail. |

Community data is driven by community/CAPI modules, not only XAPI builders.

Implementation requirements:

- Read `selldone-capi` runtime config.
- Keep routes inside storefront route tree.
- Reuse storefront auth/customer context.
- Keep SEO-friendly category/topic params.
- Gate my-comments or write actions when auth is required.

## Localization

| Action | Endpoint/Header |
|---|---|
| Language pack | `GET https://xapi.selldone.com/shops/@{shop}/language/{lang}` |
| Request localization | `X-Localization` header |

Requirements:

- Preserve selected language across navigation.
- Send `X-Localization` on XAPI requests.
- Use backend language pack where shop-specific labels/content exist.
- Do not translate backend enum values before sending them back to API.

## Currency

| Action | Endpoint |
|---|---|
| Set currency | `PUT https://xapi.selldone.com/shops/@{shop}/currency` |
| Rates | `GET https://xapi.selldone.com/shops/@{shop}/currency/rates` |

Requirements:

- Keep selected currency in state and local storage.
- Display price using shop/product currency rules.
- Treat backend bill/payment values as source of truth.
- Refresh product/basket pricing when currency changes if backend requires it.

## Attribution And Campaign Headers

| Header | Source/use |
|---|---|
| `S-Referrer` | Referrer tracking. |
| `S-Location` | Location context. |
| `S-Temp-Access` | Temporary/private access. |
| `S-Pops` | Seen popup ids. |
| `S-Campaign-Id` | Campaign id. |
| `S-Link-Id` | Link id. |
| `S-Email-Id` | Email id. |
| `S-Affiliate-Id` | Affiliate id. |
| `S-Guest` | Guest checkout/session code. |

Do not drop these headers during framework migration.

## Notifications

Endpoint:

`POST https://xapi.selldone.com/shops/@{shop}/fcm/token`

Use it only when notification permission and FCM setup are available.

## Share Order Retrieval

Share/import endpoints:

| Action | Endpoint |
|---|---|
| Share basket/order | `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_id}/share` |
| Import basket/order | `POST https://xapi.selldone.com/shops/@{shop}/basket/{type}/import` |

The app shell should be able to open shared basket/order links and retrieve/import them when supported by backend response.

## Runtime Services

| Config | Use |
|---|---|
| `selldone-xapi` | Storefront XAPI base. |
| `selldone-capi` | Community API base. |
| `selldone-gapi` | Growth/analytics API base. |
| `service-url` | Service/backend helpers outside direct XAPI. |
| `cdn` | Media delivery. |

Keep these injectable per deployment. Do not hardcode development URLs in generated storefronts.

