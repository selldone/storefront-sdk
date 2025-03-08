# [Selldone Storefront SDK](../../) > [Products](../) > List Products

## **Fetching Product List**

To retrieve a list of products, use the `XapiProductList` function. This function allows you to fetch products based on
categories, pagination, and additional filtering options.

### **Function Parameters**

The function accepts four arguments:

- **`dir`** *(string or null)* – The directory or category to retrieve products from. Use `null` to fetch from the home
  category.
- **`offset`** *(number)* – The number of items to skip (useful for pagination).
- **`limit`** *(number)* – The number of products to fetch.
- **`options`** *(object, optional)* – Additional filtering and sorting options.

---

## **Usage Example**

Here’s how to use `XapiProductList` to fetch a paginated list of products:

```typescript
// Initialize the SDK
const sdk = storefront.StorefrontSDK;
sdk.Setup();

// Fetch product list with sorting and pagination
window.$storefront.products
    .optimize(600) // Cache products for 600 seconds (optional)
    .list(
        null, // Category ID (null for homepage)
        0,    // Offset (pagination)
        10,   // Limit (number of products to fetch)
        {search: null, sortBy: "title", sortDesc: true} // Options
    )
    .then(response => {
        console.log("Product list fetched successfully:", response);
    })
    .catch(error => {
        console.error("Error fetching product list:", error);
    });
```

---

## **Request Parameters**

The `XapiProductList` function allows for various filtering and sorting options:

### **Basic Parameters**

| Parameter | Type               | Description                                      |
|-----------|--------------------|--------------------------------------------------|
| `dir`     | `string` or `null` | The directory or category to list products from. |
| `offset`  | `number`           | The offset for pagination (skip items).          |
| `limit`   | `number`           | The number of items to fetch.                    |

### **Optional Filters**

| Option             | Type               | Description                                                  |
|--------------------|--------------------|--------------------------------------------------------------|
| `search`           | `string`           | Filter products by a search term.                            |
| `sortBy`           | `string`           | Field to sort the products by (e.g., `price`, `title`).      |
| `sortDesc`         | `boolean`          | `true` for descending order, `false` for ascending.          |
| `bounds`           | `array of numbers` | Bounding coordinates to filter by location.                  |
| `tags`             | `array of strings` | Filter products by specific tags.                            |
| `vendor_id`        | `string`           | Fetch products from a specific vendor.                       |
| `surrounded`       | `boolean`          | Controls category visibility.                                |
| `map`              | `number` or `null` | Filter by map tag ID.                                        |
| `only_starred`     | `boolean`          | Fetch only products marked as favorite by the user.          |
| `only_in_wishlist` | `boolean`          | Fetch only products added to the wishlist.                   |
| `with_page`        | `boolean`          | If `true`, only returns a page reference.                    |
| `with_total`       | `boolean`          | If `true`, includes the total product count in the response. |

---

## **Response Structure**

The function returns a **Promise** that resolves to an object containing product details:

| Field           | Type               | Description                             |
|-----------------|--------------------|-----------------------------------------|
| `products`      | `array`            | List of fetched product objects.        |
| `folders`       | `array`            | List of related categories.             |
| `parent`        | `object` or `null` | The parent category, if applicable.     |
| `after`         | `string` or `null` | Search metadata for a limited timespan. |
| `before`        | `string` or `null` | Search metadata for a limited timespan. |
| `total`         | `number`           | Total count of products available.      |
| `relation-mode` | `array of strings` | Mode for related products.              |
| `tax_profile`   | `object` or `null` | Additional tax-related data.            |
| `valuation`     | `object` or `null` | Extra valuation information.            |
| `time_filter`   | `object` or `null` | Time-based filtering metadata.          |
