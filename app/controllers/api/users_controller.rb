class Api::UsersController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]
  before_action :authorize
  skip_before_action :authorize, only: [:show, :create]

  def show
    render json: { payload: @current_user, messages: [] }
  end

  def create
    if (params[:password] == params[:password_confirmation]) 
      response = make_firebase_request 'signup', { email: params[:email], password: params[:password], returnSecureToken: true }
      if (response.status == 200)
        begin
          user = User.create!(username: params[:username], firebase_id: response.body["localId"], email: params[:email])
          session[:user_id] = user.id
          session[:id_token] = response.body["idToken"]
          render json: {payload: user, messages: []}, status: :created
        rescue ActiveRecord::RecordInvalid => invalid
          make_firebase_request 'delete', { idToken: response.body['idToken'] }
          render json: { payload: nil, messages: invalid.record.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { payload: nil, messages: [translate_firebase_message(response.body["error"]["message"])] }, status: :unprocessable_entity
      end
    else
      render json: { payload: nil, messages: ['Passwords do not match']}, status: :unprocessable_entity
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
          return render json: { payload: nil, messages: [response.body['error']['message']] }, status: :unprocessable_entity
        end
      else
        return render json: { payload: nil, messages: @current_user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    if params.has_key? :password
      if params[:password] == params[:password_confirmation]
        response = make_firebase_request 'change_password', { idToken: session[:id_token], password: params[:password] }
        if response.status != 200
          return render json: { payload: nil, messages: [response.body['error']['message']] }, status: :unprocessable_entity
        end
      else
        return render json: { payload: nil, messages: ["password and password_confirmation do not match"] }, status: :unprocessable_entity
      end
    end

    @current_user.update!(user_params)
    render json: { payload: @current_user, messages: [] }, status: :ok
  end

  def destroy
    response = make_firebase_request 'delete', { idToken: session[:id_token] }
    if response.status == 200
      @current_user.destroy
      session.delete :user_id
      session.delete :id_token
      render json: { payload: nil, messages: ["User has been deleted."] }, status: :ok
    else
      render json: { payload: nil, messages: [response.body["error"]["message"]] }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:username, :email)
  end

  def authorize
    return render json: { payload: nil, messages: ["You are not authorized to perform this action."] }, status: :forbidden unless @current_user.id == params[:id].to_i
  end

end
