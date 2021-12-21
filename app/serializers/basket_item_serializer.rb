class BasketItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :units, :name

  def name
    object.ingredient.name
  end
end
