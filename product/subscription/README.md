# [Selldone Storefront SDK](../../) > [Products](../) > Subscription

## Get Content List
This module provides functionality to fetch a list of content for a subscribed product. It is useful for retrieving content behind a paywall for subscription-based products.

### Fetching the Content List

To fetch the content list for a subscription product, use the `XapiProductSubscriptionContentList` function. The function takes four arguments:
- `product_id`: The ID of the product whose content is being fetched.
- `offset`: The offset for pagination, used to skip a number of items.
- `limit`: The number of items to fetch.
- `options`: An object containing additional options for fetching the content, such as search terms, sorting criteria, and sort direction.

### Example

Here is an example of how to use the `XapiProductSubscriptionContentList` function to fetch the content list for a product with ID `12345`, with pagination and sorting options.

```typescript
// Assuming you have an instance of XapiProductSubscription
const xapiProductSubscription = new XapiProductSubscription();

// Fetch product contents
xapiProductSubscription.getContents(12345, 0, 10, { search: "example", sortBy: "title", sortDesc: true })
  .then(response => {
    console.log('Contents fetched successfully:', response);
  })
  .catch(error => {
    console.error('Error fetching contents:', error);
  });
```

### Response Structure

The `XapiProductSubscriptionContentList` function returns a promise that resolves to a response object. The response object contains the following properties:

- `contents`: An array of content objects. Each content object includes the following properties:
  - `id`: The ID of the content.
  - `shop_id`: The ID of the shop.
  - `product_id`: The ID of the product.
  - `title`: The title of the content.
  - `description`: The description of the content.
  - `rate`: The rating of the content.
  - `rate_count`: The number of ratings the content has received.
  - `created_at`: The creation timestamp of the content.
  - `updated_at`: The last updated timestamp of the content.
  - `files`: An array of file objects associated with the content. Each file object includes:
    - `id`: The ID of the file.
    - `product_id`: The ID of the product.
    - `content_id`: The ID of the content.
    - `name`: The name of the file.
    - `size`: The size of the file.
