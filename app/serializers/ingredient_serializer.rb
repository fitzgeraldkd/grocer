class IngredientSerializer < ActiveModel::Serializer
  # puts self
  attributes :id, :name, :recipe_count

  def recipe_count
    object.recipes.count
  end
end
