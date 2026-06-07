# Product Pricing, Marketplace, Options, And Buy Payload

This deep-dive is extracted from the production product page and storefront components. Use it when building product detail, quick-buy, marketplace vendor selection, subscription plans, custom pricing forms, and add-to-basket behavior.

## Source Trace

| Source | What to extract |
|---|---|
| `src/Applications/Storefront/pages/product/StorefrontPageProduct.vue` | Product page loader and page-level composition. |
| `@selldone/components-vue/storefront/product/overview/SProductOverview.vue` | Orchestrates variant, vendor, preferences, subscription price, basket item, and buy panel. |
| `@selldone/components-vue/storefront/product/section/price/SProductSectionPrice.vue` | Product price preview, marketplace price source, discount percent, service booking multiplier. |
| `@selldone/components-vue/storefront/product/section/valuation/SProductSectionValuation.vue` | Custom pricing form and basket item preference save. |
| `@selldone/components-vue/storefront/product/section/variants/SProductSectionVariants.vue` | Smart variant matrix, filter mode, auto-select logic. |
| `@selldone/components-vue/storefront/product/section/extra-pricing/SProductSectionExtraPricings.vue` | Quantity/tier-based extra pricing. |
| `@selldone/components-vue/storefront/vendor/selector/SSmartSelectVendor.vue` | Marketplace vendor product selector and vendor price display. |
| `@selldone/components-vue/storefront/product/button/SShopBuyButton.vue` | Add/remove basket payload, guest gate, express checkout, area/volume count calculation. |
| `src/Applications/Storefront/mixin/StorefrontMixin.ts` | `AddToBasket` and `RemoveFromBasket` integration with SDK basket helper. |
| `@selldone/sdk-storefront/basket/add-item/XapiBasketAddItem.ts` | Final add-item request body. |
| `@selldone/core-js/helper/price/PriceHelper.ts` | Client-side price preview algorithm. Backend bill remains final source of truth. |

## Runtime Product State

A full product page needs these local states:

| State | Source behavior |
|---|---|
| `current_variant` | Selected `product_variant`; reset/store on product change and route auto-buy. |
| `selection_values` | Smart variant selections, one entry per variant dimension. |
| `preferences` | Service preferences, valuation/custom pricing values, area/volume dimensions. |
| `selected_vendor_product_id` | Marketplace selected vendor product id. |
| `selected_vendor_product` | Resolved vendor product object; filtered by current variant when variant exists. |
| `selected_subscription_price` | Chosen subscription plan for subscription products. |
| `corresponding_basket_item` | Current product+variant item already in basket. |
| `filter.available` | Optional variant filter for only available variants. |

The UI must rehydrate `preferences`, selected vendor, selected subscription plan, and quantity from `corresponding_basket_item` when the item already exists in the basket.

## Product Fields Used By Pricing

| Field | Meaning |
|---|---|
| `product.price` | Base price when no selected variant/vendor override exists. |
| `product.currency` | Currency of base product price. |
| `product.commission` | Added before discount and currency conversion. |
| `product.discount`, `dis_start`, `dis_end` | Product discount amount and active range. |
| `product.pricing` | Pricing display mode, including estimation/agreement starting-price hints. |
| `product.price_input` | `default`, `custom`, `area`, or `volume`. |
| `product.price_label` | Extra price label shown beside price. |
| `product.unit`, `unit_float` | Unit label and decimal quantity support. |
| `product.quantity` | Base availability when no variant/vendor override exists. |
| `product.tax_profile` | Product-level tax profile; falls back to shop tax. |
| `product.locations` | Country/postal restrictions before buy. |
| `product.informs` | Waiting/availability state per variant. |
| `product.valuation` | Custom pricing form structure and pricing rules. |
| `product.product_variants` | Variant-specific price, currency, commission, discount, quantity, image, option values. |
| `product.vendor_products` | Marketplace vendor-specific stock/price tied to optional variant. |
| `product.subscription_prices` | Subscription plans, filtered by selected user currency. |
| `product.extra_pricings` or variant/vendor extra pricing | Quantity tier pricing. |

