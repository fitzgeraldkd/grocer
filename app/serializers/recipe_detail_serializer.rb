class RecipeDetailSerializer < ActiveModel::Serializer
  attributes :id, :name, :cuisine
  has_many :recipe_ingredients, serializer: RecipeIngredientSerializer
end
