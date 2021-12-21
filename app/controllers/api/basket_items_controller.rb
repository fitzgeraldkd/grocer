class Api::BasketItemsController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: [:index, :create]

  def index
    render json: {payload: @current_user.basket_items, messages: []}, status: :ok
  end

  def create
    ingredient = Ingredient.find(params[:ingredient_id])
    if @current_user.id == ingredient.user_id
      basket_item = ingredient.basket_items.create!(basket_item_params)
      render json: {payload: basket_item, messages: []}, status: :created
    else
      render json: {payload: nil, messages: ["You are not authorized to perform this action."]}, status: :forbidden
    end
  end

  def update
    basket_item = BasketItem.find(params[:id])
    basket_item.update!(basket_item_params)
    render json: {payload: basket_item, messages: []}, status: :ok
  end

  def destroy
    basket_item = BasketItem.find(params[:id])
    basket_item.destroy
    render json: {payload: nil, messages: ["Basket Item has been deleted"]}, status: :ok
  end

  private

  def basket_item_params
    params.permit(:ingredient_id, :quantity, :units)
  end

  def authorize
    return render json: {payload: nil, messages: ["You are not authorized to perform this action."]}, status: :forbidden unless @current_user.id == BasketItem.find(params[:id]).ingredient.user_id
  end

end
