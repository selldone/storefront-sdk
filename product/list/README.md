# [Selldone Storefront SDK](../../) > [Products](../) > List Products

### Fetching Product List

To fetch a list of products, use the `XapiProductList` function. The function takes four arguments:
- `dir`: The directory or category to list products from.
- `offset`: The offset for pagination, used to skip a number of items.
- `limit`: The number of items to fetch.
- `options`: An optional object containing additional options for fetching the product list.

### Example

Here is an example of how to use the `XapiProductList` function to fetch a list of products:

```typescript
// Assuming you have an instance of XapiProduct
const xapiProduct = new XapiProduct();

// Fetch product list
xapiProduct.getProductList(null, 0, 10, { search: "example", sortBy: "title", sortDesc: true })
  .then(response => {
    console.log('Product list fetched successfully:', response);
  })
  .catch(error => {
    console.error('Error fetching product list:', error);
  });
```

### Request Structure

The `XapiProductList` function sends a request with the following structure:

- `dir`: (string | null) The directory or category to list products from.
- `offset`: (number) The offset for pagination.
- `limit`: (number) The number of items to fetch.
- `options`: (object) Additional options for fetching the product list. This can include:
    - `search`: (string) Search term to filter products.
    - `sortBy`: (string) Field to sort the products by.
    - `sortDesc`: (boolean) Whether to sort in descending order.
    - `bounds`: ([number, number, number, number]) Bounding coordinates for product location constraints.
    - `tags`: (string[]) Filter products by tags.
    - `vendor_id`: (string) Show products only for this vendor.
    - `surrounded`: (boolean) Controls category visibility.
    - `map`: (number | null) Only for this map tag ID.
    - `only_stared`: (boolean) Filter for starred products.
    - `only_in_wishlist`: (boolean) Filter for wishlist products.
    - `with_page`: (boolean) Only return page if true.
    - `with_total`: (boolean) Include total count in the response.

### Response Structure

The `XapiProductList` function returns a promise that resolves to a response object. The response object contains the following properties:

- `products`: An array of product objects.
- `folders`: An array of category objects.
- `parent`: The parent category object.
- `after`: (string | null) Search info about limited timespan.
- `before`: (string | null) Search info about limited timespan.
- `total`: (number) Total number of products available.
- `relation-mode`: (string[] | "same-category") Related list mode.
- `tax_profile`: (object | null) Extra search object.
- `valuation`: (object | null) Extra search object.
- `time_filter`: (object | null) Extra search object.