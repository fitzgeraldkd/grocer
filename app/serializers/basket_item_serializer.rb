class BasketItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :units, :name, :ingredient_id

  def name
    object.ingredient.name
  end
end
