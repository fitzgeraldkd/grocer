class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authenticate_user
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid

  private

  def current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  def authenticate_user
    render json: { payload: nil, messages: ["You are not logged in."] }, status: :unauthorized unless current_user
  end

  def render_record_not_found(error)
    render json: { payload: nil, messages: [error.message] }, status: :not_found
  end

  def render_record_invalid(invalid)
    render json: { payload: nil, messages: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def make_firebase_request(action, body)
    if Rails.env != "test"
      key = ENV['firebase_key']
      conn = Faraday.new do |f|
        f.request :json
        f.response :json
      end
      response = conn.post(get_firebase_endpoint(action), body)
      response
    else
      # fake responses for tests
      case action
      when "signup"
        FakeFirebaseResponse.new(200, { "idToken" => "some unique token", "localId" => "some unique firebase id" })
      when "login"
        FakeFirebaseResponse.new(200, { "idToken" => "some unique token" })
      when "delete"
        FakeFirebaseResponse.new(200)
      when "change_email"
        FakeFirebaseResponse.new(200)
      when "change_password"
        FakeFirebaseResponse.new(200)
      end
    end
  end

  def get_firebase_endpoint(action)
    key = ENV['firebase_key']
    case action
    when "signup"
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{key}"
    when "login"
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{key}"
    when "delete"
      "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=#{key}"
    when "change_email"
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=#{key}"
    when "change_password"
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=#{key}"
    end
  end

end
