import { RecipeIngredient } from "./record.types";

export type IngredientDataType = {
  name: string
};

export type RecipeDataType = {
  name: string,
  cuisine: string,
  recipeIngredients: RecipeIngredient[]
};

export type UserCredentialsType = {
  username: string,
  password: string
};