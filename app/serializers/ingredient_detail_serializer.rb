class IngredientDetailSerializer < ActiveModel::Serializer
  attributes :id, :name, :recipes
  # has_many :recipes, serializer: RecipeSerializer

  def recipes
    object.recipes.uniq{|recipe| recipe.id}.map do |recipe|
      ::RecipeSerializer.new(recipe).attributes
    end
  end
end
