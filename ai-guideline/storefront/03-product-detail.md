# Product Detail

Product detail powers `/product/:product_id`. It must handle product types, variants, vendors, subscriptions, valuation, media, and checkout payloads. For exact pricing, marketplace, option, valuation, subscription, and buy-payload rules, read `storefront/10-product-pricing-marketplace-options.md` before implementation.

## Primary Endpoint

`GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info`

## Required Page Zones

| Zone | Required behavior |
|---|---|
| Breadcrumbs | Product/category path. |
| Media gallery | Images/videos, thumbnails, fullscreen viewer. |
| Overview | Title, brand, type, badges, rating, share. |
| Variant selector | Option/variant selection with price/stock/media updates. |
| Vendor selector | Marketplace vendor selection when multi-vendor. |
| Price panel | Price, discount, currency, tax, shipping hints. |
| Buy panel | Quantity, preferences, add-to-basket/buy action. |
| Promotions | Cashback, coupons, offers, incentivise sections. |
| Details | Specs, includes, pros/cons, guide, shipping, warranty. |
| Content/article | Product article/page-builder content. |
| Membership/file content | Subscription or file-specific content. |
| Comments | Ratings and customer feedback. |
| Related | Cross-sells, related products, related categories. |

## Product Type Differences

| Product type | Required behavior |
|---|---|
| Physical | Stock, shipping, variants, basket item. |
| Virtual | No physical shipping; may need receiver/contact info. |
| File | File access after payment and content support. |
| Service | Preferences, messages/files, scheduling or form fields. |
| Subscription | Plan/period selection, membership content, portal after purchase. |

## Variant And Availability

- Variant affects price, availability, image/media, SKU, and basket payload.
- Unavailable variants should disable buy and expose waiting list where enabled.
- Auction products expose bid flow when required.
- Valuation/custom-price products need required input before buy.

## Key Endpoints

| Action | Endpoint |
|---|---|
| Full product | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info` |
| Product card | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/info-card` |
| Rating | `POST https://xapi.selldone.com/shops/@{shop}/products/{product_id}/set-my-rating` |
| Add wishlist | `PUT https://xapi.selldone.com/shops/@{shop}/products/{product_id}/wishlist` |
| Remove wishlist | `DELETE https://xapi.selldone.com/shops/@{shop}/products/{product_id}/wishlist` |
| Add availability waiting list | `PUT https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-be-available` |
| Remove availability waiting list | `DELETE https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-be-available` |
| Add auction waiting list | `PUT https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-auction` |
| Remove auction waiting list | `DELETE https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-auction` |
| Membership contents | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/contents` |
| Content rating | `POST https://xapi.selldone.com/shops/@{shop}/products/{product_id}/contents/{content_id}/rate` |
| Subscribe | `POST https://xapi.selldone.com/shops/@{shop}/products/{product_id}/subscribe` |
| File temporary URL | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/files/{file_id}` |
| Add/update basket item | `PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}` |

## Add To Basket Flow

1. Validate product type, variant, vendor, quantity, and preferences.
2. Ensure guest code or customer token is available.
3. Send `PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}`.
4. Update local basket state from response or refresh bootstrap/basket state.
5. Show success action: continue shopping or go to `/basket/:type`.
6. If auth is required, show login gate and resume action after login.

## Article Interaction Endpoints

| Action | Endpoint |
|---|---|
| Like article | `POST https://xapi.selldone.com/articles/{article_id}/like` |
| Star article | `POST https://xapi.selldone.com/articles/{article_id}/star` |
| Claps | `POST https://xapi.selldone.com/articles/{article_id}/claps` |
| Report | `POST https://xapi.selldone.com/articles/{article_id}/report/{category}` |
| Add comment | `POST https://xapi.selldone.com/article/{article_id}/comment` |

## SEO

Use product data for title, description, canonical URL, Open Graph image, and structured product data when framework supports it.

