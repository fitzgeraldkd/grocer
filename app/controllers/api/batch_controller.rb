class Api::BatchController < ApplicationController
  skip_before_action :authenticate_user, only: [:create]

  def create
    # get '/api/ingredients'
    # test = redirect_to ""
    # p 'request'
    # p request.methods
    # p request.params
    # p request.env
    # p 'response'
    # p response
    p params
    res = []
    p 'hello'
    p res
    controllers = {
      'ingredients' => Api::IngredientsController,
      'sessions' => Api::SessionsController,
      'users' => Api::UsersController
    }
    params['_json'].each do |new_request|
      req = ActionDispatch::Request.new(request.env)
      p req.params
      req.request_parameters = new_request['params']
      controllers[new_request['controller']].dispatch(new_request['action'], req, response)
      res << { response: JSON.parse(response.body), status: response.status }
    end
    # p 'response'
    # p response
    # p 'test'
    render json: res
  end

end
