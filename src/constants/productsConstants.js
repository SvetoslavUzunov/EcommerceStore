export const ProductNameMinLength = 1;
export const ProductNameMaxLength = 100;
export const ProductPriceMinValue = 1;
export const ProductPriceMaxValue = 1000000;

export const ProductsUrl = "https://localhost:44343/Api/Products";

export const SuccessfullyCreated = 'Successfully created product!';
export const FailedCreated = 'Name, Description and Price are required. Please fill them and try again.';

export const SuccessfullyEdited = 'Successfully edited product!';

export const SuccessfullyDeleted = 'Successfully deleted product!';

export const ProductWrongNameMessage = `Product name must be between ${ProductNameMinLength} and ${ProductNameMaxLength} characters!`;
export const ProductWrongPriceMessage = `Product price must be between ${ProductPriceMinValue} and ${ProductPriceMaxValue.toFixed(2)}!`;

export const LocalStorageKey = 'products';

export const SuccessfullyAddedToCart = 'Successfully added to cart!';
export const AlreadyAddedInCart = 'You already added this product!';

export const NoProductsFound = 'No products found!';