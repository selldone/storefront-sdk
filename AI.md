
# Create Website With LLMs Instructions Set
Use this guide to create a website with the Selldone SDK and leverage the power of the Selldone platform to build a fully functional online store.


### Step 1: Include the Selldone SDK Script
Add the following JavaScript snippet right before the closing `</body>` tag in your HTML to load the SDK:

```html
<script src="https://cdn.selldone.com/sdk.js"></script>
```

### Step 2: Add Essential Meta Tags
Include these essential meta tags in the `<head>` of every page of your website:

```html
<!-- 🏬 Shop Name -->
<meta name="shop-name" content="toysworld">

<!-- 🎗 Prefix address of app (leave empty if none) -->
<meta name="shop-prefix-address" content="">

<!-- 📰 Shop custom page -->
<meta name="shop-custom-page" content="shop">

<!-- ――― API endpoints configuration -->
<meta content="https://selldone.com" name="shop-host">
<meta content="https://gapi.selldone.com" name="selldone-gapi">
<meta content="https://xapi.selldone.com" name="selldone-xapi">
<meta content="https://iframe.selldone.com" name="selldone-iframe">
<meta content="https://capi.selldone.com" name="selldone-capi">

<!-- CDN Configuration -->
<meta content="https://selldone.com/cdn-shop-images" name="selldone-cdn-images">
<meta content="https://selldone.com/cdn-shop-jsons" name="selldone-cdn-jsons">
<meta content="https://selldone.com/cdn-videos" name="selldone-cdn-videos">
<meta content="https://selldone.com/cdn-shop-temp-files" name="selldone-cdn-temp-files">

<!-- CDN Thumbnails & Resources Optimization -->
<meta content="true" name="storage-redirect">
<meta content="https://selldone.com" name="storage-redirect-host">
<meta content="true" name="storage-redirect-thumbnails">
```

Change `toysworld` to your actual shop name on Selldone.

### Step 3: Initialize the SDK
Initialize the SDK on page load:

```javascript
const sdk = storefront.StorefrontSDK;
sdk.Setup();
```

### Recommended Pages to Create:

Your store should include the following pages with data fetched directly from the SDK:
- **Homepage** (show featured products, banners)
- **Product Details** (show single product details)
- **Cart & Checkout** (cart functionality)
- **Orders Management**
- **Blog Page & Posts**



## SDK Methods

### Fetching Products List
```javascript
window.$storefront.products
    .optimize(600) // Cache data for 600 seconds
    .then(response => console.log("Products:", response))
    .catch(error => console.error("Error fetching products:", error));
```


#### **Basic Parameters**

| Parameter | Type               | Description                                      |
|-----------|--------------------|--------------------------------------------------|
| `dir`     | `string` or `null` | The directory or category to list products from. |
| `offset`  | `number`           | The offset for pagination (skip items).          |
| `limit`   | `number`           | The number of items to fetch.                    |

#### **Optional Filters**

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

#### **Response Structure**

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


### Fetching Product Details
```javascript
window.$storefront.products.getProductDetails(12345)
    .then(response => console.log("Product details:", response))
    .catch(error => console.error("Error:", error));
```



