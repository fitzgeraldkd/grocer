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
    render json: { errors: ["You are not logged in."] }, status: :unauthorized unless current_user
  end

  def render_record_not_found(error)
    render json: { errors: [error.message] }, status: :not_found
  end

  def render_record_invalid(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def get_firebase_enpoint(action)
    key = ENV['firebase_key']
    case action
    when "signup"
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{key}"
    when "login"
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{key}"
    when "delete"
      "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=#{key}"
    end
  end

end
