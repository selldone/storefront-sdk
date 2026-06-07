# Listing Directory

The listing directory is a storefront surface under `/listing`. It behaves like a directory of listing items rather than normal shop products.

## Routes

| Route | Purpose |
|---|---|
| `/listing` | Listing root/home. |
| `/listing/compare` | Compare listing items. |
| `/listing/:category?` | Category listing. |
| `/listing/:category/:item` | Listing item profile. |

## Endpoints

| Action | Endpoint | Status |
|---|---|---|
| Info | `GET https://xapi.selldone.com/shops/@{shop}/listing/info` | Active in SDK. |
| Categories | `GET https://xapi.selldone.com/shops/@{shop}/listing/categories` | Active in SDK. |
| Items | `GET https://xapi.selldone.com/shops/@{shop}/listing/items` | Active in SDK. |
| Item profile | `GET https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}` | Active in SDK. |
| Reviews | `GET https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}/reviews` | Active in SDK. |
| Post review | `POST https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}/reviews` | Active in SDK. |
| Delete review | `DELETE https://xapi.selldone.com/shops/@{shop}/listing/items/{item_id}/reviews/{review_id}` | Active in SDK. |
| Badges | `GET https://xapi.selldone.com/shops/@{shop}/listing/badges` | Active in SDK. |
| Compare | `GET https://xapi.selldone.com/shops/@{shop}/listing/compare` | SDK local `/xapi` route normalized to full URL. |
| Message | `POST https://xapi.selldone.com/shops/@{shop}/listing/messages` | `todo-verify`; verify backend availability. |
| Search | `GET https://xapi.selldone.com/shops/@{shop}/listing/search` | `todo-verify`; verify backend availability. |

## Query Concepts

| Query/filter | Meaning |
|---|---|
| `search` | Text search. |
| `category_id` | Current category. |
| `lat`, `lng`, `radius_km` | Location filtering. |
| `filters` | Structured listing filters. |
| `sortBy`, `sortDesc` | Sorting. |
| pagination params | Page/load-more. |

## UI Requirements

- Listing root loads info and categories.
- Category route shows category context and subcategories.
- Items list supports search, filters, sort, pagination, and location radius where enabled.
- Item profile renders details, media, badges, contact/actions, and reviews.
- Compare route renders selected listing items side-by-side.
- Review submission requires customer auth when backend requires it.
- Message/contact actions should remain guarded by `todo-verify` endpoint availability until verified.

## Compare Behavior

- Keep selected listing item ids in local state or query params.
- Fetch compare data with `GET https://xapi.selldone.com/shops/@{shop}/listing/compare`.
- Provide remove/clear actions.
- Do not mix listing compare with product comparison.

## Error Handling

- Unknown category: show category-not-found or 404.
- Unknown item: show item-not-found or 404.
- Location permission denied: keep non-location listing usable.
- `todo-verify` endpoint failure should degrade gracefully.

