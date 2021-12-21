require "test_helper"

class BasketItemTest < ActiveSupport::TestCase

  test "basket_item belongs to ingredient" do
    BasketItem.all.each do |basket_item|
      assert_not_nil basket_item.ingredient, "Expected basket_item to belong to ingredient"
    end
  end

  test "basket_item invalid" do
    ingredient = User.all.sample.ingredients.sample
    test_basket_item = BasketItem.create(ingredient_id: "invalid", quantity: 1, units: "cups")
    assert_not test_basket_item.valid?, "Expected basket_item to be invalid (invalid ingredient)"
  end

  test "basket_item valid" do
    ingredient = User.all.sample.ingredients.sample

    test_basket_item = BasketItem.create(ingredient: ingredient, quantity: 1, units: "cups")
    assert test_basket_item.valid?, "Expected basket_item to be valid"

    test_basket_item = BasketItem.create(ingredient: ingredient, quantity: 1)
    assert test_basket_item.valid?, "Expected basket_item to be valid (without units)"

    test_basket_item = BasketItem.create(ingredient: ingredient, units: "cup")
    assert test_basket_item.valid?, "Expected basket_item to be valid (without quantity)"

    test_basket_item = BasketItem.create(ingredient: ingredient)
    assert test_basket_item.valid?, "Expected basket_item to be valid (without units or quantity)"
  end

end
