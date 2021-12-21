require "test_helper"

class Api::RecipeIngredientsControllerTest < ActionDispatch::IntegrationTest

  def assert_recipe_ingredient_payload(payload)
    # TODO: determine if recipe and ingredient should be included
    ['id', 'quantity', 'units', 'prepared', 'group_name'].each do |key|
      assert payload.key?(key), "Expected recipe_ingredient payload to have #{key} key"
    end
  end

  # ~~~ INDEX ~~~

  # test "should not get index" do
  #   assert_raises ActionController::RoutingError do
  #     get "/api/recipe_ingredients" 
  #   end
  # end

  # ~~~ SHOW ~~~

  # test "should not get show" do
  #   assert_raises ActionController::RoutingError do
  #     get "/api/recipe_ingredients/1" 
  #   end
  # end

  # ~~~ CREATE ~~~

  test "should post create" do
    assert_routing({method: 'post', path: "/api/recipe_ingredients"}, {controller: "api/recipe_ingredients", action: "create"})
  end

  test "should have created status on create if logged in and authorized" do
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    ingredient = user.ingredients.sample
    post "/api/login", params: { username: "kenny" }
    post "/api/recipe_ingredients", params: { recipe_id: recipe.id, ingredient_id: ingredient.id, order: 42 }
    payload = assert_response_format response, 201
    assert_recipe_ingredient_payload payload
  end

  test "should have forbidden status on create if logged in but not authorized" do
    user = User.find_by(username: "fitzgeraldkd")
    recipe = user.recipes.sample
    ingredient = user.ingredients.sample
    post "/api/login", params: { username: "kenny" }
    post "/api/recipe_ingredients", params: { recipe_id: recipe.id, ingredient_id: ingredient.id }
    payload = assert_response_format response, 403
    assert_nil payload, 'Expected empty payload'
  end

  test "should have not_found status on create if invalid" do
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    post "/api/login", params: { username: "kenny" }
    post "/api/recipe_ingredients", params: { recipe_id: recipe.id }
    payload = assert_response_format response, 404
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unauthorized status on create if not logged in" do
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    ingredient = user.ingredients.sample
    post "/api/recipe_ingredients", params: { recipe_id: recipe.id, ingredient_id: ingredient.id }
    payload = assert_response_format response, 401
    assert_nil payload, 'Expected empty payload'
  end

  # ~~~ UPDATE ~~~

  test "should patch update" do
    assert_routing({method: 'patch', path: "/api/recipe_ingredients/1"}, {controller: "api/recipe_ingredients", action: "update", id: "1"})
    assert_routing({method: 'patch', path: "/api/recipe_ingredients/42"}, {controller: "api/recipe_ingredients", action: "update", id: "42"})
  end

  test "should have ok status on update if valid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    # recipe_ingredient = RecipeIngredient.where("recipe.user.id = ?", user.id).sample
    recipe_ingredient = user.recipes.sample.recipe_ingredients.sample
    patch "/api/recipe_ingredients/#{recipe_ingredient.id}", params: { quantity: 42 }
    payload = assert_response_format response
    assert_recipe_ingredient_payload payload
  end

  test "should have not_found status on update if not found" do
    post "/api/login", params: { username: "kenny" }
    patch "/api/ingredients/invalid_ingredient", params: { quantity: 42 }
    payload = assert_response_format response, 404
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unprocessable_entity status on update if invalid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    recipe_ingredient = user.recipes.sample.recipe_ingredients.sample
    patch "/api/recipe_ingredients/#{recipe_ingredient.id}", params: { recipe_id: "" }
    payload = assert_response_format response, 422
    assert_nil payload, 'Expected empty payload'
  end

  test "should have forbidden status on update if logged in but not as the owner" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    recipe_ingredient = user.recipes.sample.recipe_ingredients.sample
    patch "/api/recipe_ingredients/#{recipe_ingredient.id}", params: { quantity: 42 }
    payload = assert_response_format response, 403
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unauthorized status on update if not logged in" do
    user = User.find_by(username: "kenny")
    recipe_ingredient = user.recipes.sample.recipe_ingredients.sample
    patch "/api/recipe_ingredients/#{recipe_ingredient.id}", params: { quantity: 42 }
    payload = assert_response_format response, 401
    assert_nil payload, 'Expected empty payload'
  end

  # ~~~ DESTROY ~~~

  test "should delete destroy" do
    assert_routing({method: 'delete', path: "/api/recipe_ingredients/1"}, {controller: "api/recipe_ingredients", action: "destroy", id: "1"})
    assert_routing({method: 'delete', path: "/api/recipe_ingredients/42"}, {controller: "api/recipe_ingredients", action: "destroy", id: "42"})
  end

  test "should have ok status on destroy if logged in and authorized" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    recipe_ingredient = user.recipes.sample.recipe_ingredients.sample
    delete "/api/recipe_ingredients/#{recipe_ingredient.id}"
    payload = assert_response_format response
    assert_nil payload, 'Expected empty payload'
  end

  test "should have forbidden status on destroy if logged in but not authorized" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    recipe_ingredient = user.recipes.sample.recipe_ingredients.sample
    delete "/api/recipe_ingredients/#{recipe_ingredient.id}"
    payload = assert_response_format response, 403
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unauthorized status on destroy if not logged in" do
    user = User.find_by(username: "kenny")
    recipe_ingredient = user.recipes.sample.recipe_ingredients.sample
    delete "/api/recipe_ingredients/#{recipe_ingredient.id}"
    payload = assert_response_format response, 401
    assert_nil payload, 'Expected empty payload'
  end

end
