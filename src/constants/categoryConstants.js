export const CategoryNameMinLength = 1;
export const CategoryNameMaxLength = 50;
export const CategoryDescriptionMinLength = 1;
export const CategoryDescriptionMaxLength = 100;

export const CategoriesUrl = "https://localhost:44343/api/Categories";

export const SuccessfullyCreated = "Successfully created a new category!";
export const FailedCreated = "Field 'Name' and 'Description' are required. Please fill them and try again!";

export const CategoryWrongNameMessage = `Category name must be between ${CategoryNameMinLength} and ${CategoryNameMaxLength} characters!`;
export const CategoryWrongDescriptionMessage = `Category description must be between ${CategoryDescriptionMinLength} and ${CategoryDescriptionMaxLength} characters!`;
export const NoCategoriesInTheSystemYet = "No categories in the system yet!";
export const SuccessfullyDeleted = "Successfully deleted category";
export const SuccessfullyEdited = "Successfully edited category";