## Client Price Preview Algorithm

Use this only for display and UX. Final checkout totals must come from `GET https://xapi.selldone.com/shops/@{shop}/basket/{type}/bill`.

1. If `selected_subscription_price` exists, require its currency to match selected currency and use `selected_subscription_price.price`.
2. Else if a selected marketplace `vendor_product` exists, calculate as product-like price using the vendor product object and original `product.valuation`.
3. Else if a selected variant exists and `variant.pricing` is true, use variant price source.
4. Else use product price source.
5. Base amount is `price + commission`.
6. Convert from source currency to selected user currency with shop exchange rates.
7. Apply active discount from variant or product.
8. Apply extra pricing override when a quantity tier is active.
9. Apply valuation/custom-pricing rules from `preferences.valuation`.
10. Round by target currency precision.

## Valuation Custom Pricing

Valuation is active when `product.price_input === 'custom'` and `product.valuation.structure` exists.

| Form row type | UI behavior | Pricing behavior |
|---|---|---|
| empty/text | Text field. | No price effect unless backend interprets it. |
| `number` | Numeric input. | If `pricing` and `factor` exist, add `factor * selected_value`. |
| `select` | Select input; can be multiple. | If `pricing`, read `lookup[selected_value]`; add it when `sum` is true, otherwise multiply current price by it. |
| `switch` | Smart yes/no switch. | If `pricing`, read `lookup.true` or `lookup.false`; add or multiply by `sum`. |
| `note` | Informational row in checkout forms; valuation form itself mainly handles field rows. | No price effect. |

Constraint rules:

- `valuation.conditions.unavailable` contains pair constraints such as `A:B`.
- A select/switch option is disabled when selecting it conflicts with already selected values.
- Select fields without available options are hidden.
- Existing basket item preferences must be loaded back into the form.
- Existing basket item preference updates are saved with `PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}/preferences` and body `{ basket_id, variant_id, preferences }`.

## Area And Volume Pricing

For physical products with `price_input`:

| Mode | UI input | Count sent to basket |
|---|---|---|
| `default` | Quantity selector. | Selected count. |
| `custom` | Quantity selector plus valuation form. | Selected count plus `preferences.valuation`. |
| `area` | Width and length. | `dim_1 * dim_2`; also store `preferences.dim_1`, `preferences.dim_2`, `preferences.dim_3`. |
| `volume` | Width, length, height. | `dim_1 * dim_2 * dim_3`; also store dimensions in preferences. |

If `unit_float` is true, quantity inputs allow decimals.

## Service Booking Price Multiplier

For service products whose `outputs.type` maps to a service form including `booking`, the displayed price is multiplied by the absolute day difference between `preferences.dates[0]` and `preferences.dates[1]`.

Do not send this as a separate price override. Send preferences and count; backend bill remains final.

## Extra Pricing Tiers

Extra pricing is a quantity-tier override resolved from product, selected variant, or selected vendor product.

| Behavior | Requirement |
|---|---|
| List tiers | Use `ExtraPricingHelper.GetListOfExtraPricings(product, current_variant, selected_vendor_product)`. |
| Match active tier | Use selected quantity to find the active tier. |
| Display range | Show intervals like `min ~ nextMin - 1` and `+ min`. |
| Select tier | Trigger buy with the tier `min` quantity. |
| Preview price | Calculate tier as price source with product valuation. |

## Variant Selection

Variant UI supports two modes:

| Mode | Behavior |
|---|---|
| `ShopThemeVariantsMode.select` | Variant filter plus mini variant rows; initially show first three unless expanded. |
| Standard matrix | Render one row per active variant dimension such as color, volume, weight, pack, quantity. |

Rules:

- Available dimensions are discovered from `ProductVariants` values present in `product.product_variants`.
- Variant values are sorted by volume, weight, pack, or quantity when present.
- `filter.available` can hide variants with `quantity <= 0`.
- In color-only image mode, all color variants need images and color swatches overlay images.
- A value becomes visually unavailable when no eligible variant remains for current selections.
- When only one eligible variant remains, auto-select it as `current_variant`.
- If a basket item exists for the product, select its variant first; otherwise select first variant.

