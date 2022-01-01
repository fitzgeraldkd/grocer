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
  name: string,
  recipe_count?: number
};
export type Ingredient = PendingIngredient & ValidRecord;

export interface PendingDirection {
  id?: number,
  content: string,
  order: number
};
export type Direction = PendingDirection & ValidRecord;

export interface PendingRecipe {
  id?: number,
  name: string,
  cuisine: string,
  course: string,
  vegetarian: boolean,
  vegan: boolean,
  source?: string
};
export type Recipe = PendingRecipe & ValidRecord;

export interface PendingRecipeIngredient {
  id?: number,
  recipe_id?: number,
  ingredient_id?: number,
  quantity: number,
  units: string,
  prepared: string,
  group_name: string,
  order: number
};
export type RecipeIngredient = PendingRecipeIngredient & ValidRecord & {
  recipe_id: number,
  ingredient_id: number
};

export interface PendingBasketItem {
  id?: number
  ingredient_id: number
  name: string,
  quantity: number,
  units: string
};
export type BasketItem = PendingBasketItem & ValidRecord;

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
  directions: PendingDirection[],
  recipe_ingredients: PendingRecipeIngredient[]
};
export interface RecipeDetailed extends Recipe {
  directions: Direction[],
  recipe_ingredients: RecipeIngredientDetailed[]
};

export interface PendingUserDetailed extends PendingUser {
  recipes: PendingRecipe[],
  ingredients: PendingIngredient[]
};
export interface UserDetailed extends User {
  recipes: Recipe[],
  ingredients: Ingredient[]
};

export interface PendingRecipeIngredientDetailed extends PendingRecipeIngredient {
  ingredient: PendingIngredient
};
export interface RecipeIngredientDetailed extends RecipeIngredient {
  ingredient: Ingredient
}
