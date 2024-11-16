# [Selldone Storefront SDK](../../) > [Basket](../) > Add Item



The `XapiBasketAddItem` function enables the addition of products or product variants to the user's shopping basket on Selldone's platform. It supports customizing the addition with specific preferences, vendor identifiers, and pricing options.

## Function Signature
```typescript
function XapiBasketAddItem(
  this: XapiBasket,
  product_id: number,
  variant_id: number | null,
  count: number,
  options?: XapiBasketAddItemTypes.IOption
): Promise<XapiBasketAddItemTypes.IResponse>
```

## Parameters
- **product_id** (number): The ID of the product to add to the basket.
- **variant_id** (number | null): The ID of the specific product variant, or `null` if not applicable.
- **count** (number): The number of units of the product to add.
- **options** (XapiBasketAddItemTypes.IOption, optional): Additional options for the product addition, such as currency, preferences, vendor product ID, and price ID.

### Options Structure
```typescript
interface IOption {
  currency?: keyof typeof Currency;
  preferences?: BasketItem.IPreferences | null;
  vendor_product_id?: number | null;
  price_id?: number | null;
}
```

## Response Structure
```typescript
interface IResponse {
  error: boolean;
  error_msg: string | null;
  refresh?: boolean;
  success: boolean;
  basket: Basket;
  bill: Basket.ICalculatedBill;
}
```
- **error** (boolean): Indicates if there was an error during the operation.
- **error_msg** (string | null): A message describing the error, if any occurred.
- **refresh** (boolean, optional): Specifies whether a refresh of the basket data is needed.
- **success** (boolean): Indicates the success of the operation.
- **basket** (Basket): The updated basket object.
- **bill** (Basket.ICalculatedBill): Calculated details of the bill after the item addition.

## Example Usage
```typescript
window.$storeunfront.basket
  .addItem(product_id, variant_id, count, {
    preferences: preferences,
    vendor_product_id: vendor_product_id, // 🟣 Marketplace 🟣
    price_id: subscription_price_id, // 🎗️ Subscription
  })
  .then(({ basket, bill, refresh, error, error_msg }) => {
    if (basket) {
      this.setBasket(basket);
      this.setBasketBill(basket, bill);
      if (callbackSuccess) callbackSuccess(basket);
    }

    if (error) {
      NotificationService.showErrorAlert(null, error_msg);
      if (callbackError) callbackError(error_msg!);
    }

    if (refresh) this.fetchBasketAndShop(); // Important! Fetch data from server.
  })
  .catch((error) => {
      NotificationService.showLaravelError(error);
    if (callbackError) callbackError(error);
  });
```



