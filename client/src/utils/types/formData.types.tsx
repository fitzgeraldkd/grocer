import { Direction, RecipeIngredient, PendingDirection, PendingRecipeIngredient } from "./record.types";

export type IngredientDataType = {
  name: string
};

export type RecipeDataType = {
  name: string,
  cuisine: string,
  recipe_ingredients: (RecipeIngredient | PendingRecipeIngredient)[],
  directions: (Direction | PendingDirection)[]
  // recipeIngredients: RecipeIngredient[]
};

export interface RecipeIngredientData extends PendingRecipeIngredient {
  name: string
}

export type UserCredentialsType = {
  username: string,
  password: string
};