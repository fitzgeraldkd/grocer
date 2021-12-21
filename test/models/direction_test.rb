require "test_helper"

class DirectionTest < ActiveSupport::TestCase

  test "direction belongs to recipe" do
    Direction.all.each do |direction|
      assert_not_nil direction.recipe, "Expected direction to belong to user"
    end
  end

  test "direction invalid" do
    recipe = Recipe.find_by(name: 'Cilantro Lime Chicken')

    test_direction = Direction.create(recipe_id: "invalid", content: "Preheat oven.", order: 0)
    assert_not test_direction.valid?, "Expected direction to be invalid (invalid recipe)"

    test_direction = Direction.create(recipe: recipe, order: 0)
    assert_not test_direction.valid?, "Expected direction to be invalid (content missing)"

    test_direction = Direction.create(content: "Preheat oven.", order: 0)
    assert_not test_direction.valid?, "Expected direction to be invalid (recipe missing)"

    test_direction = Direction.create(recipe: recipe, content: "Preheat oven.")
    assert_not test_direction.valid?, "Expected direction to be invalid (order missing)"
    
    # recipe = Recipe.find_by(name: 'Pancakes')

    # test_direction = Direction.create(recipe: recipe, content: "Heat griddle.", order: 0)
    # assert_not test_direction.valid?, "Expected direction to be invalid (duplicate order)"
  end

  test "direction valid" do
    recipe = Recipe.find_by(name: 'Cilantro Lime Chicken')

    test_direction = Direction.create(recipe: recipe, content: "Preheat oven.", order: 0)
    assert test_direction.valid?, "Expected direction to be valid"
    
    recipe = Recipe.find_by(name: 'Pancakes')

    test_direction = Direction.create(recipe: recipe, content: "Heat griddle.", order: 2)
    assert test_direction.valid?, "Expected direction to be valid"
  end

end