## Marketplace And Multi-Vendor Products

Marketplace behavior is active when `shop.model === BusinessModel.MARKETPLACE.code` and product has `vendor_products`.

Rules:

- Filter `vendor_products` by current variant: `vendor_product.variant_id === current_variant.id` when variant exists.
- If the basket already has the product+variant, preselect `basket_item.vendor_product_id`.
- If there is no selected vendor and vendor products exist, auto-select the first vendor product.
- Changing vendor for an item already in the basket must re-submit add/update basket with the existing count.
- Vendor selector displays vendor name, description, optional icon, link to vendor listing/landing, pickup address when marketplace pickup exists, and calculated vendor price.
- Product price preview must calculate against `selected_vendor_product`, not the base product, while still passing original `product.valuation`.
- Vendor stock overrides product/variant quantity for buy availability.

## Tax, Shipping Hints, And Location Restrictions

| Feature | Source behavior |
|---|---|
| Tax profile | Use `product.tax_profile` when enabled, otherwise `shop.tax`. Show included label or fixed VAT/shipping VAT. |
| Free shipping hint | For physical products, show shop transportations with `free_shipping` except pickup. |
| Pickup hint | Show pickup transportations for normal shops; hide product-level pickup hint in marketplace mode. |
| Product location restriction | If `product.locations` exists, require selected country and postal code before showing buy button. |
| Location save | Save product location with `POST https://xapi.selldone.com/shops/@{shop}/baskets/{basket_type}/my-location`. |

## Waiting, Wishlist, Auction, And File Buy States

| State | Endpoint |
|---|---|
| Add waiting for availability | `PUT https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-be-available` |
| Remove waiting for availability | `DELETE https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-be-available` |
| Add waiting for auction | `PUT https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-auction` |
| Remove waiting for auction | `DELETE https://xapi.selldone.com/shops/@{shop_id}/products/{product_id}/waiting-auction` |
| Product rating | `POST https://xapi.selldone.com/shops/@{shop}/products/{product_id}/set-my-rating` |
| Remove wishlist | `DELETE https://xapi.selldone.com/shops/@{shop}/products/{product_id}/wishlist` |
| Download purchased file | `GET https://xapi.selldone.com/shops/@{shop}/products/{product_id}/files/{file_id}` |

File products with `product.buy_file` show a purchased/download list instead of normal add-to-basket.

## Add To Basket Payload

Endpoint:

`PUT https://xapi.selldone.com/shops/@{shop}/basket/{product_id}`

Body:

| Field | Required | Meaning |
|---|---|---|
| `currency` | yes | Selected storefront currency. |
| `variant_id` | nullable | Current variant id or null. |
| `count` | yes | Quantity, area, or volume-derived count. |
| `preferences` | nullable | Valuation, service, dimensions, user inputs. |
| `vendor_product_id` | nullable | Marketplace selected vendor product id. |
| `price_id` | nullable | Selected subscription price id. |

Response handling:

- If `basket` exists, update local basket state.
- If `bill` exists, store it as basket bill.
- If `error` is true, still preserve returned `basket`/`bill` when present, then show `error_msg`.
- If `refresh` is true, re-run shop bootstrap/basket fetch because backend may have removed or normalized items.
- If checkout is express, navigate to `/basket/:type` after add.
- If quick-buy mode is active, open cart side menu after success.

Remove endpoint:

`DELETE https://xapi.selldone.com/shops/@{shop}/basket/{product_id}`

Send selected `variant_id` so backend removes the exact item.

## Buy Gate

Before add/update basket:

1. If no authenticated user and guest checkout is disabled, show login gate.
2. Validate required variant selection.
3. Validate product location restriction.
4. Validate subscription plan for subscription products.
5. Validate valuation/service required preferences.
6. Validate vendor selection for marketplace products when vendor products exist.
7. Submit add/update basket and use backend response to update state.
