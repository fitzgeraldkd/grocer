class Api::RecipeIngredientsController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: [:create]

  def create
    recipe = Recipe.find(params[:recipe_id])
    ingredient = Ingredient.find(params[:ingredient_id])
    if @current_user.id == recipe.user.id && @current_user.id == ingredient.user.id
      recipe_ingredient = RecipeIngredient.create!(recipe_ingredient_params)
      render json: {payload: recipe_ingredient, messages: []}, status: :created
    else
      render json: {payload: nil, messages: ["You are not authorized to perform this action."]}, status: :forbidden
    end
  end

  def update
    recipe_ingredient = RecipeIngredient.find(params[:id])
    recipe_ingredient.update!(recipe_ingredient_params)
    render json: {payload: recipe_ingredient, messages: []}, status: :ok
  end

  def destroy
    recipe_ingredient = RecipeIngredient.find(params[:id])
    recipe_ingredient.destroy
    render json: {payload: nil, messages: ["Recipe has been deleted"]}, status: :ok
  end

  private

  def recipe_ingredient_params
    params.permit(:recipe_id, :ingredient_id, :quantity, :units, :prepared, :group_name, :order)
  end

  def authorize
    return render json: {payload: nil, messages: ["You are not authorized to perform this action."]}, status: :forbidden unless @current_user.id == RecipeIngredient.find(params[:id]).recipe.user_id
  end

end
