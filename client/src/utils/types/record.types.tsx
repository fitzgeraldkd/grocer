export type RequestStatus = 'idle' | 'loading' | 'failed'

export type ValidResponse = {
  payload: {},
  messages: string[]
};

export type ValidRecordType = {
  id: number
};

export type IngredientRecordType = {
  id?: number
  name: string
};

export type IngredientRelationsType = {
  recipes: RecipeRecordType[]
}

export type RecipeRecordType = {
  id?: number,
  name: string,
  cuisine: string
};

export type RecipeIngredientRecordType = {
  id?: number,
  recipe_id: number,
  ingredient_id: number,
  quantity: number,
  units: string,
  prepared: string,
  group_name: string
};

export type UserRecordType = {
  id?: number,
  username: string,
  // firebase_id: string,
  email: string
};