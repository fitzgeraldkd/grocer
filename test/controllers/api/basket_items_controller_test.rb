require "test_helper"

class Api::BasketItemsControllerTest < ActionDispatch::IntegrationTest

  def assert_basket_item_payload(payload)
    assert payload.key?('id'), 'Expected basket_item payload to have id key'
    assert payload.key?('ingredient_id'), 'Expected basket_item payload to have ingredient_id key'
    assert payload.key?('quantity'), 'Expected basket_item payload to have quantity key'
    assert payload.key?('units'), 'Expected basket_item payload to have units key'
  end

  # ~~~ INDEX ~~~

  test "should get index" do
    assert_routing({method: 'get', path: "/api/basket_items"}, {controller: "api/basket_items", action: "index"})
  end

  test "should have ok status on index if logged in" do
    post "/api/login", params: { username: "kenny" }
    get "/api/basket_items"
    payload = assert_response_format response
    payload.each do |basket_item|
      assert_basket_item_payload basket_item
    end
  end

  test "should have unauthorized status on index if not logged in" do
    get "/api/basket_items"
    payload = assert_response_format response, 401
  end

  # ~~~ SHOW ~~~

  # ~~~ CREATE ~~~

  test "should post create" do
    assert_routing({method: 'post', path: "/api/basket_items"}, {controller: "api/basket_items", action: "create"})
  end

  test "should have created status on create if valid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    ingredient = user.ingredients.sample
    post "/api/basket_items", params: { ingredient_id: ingredient.id }
    payload = assert_response_format response, 201
    assert_basket_item_payload payload
  end

  test "should have forbidden status on create if logged in but not authorized" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    ingredient = user.ingredients.sample
    post "/api/basket_items", params: { ingredient_id: ingredient.id }
    payload = assert_response_format response, 403
    assert_nil payload, "Expected empty payload"
  end

  test "should have not_found status on create if invalid" do
    post "/api/login", params: { username: "kenny" }
    post "/api/basket_items", params: { ingredient_id: "invalid" }
    payload = assert_response_format response, 404
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unauthorized status on create if invalid" do
    user = User.find_by(username: "kenny")
    ingredient = user.ingredients.sample
    post "/api/basket_items", params: { ingredient: ingredient }
    payload = assert_response_format response, 401
    assert_nil payload, 'Expected empty payload'
  end

  # ~~~ UPDATE ~~~

  test "should patch update" do
    assert_routing({method: 'patch', path: "/api/basket_items/1"}, {controller: "api/basket_items", action: "update", id: "1"})
    assert_routing({method: 'patch', path: "/api/basket_items/42"}, {controller: "api/basket_items", action: "update", id: "42"})
  end

  test "should have ok status on update if valid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    basket_item = user.basket_items.sample
    patch "/api/basket_items/#{basket_item.id}", params: { quantity: 42 }
    payload = assert_response_format response
    assert_basket_item_payload payload
  end

  test "should have not_found status on update if not found" do
    post "/api/login", params: { username: "kenny" }
    patch "/api/basket_items/invalid", params: { quantity: 42 }
    payload = assert_response_format response, 404
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unprocessable_entity status on update if invalid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    basket_item = user.basket_items.sample
    patch "/api/basket_items/#{basket_item.id}", params: { ingredient_id: "invalid" }
    payload = assert_response_format response, 422
    assert_nil payload, 'Expected empty payload'
  end

  test "should have forbidden status on update if invalid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    basket_item = user.basket_items.sample
    patch "/api/basket_items/#{basket_item.id}", params: { quantity: 42 }
    payload = assert_response_format response, 403
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unauthorized status on update if not logged in" do
    user = User.find_by(username: "kenny")
    basket_item = user.basket_items.sample
    patch "/api/basket_items/#{basket_item.id}", params: { quantity: 42 }
    payload = assert_response_format response, 401
    assert_nil payload, 'Expected empty payload'
  end

  # ~~~ DESTROY ~~~

  test "should delete destroy" do
    assert_routing({method: 'delete', path: "/api/basket_items/1"}, {controller: "api/basket_items", action: "destroy", id: "1"})
    assert_routing({method: 'delete', path: "/api/basket_items/42"}, {controller: "api/basket_items", action: "destroy", id: "42"})
  end

  test "should have ok status on destroy if logged in and authorized" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    basket_item = user.basket_items.sample
    delete "/api/basket_items/#{basket_item.id}"
    payload = assert_response_format response
    assert_nil payload, 'Expected empty payload'
  end

  test "should have forbidden status on destroy if logged in but not authorized" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    basket_item = user.basket_items.sample
    delete "/api/basket_items/#{basket_item.id}"
    payload = assert_response_format response, 403
    assert_nil payload, 'Expected empty payload'
  end

  test "should have unauthorized status on destroy if logged in but not authorized" do
    user = User.find_by(username: "fitzgeraldkd")
    basket_item = user.basket_items.sample
    delete "/api/basket_items/#{basket_item.id}"
    payload = assert_response_format response, 401
    assert_nil payload, 'Expected empty payload'
  end

end
