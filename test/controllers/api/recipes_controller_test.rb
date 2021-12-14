require "test_helper"

class Api::RecipesControllerTest < ActionDispatch::IntegrationTest

  # ~~~ INDEX ~~~

  test "should get index" do
    assert_routing({method: 'get', path: "/api/recipes"}, {controller: "api/recipes", action: "index"})
  end

  test "should have ok status on index if logged in" do
    post "/api/login", params: { username: "kenny" }
    get "/api/recipes"
    assert_response 200
    assert_equal "application/json", @response.media_type
    json_response = JSON.parse(response.body)
    json_response.each do |recipe|
      assert_equal session[:user_id], recipe["user_id"], "Should only return recipes belonging to logged in user"
    end
  end

  test "should have unauthorized status on index if not logged in" do
    get "/api/recipes"
    assert_response 401
    assert_equal "application/json", @response.media_type
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
    assert_response 200
    assert_equal "application/json", @response.media_type
  end

  test "should have forbidden status on show if logged in as different user" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    recipe = user.recipes.sample
    get "/api/recipes/#{recipe.id}"
    assert_response 403
    assert_equal "application/json", @response.media_type
  end

  test "should have unauthorized status on show if not logged in" do
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    get "/api/recipes/#{recipe.id}"
    assert_response 401
    assert_equal "application/json", @response.media_type
  end

  # ~~~ CREATE ~~~

  test "should post create" do
    assert_routing({method: 'post', path: "/api/recipes"}, {controller: "api/recipes", action: "create"})
  end

  test "should have created status on create if valid" do
    post "/api/login", params: { username: "kenny" }
    post "/api/recipes", params: { name: "Hot Chocolate" }
    assert_response 201
    assert_equal "application/json", @response.media_type
  end

  test "should have unprocessable_entity status on create if invalid" do
    post "/api/login", params: { username: "kenny" }
    post "/api/recipes", params: { name: "Pancakes" }
    assert_response 422
    assert_equal "application/json", @response.media_type
  end

  test "should have unauthorized status on create if not logged in" do
    post "/api/recipes", params: { name: "Hot Chocolate" }
    assert_response 401
    assert_equal "application/json", @response.media_type
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
    assert_response 200
    assert_equal "application/json", @response.media_type
  end

  test "should have not_found status on update if not found" do
    post "/api/login", params: { username: "kenny" }
    patch "/api/recipes/invalid_recipe", params: { name: "French Toast" }
    assert_response 404
    assert_equal "application/json", @response.media_type
  end

  test "should have unprocessable_entity status on update if invalid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    patch "/api/recipes/#{recipe.id}", params: { name: "" }
    assert_response 422
    assert_equal "application/json", @response.media_type
  end

  test "should have forbidden status on update if logged in but not as the owner" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    recipe = user.recipes.sample
    patch "/api/recipes/#{recipe.id}", params: { name: "French Toast" }
    assert_response 403
    assert_equal "application/json", @response.media_type
  end

  test "should have unauthorized status on update if not logged in" do
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    patch "/api/recipes/#{recipe.id}", params: { name: "Beef" }
    assert_response 401
    assert_equal "application/json", @response.media_type
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
    assert_response 200
    assert_equal "application/json", @response.media_type
  end

  test "should have forbidden status on destroy if logged in but not authorized" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    recipe = user.recipes.sample
    delete "/api/recipes/#{recipe.id}"
    assert_response 403
    assert_equal "application/json", @response.media_type
  end

  test "should have unauthorized status on destroy if not logged in" do
    user = User.find_by(username: "kenny")
    recipe = user.recipes.sample
    delete "/api/recipes/#{recipe.id}"
    assert_response 401
    assert_equal "application/json", @response.media_type
  end

end
