require "test_helper"

class RecipeTest < ActiveSupport::TestCase

  test "recipe belongs to user" do
    recipe = Recipe.all.sample
    assert_not_nil recipe.user, "Expected recipe to belong to user"
  end

  test "recipe invalid" do
    user = User.find_by(username: "kenny")

    test_recipe = Recipe.create(user_id: "invalid", name: "Some dish")
    assert_not test_recipe.valid?, "Expected recipe to be invalid (invalid user)"

    test_recipe = Recipe.create(user: user)
    assert_not test_recipe.valid?, "Expected recipe to be invalid (name missing)"

    test_recipe = Recipe.create(name: "Some dish")
    assert_not test_recipe.valid?, "Expected recipe to be invalid (user missing)"

    test_recipe = Recipe.create(user: user, name: "Pancakes")
    assert_not test_recipe.valid?, "Expected recipe to be invalid (duplicate for user)"
  end

  test "recipe valid" do
    user = User.find_by(username: "kenny")

    test_recipe = Recipe.create(user: user, name: "Some dish")
    assert test_recipe.valid?, "Expected unique recipe to be valid"

    test_recipe = Recipe.create(user: user, name: "Cilantro Lime Chicken")
    assert test_recipe.valid?, "Expected recipe to be valid"
  end

end
