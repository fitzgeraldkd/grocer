class Api::SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def create
    user = User.find_by!(username: params[:username])
    response = make_firebase_request 'login', { email: user.email, password: params[:password] }
    # conn = Faraday.new do |f|
    #   f.request :json
    #   f.response :json
    # end
    # response = conn.post(
    #   get_firebase_enpoint('login'),
    #   { email: user.email, password: params[:password]}
    # )
    if (response.status == 200)
      session[:user_id] = user.id
      session[:id_token] = response.body['idToken']
      render json: user, status: :ok
    else
      render json: { errors: [response.body['error']['message']] }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    session.delete :id_token
    render json: { messages: ['You have been logged out.'] }, status: :ok
  end

end