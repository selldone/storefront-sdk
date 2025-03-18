# [Selldone Storefront SDK](../../) > [Products](../) > Get Product

### Fetching Product Details

To fetch the details of a product, use the `XapiProductGet` function. The function takes two arguments:
- `product_id`: The ID of the product whose details are being fetched.
- `options`: An optional object containing additional options for fetching the product details.

### Example

Here is an example of how to use the `XapiProductGet` function to fetch the details of a product with ID `12345`:

```typescript
// Initialize the SDK
const sdk = storefront.StorefrontSDK;
sdk.Setup();

// Fetch product details
xapiProduct.getProductDetails(12345, { no_article: true })
  .then(response => {
    console.log('Product details fetched successfully:', response);
  })
  .catch(error => {
    console.error('Error fetching product details:', error);
  });
```

### Response Structure

The `XapiProductGet` function returns a promise that resolves to a response object. The response object contains the following properties:

- `product`: An object containing detailed information about the product. This includes:
    - `id`: The product ID.
    - `shop_id`: The ID of the shop.
    - `product_id`: The product's unique identifier.
    - `title`: The product title.
    - `description`: The product description.
    - `rate`: The product rating.
    - `rate_count`: The number of ratings the product has received.
    - `created_at`: The timestamp when the product was created.
    - `updated_at`: The timestamp when the product was last updated.
    - `article_pack`: An object containing article-related information such as article content, tags, and user permissions.
- `campaign_id`: The campaign ID associated with the product.
- `link_id`: The link ID associated with the product.
- `comments_count`: The number of comments on the product.
- `preferred-language`: The preferred language for the product information.
- `categories`: An array of category objects that the product belongs to.
- `vendors`: An array of vendor options for the product.
