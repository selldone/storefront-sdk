# Product Listing

Product listing powers `/shop`, category routes, vendor routes, search, folders, filters, and product cards.

## Routes

| Route | Behavior |
|---|---|
| `/shop` | Main product listing. |
| `/:category_name-category` | Category/folder listing. |
| `/@:slug-:vendor_id` | Marketplace vendor listing. |

## Primary Endpoint

`GET https://xapi.selldone.com/shops/@{shop}/products/all`

Use this endpoint for main listing, category listing, vendor listing, search, filters, and sorting.

Common query concepts:

| Query | Meaning |
|---|---|
| `search` | Search text. |
| `search_type` | Search mode/type where exposed. |
| `sort` | Sort key/order. |
| `only_available` | Availability-only filter. |
| `filter` | Structured filter payload. |
| category/folder param | Current category from route. |
| vendor param | Current vendor id from route. |
| pagination params | Page/load-more state. |

## Response Areas

| Field | Render behavior |
|---|---|
| `products` | Product card grid/list. |
| `folders` | Child category/folder cards. |
| `parent` | Current folder/category and optional custom page. |
| `total` | Pagination/load-more. |
| `relation-mode` | Folder/product relation display. |
| `tax_profile` | Tax presentation. |
| `valuation` | Custom valuation pricing mode. |
| `time_filter` | Time/availability filtering. |

## UI Behavior

- Breadcrumbs.
- Category/folder grid with load-more.
- Product cards with responsive grid/list modes.
- Search result state.
- Sort selector.
- Filter panel/sheet.
- Availability toggle.
- Local view mode persistence.
- Product quick view or quick buy where rules permit it.
- Empty state and loading skeletons.
- Vendor header on vendor listing route.
- Page-builder content when `parent.page` exists.

## Product Card Requirements

- Image fallback.
- Name/title and brand/subtitle.
- Price/discount/currency.
- Availability/stock state.
- Rating summary.
- Product badges.
- Marketplace vendor hint when relevant.
- Wishlist and compare actions.
- Link to `/product/:product_id`.

## Related Endpoints

| Use | Endpoint |
|---|---|
| Product cards | `GET https://xapi.selldone.com/shops/@{shop}/products/cards` |
| Product collection | `GET https://xapi.selldone.com/shops/@{shop}/products` |
| Search | `GET https://xapi.selldone.com/shops/@{shop}/products/search` |
| Compare data | `GET https://xapi.selldone.com/shops/@{shop}/products/compare` |
| Product map | `GET https://xapi.selldone.com/shops/@{shop}/products/map` |
| Vendor info | `GET https://xapi.selldone.com/shops/@{shop}/vendors/{vendor_id}` |

## Category Page Builder

If `parent` contains page-builder data:

1. Render page content according to page settings.
2. Keep breadcrumbs and product navigation unless explicitly hidden.
3. Preserve SEO metadata from category/page data.

## Error Handling

- Invalid category should become 404 or empty state based on backend response.
- Invalid vendor should show vendor-not-found.
- Filter changes should cancel or supersede stale requests.
- Query params should be shareable and survive reload.

