# [Selldone Storefront SDK](../../) > [Products](../) > Rate (User Feedback)

## Submit Rate
This module provides functionality to submit a rating for a purchased product. It allows users to rate products they have purchased, and updates the product's overall rating accordingly.

### Submitting a Product Rating

To submit a rating for a product, you can use the `submitMyRate` function. The function takes two arguments:
- `product_id`: The ID of the product being rated.
- `user_rating`: An object where the key is a string representing the user and the value is a number between 1 and 5 representing the rating.

### Example

Here is an example of how to use the `submitMyRate` function to submit a rating for a product with ID `12345` and a user rating of `5` for the user `user123`.

```javascript
window.$storefront.products.rate.submitMyRate(12345, { "user123": 5 })
  .then(response => {
    console.log('Rating submitted successfully:', response);
  })
  .catch(error => {
    console.error('Error submitting rating:', error);
  });
```

### Response Structure

The `submitMyRate` function returns a promise that resolves to a response object. The response object contains the following properties:

- `success`: A boolean indicating whether the rating submission was successful.
- `my_ratings`: An array of objects representing the user's ratings. Each object contains `rate_id` (number) and `value` (number).
- `ratings`: An array of rating objects. Each object contains `id`, `name`, `value`, and `count` properties.
- `rate_count`: The total number of ratings for the product.
- `rate`: The overall rating of the product.
