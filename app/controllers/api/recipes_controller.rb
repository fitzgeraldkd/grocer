class Api::RecipesController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: [:index, :create]

  def index
    render json: {payload: @current_user.recipes, messages: []}, status: :ok
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: {payload: recipe, messages: []}, status: :ok
  end

  def create
    recipe = @current_user.recipes.create!(recipe_params)
    render json: {payload: recipe, messages: []}, status: :created
  end

  def update
    recipe = Recipe.find(params[:id])
    recipe.update!(recipe_params)
    render json: {payload: recipe, messages: []}, status: :ok
  end

  def destroy
    recipe = Recipe.find(params[:id])
    recipe.destroy
    render json: {payload: nil, messages: ["Recipe has been deleted"]}, status: :ok
  end

  private

  def recipe_params
    params.permit(:name, :cuisine)
  end

  def authorize
    return render json: {payload: nil, messages: ["You are not authorized to perform this action."]}, status: :forbidden unless @current_user.id == Recipe.find(params[:id]).user_id
  end

end
