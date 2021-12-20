require "test_helper"

class Api::RecipesControllerTest < ActionDispatch::IntegrationTest

  def assert_recipe_payload(payload, detailed=true)
    # assert_equal session[:user_id], payload['user_id'], "Should only return recipes belonging to logged in user"
    assert payload.key?('id'), 'Expected recipe payload to have id key'
    assert payload.key?('name'), 'Expected recipe payload to have name key'
    assert payload.key?('cuisine'), 'Expected recipe payload to have cuisine key'
    if detailed
      assert payload['directions'].kind_of?(Array), 'Expected recipe payload to have array of directions'
      assert payload['recipe_ingredients'].kind_of?(Array), 'Expected recipe payload to have array of ingredients'
    else
      assert_not payload.key?('directions'), 'Expected recipe payload to not have array of directions'
      assert_not payload.key?('recipe_ingredients'), 'Expected recipe payload to not have array of ingredients'
    end
  end

  # ~~~ INDEX ~~~

  test "should get index" do
    assert_routing({method: 'get', path: "/api/recipes"}, {controller: "api/recipes", action: "index"})
  end

  test "should have ok status on index if logged in" do
    post "/api/login", params: { username: "kenny" }
    get "/api/recipes"
    payload = assert_response_format response
    payload.each do |recipe|
      assert_recipe_payload recipe, false
    end
  end

  test "should have unauthorized status on index if not logged in" do
    get "/api/recipes"
    payload = assert_response_format response, 401
  end

  # ~~~ SHOW ~~~

  test "should get show" do
    assert_routing({method: 'get', path: "/api/recipes/1"}, {controller: "api/recipes", action: "show", id: "1"})
    assert_routing({method: 'get', path: "/api/recipes/42"}, {controller: "api/recipes", action: "show", id: "42"})
  end

  test "should have ok status on show if belongs to logged in user" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    get "/api/recipes/#{recipe.id}"
    payload = assert_response_format response
    assert_recipe_payload payload
  end

  test "should have forbidden status on show if logged in as different user" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    recipe = user.recipes.sample
    get "/api/recipes/#{recipe.id}"
    payload = assert_response_format response, 403
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unauthorized status on show if not logged in" do
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    get "/api/recipes/#{recipe.id}"
    payload = assert_response_format response, 401
    assert_nil payload, 'Expected empty payload'
  end

  # ~~~ CREATE ~~~

  test "should post create" do
    assert_routing({method: 'post', path: "/api/recipes"}, {controller: "api/recipes", action: "create"})
  end

  test "should have created status on create if valid" do
    post "/api/login", params: { username: "kenny" }
    post "/api/recipes", params: { name: "Hot Chocolate" }
    payload = assert_response_format response, 201
    assert_recipe_payload payload
  end

  test "should have unprocessable_entity status on create if invalid" do
    post "/api/login", params: { username: "kenny" }
    post "/api/recipes", params: { name: "Pancakes" }
    payload = assert_response_format response, 422
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unauthorized status on create if not logged in" do
    post "/api/recipes", params: { name: "Hot Chocolate" }
    payload = assert_response_format response, 401
    assert_nil payload, 'Expected empty payload'
  end

  # ~~~ UPDATE ~~~

  test "should patch update" do
    assert_routing({method: 'patch', path: "/api/recipes/1"}, {controller: "api/recipes", action: "update", id: "1"})
    assert_routing({method: 'patch', path: "/api/recipes/42"}, {controller: "api/recipes", action: "update", id: "42"})
  end

  test "should have ok status on update if valid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    patch "/api/recipes/#{recipe.id}", params: { name: "Chocolate Chip Pancakes" }
    payload = assert_response_format response
    assert_recipe_payload payload
  end

  test "should have not_found status on update if not found" do
    post "/api/login", params: { username: "kenny" }
    patch "/api/recipes/invalid_recipe", params: { name: "French Toast" }
    payload = assert_response_format response, 404
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unprocessable_entity status on update if invalid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    patch "/api/recipes/#{recipe.id}", params: { name: "" }
    payload = assert_response_format response, 422
    assert_nil payload, 'Expected empty payload'
  end

  test "should have forbidden status on update if logged in but not as the owner" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    recipe = user.recipes.sample
    patch "/api/recipes/#{recipe.id}", params: { name: "French Toast" }
    payload = assert_response_format response, 403
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unauthorized status on update if not logged in" do
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    patch "/api/recipes/#{recipe.id}", params: { name: "Beef" }
    payload = assert_response_format response, 401
    assert_nil payload, 'Expected empty payload'
  end

  # ~~~ DESTROY ~~~

  test "should delete destroy" do
    assert_routing({method: 'delete', path: "/api/recipes/1"}, {controller: "api/recipes", action: "destroy", id: "1"})
    assert_routing({method: 'delete', path: "/api/recipes/42"}, {controller: "api/recipes", action: "destroy", id: "42"})
  end

  test "should have ok status on destroy if logged in and authorized" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    delete "/api/recipes/#{recipe.id}"
    payload = assert_response_format response
    assert_nil payload, 'Expected empty payload'
  end

  test "should have forbidden status on destroy if logged in but not authorized" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    recipe = user.recipes.sample
    delete "/api/recipes/#{recipe.id}"
    payload = assert_response_format response, 403
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unauthorized status on destroy if not logged in" do
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    delete "/api/recipes/#{recipe.id}"
    payload = assert_response_format response, 401
    assert_nil payload, 'Expected empty payload'
  end

end
