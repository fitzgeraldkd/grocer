require "test_helper"

class Api::UsersControllerTest < ActionDispatch::IntegrationTest

  # ~~~ INDEX ~~~

  test "should not get index" do
    assert_raises ActionController::RoutingError do
      get "/api/users" 
    end
  end

  # ~~~ SHOW ~~~

  test "should not get show" do
    assert_raises ActionController::RoutingError do
      get "/api/users/1" 
    end
  end

  test "should get me" do
    assert_routing "/api/me", controller: "api/users", action: "show"
  end

  test "should have ok status on show if logged in" do
    post "/api/login", params: { username: "kenny" }
    get "/api/me"
    assert_response 200
    assert_equal "application/json", @response.media_type
    assert_not_nil session[:user_id], "Expected user_id session to be set"
    assert_not_nil session[:id_token], "Expected id_token session to be set"
  end

  test "should have unauthorized status on show if not logged in" do
    get "/api/me"
    assert_response 401
    assert_equal "application/json", @response.media_type
    assert_nil session[:user_id], "Expected user_id session to not be set"
    assert_nil session[:id_token], "Expected id_token session to not be set"
  end

  # ~~~ CREATE ~~~

  test "should post create" do
    assert_routing({method: 'post', path: "/api/users"}, {controller: "api/users", action: "create"})
  end

  test "should have created status on create if valid" do
    post "/api/users", params: { username: "a_unique_username", email: "fake_email_3@fake.com", password: "some password", password_confirmation: "some password" }
    assert_response 201
    assert_equal "application/json", @response.media_type
    assert_not_nil session[:user_id], "Expected user_id session to be set"
    assert_not_nil session[:id_token], "Expected id_token session to be set"
  end

  test "should have unprocessable_entity status on create if invalid" do
    post "/api/users", params: { username: "kenny" }
    assert_response 422
    assert_equal "application/json", @response.media_type
    assert_nil session[:user_id], "Expected user_id session to not be set"
    assert_nil session[:id_token], "Expected id_token session to not be set"
  end

  # ~~~ UPDATE ~~~

  test "should patch update" do
    assert_routing({method: 'patch', path: "/api/users/1"}, {controller: "api/users", action: "update", id: "1"})
    assert_routing({method: 'patch', path: "/api/users/42"}, {controller: "api/users", action: "update", id: "42"})
  end

  test "should have ok status on update if logged in and valid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    patch "/api/users/#{user.id}", params: { username: "some_new_unique_username", email: "some_fake_email_3@fake.com" }
    assert_response 200
    assert_equal "application/json", @response.media_type
  end
  
  test "should have unprocessable_entity status on update if logged in but invalid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    patch "/api/users/#{user.id}", params: { username: "an invalid username" }
    assert_response 422
    assert_equal "application/json", @response.media_type
  end
  
  test "should have forbidden status on update if logged in but not as the updated user" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    patch "/api/users/#{user.id}", params: { username: "some_new_unique_username" }
    assert_response 403
    assert_equal "application/json", @response.media_type
  end
  
  test "should have unauthorized status on update if not logged in" do
    user = User.find_by(username: "kenny")
    patch "/api/users/#{user.id}", params: { username: "some_new_unique_username" }
    assert_response 401
    assert_equal "application/json", @response.media_type
  end

  # ~~~ DESTROY ~~~

  test "should delete destroy" do
    assert_routing({method: 'delete', path: "/api/users/1"}, {controller: "api/users", action: "destroy", id: "1"})
    assert_routing({method: 'delete', path: "/api/users/42"}, {controller: "api/users", action: "destroy", id: "42"})
  end

  test "should have ok status on destroy if logged in and valid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "kenny")
    delete "/api/users/#{user.id}"
    assert_response 200
    assert_equal "application/json", @response.media_type
    assert_nil session[:user_id], "Expected user_id session to not be set"
    assert_nil session[:id_token], "Expected id_token session to not be set"
  end

  test "should have forbidden status on destroy if logged in but invalid" do
    post "/api/login", params: { username: "kenny" }
    user = User.find_by(username: "fitzgeraldkd")
    delete "/api/users/#{user.id}"
    assert_response 403
    assert_equal "application/json", @response.media_type
  end

  test "should have unauthorized status on destroy if not logged in" do
    user = User.first
    delete "/api/users/#{user.id}"
    assert_response 401
    assert_equal "application/json", @response.media_type
  end

end
