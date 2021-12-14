require "test_helper"

class IngredientTest < ActiveSupport::TestCase

  test "ingredient belongs to user" do
    ingredient = Ingredient.all.sample
    assert_not_nil ingredient.user, "Expected ingredient to belong to user"
  end

  test "ingredient invalid" do
    user = User.find_by(username: "kenny")

    test_ingredient = Ingredient.create(user_id: "invalid", name: "Garlic")
    assert_not test_ingredient.valid?, "Expected ingredient to be invalid (invalid user)"
    
    test_ingredient = Ingredient.create(user: user)
    assert_not test_ingredient.valid?, "Expected ingredient to be invalid (name missing)"
    
    test_ingredient = Ingredient.create(name: "garlic")
    assert_not test_ingredient.valid?, "Expected ingredient to be invalid (user missing)"
    
    test_ingredient = Ingredient.create(user: user, name: "Flour")
    assert_not test_ingredient.valid?, "Expected ingredient to be invalid (duplicate for user)"
  end

  test "ingredient valid" do
    user = User.find_by(username: "kenny")

    test_ingredient = Ingredient.create(user: user, name: "Garlic")
    assert test_ingredient.valid?, "Expected unique ingredient to be valid"
    
    test_ingredient = Ingredient.create(user: user, name: "Chicken")
    assert test_ingredient.valid?, "Expected ingredient to be valid"
  end

end
