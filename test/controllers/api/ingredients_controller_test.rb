require "test_helper"

class Api::IngredientsControllerTest < ActionDispatch::IntegrationTest

  # ~~~ INDEX ~~~

  test "should get index" do
    assert_routing({method: 'get', path: "/api/ingredients"}, {controller: "api/ingredients", action: "index"})
  end

  test "should have ok status on index if logged in" do
    post "/api/login", params: { username: "kenny" }
    get "/api/ingredients"
    assert_response 200
    assert_equal "application/json", @response.media_type
    json_response = JSON.parse(response.body)
    json_response.each do |ingredient|
      assert_equal session[:user_id], ingredient["user_id"], "Should only return ingredients belonging to logged in user"
    end
  end

  test "should have unauthorized status on index if not logged in" do
    get "/api/ingredients"
    assert_response 401
    assert_equal "application/json", @response.media_type
  end

  # ~~~ SHOW ~~~

  test "should get show" do
    assert_routing({method: 'get', path: "/api/ingredients/1"}, {controller: "api/ingredients", action: "show", id: "1"})
    assert_routing({method: 'get', path: "/api/ingredients/42"}, {controller: "api/ingredients", action: "show", id: "42"})
  end

  test "should have ok status on show if belongs to logged in user" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    ingredient = user.ingredients.sample
    get "/api/ingredients/#{ingredient.id}"
    assert_response 200
    assert_equal "application/json", @response.media_type
  end

  test "should have forbidden status on show if logged in as different user" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    ingredient = user.ingredients.sample
    get "/api/ingredients/#{ingredient.id}"
    assert_response 403
    assert_equal "application/json", @response.media_type
  end

  test "should have unauthorized status on show if not logged in" do
    user = User.find_by(username: "kenny")
    ingredient = user.ingredients.sample
    get "/api/ingredients/#{ingredient.id}"
    assert_response 401
    assert_equal "application/json", @response.media_type
  end

  # ~~~ CREATE ~~~

  test "should post create" do
    assert_routing({method: 'post', path: "/api/ingredients"}, {controller: "api/ingredients", action: "create"})
  end

  test "should have created status on create if valid" do
    post "/api/login", params: { username: "kenny" }
    post "/api/ingredients", params: { name: "Milk" }
    assert_response 201
    assert_equal "application/json", @response.media_type
  end

  test "should have unprocessable_entity status on create if invalid" do
    post "/api/login", params: { username: "kenny" }
    post "/api/ingredients", params: { name: "Eggs" }
    assert_response 422
    assert_equal "application/json", @response.media_type
  end

  test "should have unauthorized status on create if not logged in" do
    post "/api/ingredients", params: { name: "Milk" }
    assert_response 401
    assert_equal "application/json", @response.media_type
  end

  # ~~~ UPDATE ~~~

  test "should patch update" do
    assert_routing({method: 'patch', path: "/api/ingredients/1"}, {controller: "api/ingredients", action: "update", id: "1"})
    assert_routing({method: 'patch', path: "/api/ingredients/42"}, {controller: "api/ingredients", action: "update", id: "42"})
  end

  test "should have ok status on update if valid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    ingredient = user.ingredients.sample
    patch "/api/ingredients/#{ingredient.id}", params: { name: "Beef" }
    assert_response 200
    assert_equal "application/json", @response.media_type
  end

  test "should have not_found status on update if not found" do
    post "/api/login", params: { username: "kenny" }
    patch "/api/ingredients/invalid_ingredient", params: { name: "Beef" }
    assert_response 404
    assert_equal "application/json", @response.media_type
  end

  test "should have unprocessable_entity status on update if invalid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    ingredient = user.ingredients.sample
    patch "/api/ingredients/#{ingredient.id}", params: { name: "" }
    assert_response 422
    assert_equal "application/json", @response.media_type
  end

  test "should have forbidden status on update if logged in but not as the owner" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    ingredient = user.ingredients.sample
    patch "/api/ingredients/#{ingredient.id}", params: { name: "Beef" }
    assert_response 403
    assert_equal "application/json", @response.media_type
  end

  test "should have unauthorized status on update if not logged in" do
    user = User.find_by(username: "kenny")
    ingredient = user.ingredients.sample
    patch "/api/ingredients/#{ingredient.id}", params: { name: "Beef" }
    assert_response 401
    assert_equal "application/json", @response.media_type
  end

  # ~~~ DESTROY ~~~

  test "should delete destroy" do
    assert_routing({method: 'delete', path: "/api/ingredients/1"}, {controller: "api/ingredients", action: "destroy", id: "1"})
    assert_routing({method: 'delete', path: "/api/ingredients/42"}, {controller: "api/ingredients", action: "destroy", id: "42"})
  end

  test "should have ok status on destroy if logged in and authorized" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    ingredient = user.ingredients.sample
    delete "/api/ingredients/#{ingredient.id}"
    assert_response 200
    assert_equal "application/json", @response.media_type
  end

  test "should have forbidden status on destroy if logged in but not authorized" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    ingredient = user.ingredients.sample
    delete "/api/ingredients/#{ingredient.id}"
    assert_response 403
    assert_equal "application/json", @response.media_type
  end

  test "should have unauthorized status on destroy if not logged in" do
    user = User.find_by(username: "kenny")
    ingredient = user.ingredients.sample
    delete "/api/ingredients/#{ingredient.id}"
    assert_response 401
    assert_equal "application/json", @response.media_type
  end

end
