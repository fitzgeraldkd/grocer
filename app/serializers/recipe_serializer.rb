class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :name, :cuisine, :course, :vegetarian, :vegan
end
