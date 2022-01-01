class RecipeDetailSerializer < ActiveModel::Serializer
  attributes :id, :name, :cuisine, :course, :vegetarian, :vegan, :source
  has_many :directions
  has_many :recipe_ingredients, serializer: RecipeIngredientSerializer

  def directions
    object.directions.order(:order)
  end

  def recipe_ingredients
    object.recipe_ingredients.order(:order)
  end
end
