class Api::UsersController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: [:show, :create]
  skip_before_action :authenticate_user, only: [:create]

  def show
    render json: @current_user
  end

  def create
    if (params[:password] == params[:password_confirmation]) 
      response = make_firebase_request 'signup', { email: params[:email], password: params[:password], returnSecureToken: true }
      if (response.status == 200)
        begin
          user = User.create!(username: params[:username], firebase_id: response.body["localId"], email: params[:email])
          session[:user_id] = user.id
          session[:id_token] = response.body["idToken"]
          render json: user, status: :created
        rescue ActiveRecord::RecordInvalid => invalid
          make_firebase_request 'delete', { idToken: response.body['idToken'] }
          render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { errors: [response.body["error"]["message"]] }, status: :unprocessable_entity
      end
    else
      render json: { errors: ['password and password_confirmation do not match']}, status: :unprocessable_entity
    end
  end

  def update
    if params.has_key? :email
      @current_user.email = params[:email]
      if @current_user.valid?
        response = make_firebase_request 'change_email', { idToken: session[:id_token], email: params[:email] }
        if response.status == 200
          @current_user.save
        else
          return render json: { errors: [response.body['error']['message']] }, status: :unprocessable_entity
        end
      else
        return render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    if params.has_key? :password
      if params[:password] == params[:password_confirmation]
        response = make_firebase_request 'change_password', { idToken: session[:id_token], password: params[:password] }
        if response.status != 200
          return render json: { errors: [response.body['error']['message']] }, status: :unprocessable_entity
        end
      else
        return render json: { errors: ["password and password_confirmation do not match"] }, status: :unprocessable_entity
      end
    end

    @current_user.update!(user_params)
    render json: @current_user, status: :ok
  end

  def destroy
    response = make_firebase_request 'delete', { idToken: session[:id_token] }
    if response.status == 200
      @current_user.destroy
      session.delete :user_id
      session.delete :id_token
      render json: { messages: ["User has been deleted."] }, status: :ok
    else
      render json: { errors: [response.body["error"]["message"]] }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :email)
  end

  def authorize
    return render json: { errors: ["You are not authorized to perform this action."] }, status: :forbidden unless current_user.id == params[:id].to_i
  end

end
