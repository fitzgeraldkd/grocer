class Api::IngredientsController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: [:index, :create]

  def index
    render json: @current_user.ingredients, status: :ok
  end

  def show
    ingredient = Ingredient.find(params[:id])
    render json: ingredient, status: :ok
  end

  def create
    ingredient = @current_user.ingredients.create!(ingredient_params)
    render json: ingredient, status: :created
  end

  def update
    ingredient = Ingredient.find(params[:id])
    ingredient.update!(ingredient_params)
    render json: ingredient, status: :ok
  end

  def destroy
    ingredient = Ingredient.find(params[:id])
    ingredient.destroy
    render json: { messages: ["Ingredient has been deleted"] }, status: :ok
  end

  private

  def ingredient_params
    params.permit(:name)
  end

  def authorize
    return render json: { errors: ["You are not authorized to perform this action."] }, status: :forbidden unless @current_user.id == Ingredient.find(params[:id]).user_id
  end

end
