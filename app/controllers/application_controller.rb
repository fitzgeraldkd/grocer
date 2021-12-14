class ApplicationController < ActionController::API

  private

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
