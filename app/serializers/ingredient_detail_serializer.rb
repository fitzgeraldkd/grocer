class IngredientDetailSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :recipes, serializer: RecipeSerializer
end
