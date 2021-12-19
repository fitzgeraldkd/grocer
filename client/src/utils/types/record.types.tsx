export type RequestStatus = 'idle' | 'loading' | 'failed'

export type ValidResponse<T> = {
  payload: T | null,
  messages: string[]
};

type ValidRecord = {
  id: number
};

export interface PendingIngredient {
  id?: number,
  name: string
};
export type Ingredient = PendingIngredient & ValidRecord;

export interface PendingInstruction {
  id?: number,
  content: string
};
export type Instruction = PendingInstruction & ValidRecord;

export interface PendingRecipe {
  id?: number,
  name: string,
  cuisine: string
};
export type Recipe = PendingRecipe & ValidRecord;

export interface PendingRecipeIngredient {
  id?: number,
  recipe_id: number,
  ingredient_id: number,
  ingredient_name: string,
  quantity: number,
  units: string,
  prepared: string,
  group_name: string
};
export type RecipeIngredient = PendingRecipeIngredient & ValidRecord;

export interface PendingUser {
  id?: number,
  username: string,
  // firebase_id: string,
  email: string
};
export type User = PendingUser & ValidRecord;

export interface PendingIngredientDetailed extends PendingIngredient {
  recipes: PendingRecipe[]
};
export interface IngredientDetailed extends Ingredient {
  recipes: Recipe[]
};

export interface PendingRecipeDetailed extends PendingRecipe {
  instructions: PendingInstruction[],
  ingredients: PendingRecipeIngredient[]
};
export interface RecipeDetailed extends Recipe {
  instructions: Instruction[],
  ingredients: RecipeIngredient[]
};

export interface PendingUserDetailed extends PendingUser {
  recipes: PendingRecipe[],
  ingredients: PendingIngredient[]
};
export interface UserDetaild extends User {
  recipes: Recipe[],
  ingredients: Ingredient[]
}
