# [Selldone Storefront SDK](../../) > [Basket](../) > Delete Item

The `XapiBasketDeleteItem` function enables the removal of products or product variants from the user's shopping basket on Selldone's platform. It supports customizing the removal process with specific currency options.

## Function Signature
```typescript
function XapiBasketDeleteItem(
  this: XapiBasket,
  product_id: number,
  variant_id: number | null,
  options?: XapiBasketDeleteItemTypes.IOption
): Promise<XapiBasketDeleteItemTypes.IResponse>
```

## Parameters
- **product_id** (number): The ID of the product to delete from the basket.
- **variant_id** (number | null): The ID of the specific product variant, or `null` if not applicable.
- **options** (XapiBasketDeleteItemTypes.IOption, optional): Additional options for the product deletion, such as currency.

### Options Structure
```typescript
interface IOption {
  currency?: keyof typeof Currency;
}
```

## Response Structure
```typescript
interface IResponse {
  success: boolean;
  basket: Basket;
  bill: Basket.ICalculatedBill;
}
```
- **success** (boolean): Indicates the success of the operation.
- **basket** (Basket): The updated basket object.
- **bill** (Basket.ICalculatedBill): Calculated details of the bill after the item deletion.

## Example Usage
```typescript
window.$storefront.basket
  .deleteItem(product_id, variant_id)
  .then(({ basket, bill }) => {
    this.setBasket(basket);
    this.setBasketBill(basket, bill);
    if (callbackSuccess) callbackSuccess(basket);
  })
  .catch((error) => {
      NotificationService.showLaravelError(error);
    if (callbackError) callbackError(error);
  });
```
