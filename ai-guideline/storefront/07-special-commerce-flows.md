# Special Commerce Flows

Special flows are storefront products. Implement them when shop configuration enables them; do not remove their routes from a general-purpose Selldone storefront template.

## Avocado

Routes:

| Route | Purpose |
|---|---|
| `/avocado` | Avocado inquiry/open order page. |
| `/avocado/:hash` | Customer avocado order/cart by hash. |
| `/orders/avocado/AVO-:basket_id` | Avocado order dashboard. |
| `/user/orders/avocado` | Avocado order history. |

Endpoints:

| Action | Endpoint |
|---|---|
| Open avocado | `GET https://xapi.selldone.com/shops/@{shop}/avocado` |
| History | `GET https://xapi.selldone.com/shops/@{shop}/avocados` |
| Add item | `POST https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/items` |
| Reserve | `POST https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/reserve` |
| Customer info | `GET https://xapi.selldone.com/shops/@{shop}/avocado/{hash}` |
| Update customer info | `PUT https://xapi.selldone.com/shops/@{shop}/avocado/{hash}` |
| Pay | `POST https://xapi.selldone.com/shops/@{shop}/avocado/{hash}/pay/{gateway}` |
| Order info | `GET https://xapi.selldone.com/shops/@{shop}/avo-baskets/{avocado_id}` |

UI requirements:

- Customer info form.
- Item list/add/edit/remove behavior where supported.
- Reserve action.
- Payment gateway selection.
- Order dashboard after payment/reserve.

## Hyper

Routes:

| Route | Purpose |
|---|---|
| `/hyper` | Hyper cart/open flow. |
| `/hyper/:basket_id` | Hyper order detail. |

Endpoints:

| Action | Endpoint |
|---|---|
| Open hyper | `GET https://xapi.selldone.com/shops/@{shop}/hyper` |
| Add item | `POST https://xapi.selldone.com/shops/@{shop}/hyper/items` |
| Delete item | `DELETE https://xapi.selldone.com/shops/@{shop}/hyper/items/{item_id}` |
| History | `GET https://xapi.selldone.com/shops/@{shop}/hypers` |
| Pay | `POST https://xapi.selldone.com/shops/@{shop}/hyper/{basket_id}/pay/{gateway}` |
| Basket info | `GET https://xapi.selldone.com/shops/@{shop}/hyper/{basket_id}` |

UI requirements:

- Open/current hyper basket.
- Add/delete items.
- Payment flow.
- History/order detail.

## POS

Routes:

| Route | Purpose |
|---|---|
| `/pos/:basket_id` | Customer POS basket view. |
| `/orders/pos/POS-:basket_id` | POS order dashboard. |
| `/user/orders/pos` | POS history. |

Endpoint:

`GET https://xapi.selldone.com/shops/@{shop}/pos-baskets/{basket_id}`

UI requirements:

- Fullscreen or minimal shell behavior.
- Basket/order summary.
- Auth gate where route metadata requires it.

## Instagram Channel

Route:

`/instagram`

Endpoint:

`GET https://xapi.selldone.com/shops/@{shop}/channels/instagram`

Product endpoint:

`GET https://xapi.selldone.com/shops/@{shop}/instagram/product/{product_id}`

UI requirements:

- Channel-specific layout.
- Product/social media cards.
- Links to normal product detail where appropriate.

## Maps

Routes:

| Route | Purpose |
|---|---|
| `/map` | Product map. |
| `/map-vendors` | Vendor map. |

Product map endpoint:

`GET https://xapi.selldone.com/shops/@{shop}/products/map`

UI requirements:

- Fullscreen route metadata.
- Use `initial_location` from bootstrap.
- Marker list/card preview.
- Preserve search/filter route context where supported.

## Marketplace Vendors

Routes:

| Route | Purpose |
|---|---|
| `/@:slug-:vendor_id` | Vendor listing. |
| `/vendor/@:slug-:vendor_id` | Vendor landing page. |
| `/map-vendors` | Vendor map. |

Endpoints:

| Action | Endpoint |
|---|---|
| Vendors list | `GET https://xapi.selldone.com/shops/@{shop}/vendors` |
| Vendor info | `GET https://xapi.selldone.com/shops/@{shop}/vendors/{vendor_id}` |
| Vendor page | `GET https://xapi.selldone.com/shops/@{shop}/vendors/{vendor_id}/page` |

UI requirements:

- Vendor identity/header.
- Vendor product listing filter.
- Vendor custom page when present.
- Location/map integration when vendor location exists.

