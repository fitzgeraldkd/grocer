class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def create
    user = User.find_by!(username: params[:username])
    if Rails.env != "test"
      conn = Faraday.new do |f|
        f.request :json
        f.response :json
      end
      response = conn.post(
        get_firebase_enpoint('login'),
        { email: user.email, password: params[:password]}
      )
      if (response.status == 200)
        session[:user_id] = user.id
        render json: user, status: :ok
      else
        render json: { errors: [response.body['error']['message']] }, status: :unauthorized
      end
    else
      puts "TESTING ENVIRONMENT WORKAROUND:"
      puts "USER WAS NOT VALIDATED WITH FIREBASE"
      session[:user_id] = user.id
      render json: user, status: :ok
    end
  end

  def destroy
    session.delete :user_id
    render json: { messages: ['You have been logged out.'] }, status: :ok
  end

end
