class Api::UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def show
    render json: @current_user
  end

  def create
    if (params[:password] == params[:password_confirmation]) 
      if Rails.env != "test"
        conn = Faraday.new do |f|
          f.request :json
          f.response :json
        end
        response = conn.post(get_firebase_enpoint('signup'), { email: params[:email], password: params[:password], returnSecureToken: true })
        if (response.status == 200)
          begin
            user = User.create!(username: params[:username], firebase_id: response.body['localId'], email: params[:email])
            session[:user_id] = user.id
            render json: { username: user.username }, status: :created
          rescue ActiveRecord::RecordInvalid => invalid
            conn.post(get_firebase_enpoint('delete'), { idToken: response.body['idToken'] })
            render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { errors: [response.body['error']['message']] }, status: :unprocessable_entity
        end
      else
        puts "TESTING ENVIRONMENT WORKAROUND:"
        puts "USER WAS NOT CREATED WITH FIREBASE"
        user = User.create!(username: params[:username], firebase_id: "some unique firebase id", email: params[:email])
        session[:user_id] = user.id
        render json: { username: user.username }, status: :created
      end
    else
      render json: { errors: ['password and password_confirmation do not match']}, status: :unprocessable_entity
    end
  end

  def update

  end

  def destroy

  end

  private

  def user_params
    params.permit()
  end

end
