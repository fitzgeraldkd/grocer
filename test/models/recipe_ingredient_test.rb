require "test_helper"

class RecipeIngredientTest < ActiveSupport::TestCase

  test "recipe_ingredient belongs to recipe" do
    recipe_ingredient = RecipeIngredient.all.sample
    assert_not_nil recipe_ingredient.recipe, "Expected recipe_ingredient to belong to recipe"
  end

  test "recipe_ingredient belongs to ingredient" do
    recipe_ingredient = RecipeIngredient.all.sample
    assert_not_nil recipe_ingredient.ingredient, "Expected recipe_ingredient to belong to ingredient"
  end

  test "recipe_ingredient invalid" do
    user_a = User.find_by(username: "kenny")
    user_a_recipe = user_a.recipes.sample
    user_a_ingredient = user_a.ingredients.sample

    user_b = User.find_by(username: "fitzgeraldkd")
    user_b_recipe = user_b.recipes.sample
    user_b_ingredient = user_b.ingredients.sample

    test_recipe_ingredient = RecipeIngredient.create(recipe: user_a_recipe, ingredient_id: "invalid")
    assert_not test_recipe_ingredient.valid?, "Expected recipe_ingredient to be invalid (invalid ingredient)"

    test_recipe_ingredient = RecipeIngredient.create(recipe_id: "invalid", ingredient: user_a_ingredient)
    assert_not test_recipe_ingredient.valid?, "Expected recipe_ingredient to be invalid (invalid recipe)"

    test_recipe_ingredient = RecipeIngredient.create(recipe: user_a_recipe)
    assert_not test_recipe_ingredient.valid?, "Expected recipe_ingredient to be invalid (ingredient missing)"

    test_recipe_ingredient = RecipeIngredient.create(ingredient: user_a_ingredient)
    assert_not test_recipe_ingredient.valid?, "Expected recipe_ingredient to be invalid (recipe missing)"

    test_recipe_ingredient = RecipeIngredient.create(recipe: user_a_recipe, ingredient: user_b_ingredient)
    assert_not test_recipe_ingredient.valid?, "Expected recipe_ingredient to be invalid (recipe and ingredient must belong to same user)"
  end

  test "recipe_ingredient valid" do
    user_a = User.find_by(username: "kenny")
    user_a_recipe = user_a.recipes.sample
    user_a_ingredient = user_a.ingredients.sample

    test_recipe_ingredient = RecipeIngredient.create(recipe: user_a_recipe, ingredient: user_a_ingredient)
    assert test_recipe_ingredient.valid?, "Expected recipe_ingredient to be valid"
  end

end
