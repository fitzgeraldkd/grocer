class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :units, :prepared, :group_name, :ingredient_name
  
  def ingredient_name
    self.object.ingredient.name
  end

end
