import { RecipeIngredientRecordType } from "./record.types";

export type IngredientDataType = {
  name: string
};

export type RecipeDataType = {
  name: string,
  cuisine: string,
  recipeIngredients: RecipeIngredientRecordType[]
};

export type UserCredentialsType = {
  username: string,
  password: string
};