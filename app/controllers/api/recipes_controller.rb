class Api::RecipesController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: [:index, :create]

  def index
    render json: {payload: serialize_all(@current_user.recipes, RecipeSerializer), messages: []}, status: :ok
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: {payload: serialize(recipe, RecipeDetailSerializer, ['directions', 'recipe_ingredients', 'recipe_ingredients.ingredient']), messages: []}, status: :ok
  end

  def create
    recipe = @current_user.recipes.create!(recipe_params)
    recipe_ingredients = params[:recipe_ingredients] || []
    add_related_ingredients(recipe, recipe_ingredients)
    # recipe_ingredients.each do |recipe_ingredient|
    #   # ingredient = Ingredient.where(["name = :name and user_id = :user_id", { name: recipe_ingredient['ingredient_name'], user_id: @current_user.id }])
    #   ingredient = Ingredient.find_by(name: recipe_ingredient['ingredient_name'], user_id: @current_user.id)
    #   ingredient = @current_user.ingredients.create!(name: recipe_ingredient['ingredient_name']) if !ingredient
    #   if recipe_ingredient['id'] == nil
    #     recipe.recipe_ingredients.create!(
    #       ingredient_id: ingredient.id,
    #       quantity: recipe_ingredient['quantity'],
    #       units: recipe_ingredient['units'],
    #       prepared: recipe_ingredient['prepared'],
    #       group_name: recipe_ingredient['group_name']
    #     )
    #   else
    #     RecipeIngredient.find_by(id: recipe_ingredient['id']).update!(
    #       ingredient_id: ingredient.id,
    #       quantity: recipe_ingredient['quantity'],
    #       units: recipe_ingredient['units'],
    #       prepared: recipe_ingredient['prepared'],
    #       group_name: recipe_ingredient['group_name']
    #     )
    #   end
    # end

    directions = params[:directions] || []
    add_related_directions(recipe, directions)
    # directions.each do |direction|
    #   if direction['id'] == nil
    #     recipe.directions.create!(
    #       content: direction['content'],
    #       order: direction['order']
    #     )
    #   else
    #     Direction.find_by(id: direction['id']).update!(
    #       content: direction['content'],
    #       order: direction['order']
    #     )
    #   end
    # end
    render json: {payload: serialize(recipe, RecipeDetailSerializer, ['recipe_ingredients', 'recipe_ingredients.ingredient']), messages: []}, status: :created
  rescue ActiveRecord::RecordInvalid => invalid
    recipe.destroy
    render_record_invalid(invalid)
  end

  def update
    recipe = Recipe.find(params[:id])
    recipe_ingredients = params[:recipe_ingredients] || []
    add_related_ingredients(recipe, recipe_ingredients)

    directions = params[:directions] || []
    add_related_directions(recipe, directions)

    recipe.update!(recipe_params)
    render json: {payload: serialize(recipe, RecipeDetailSerializer, ['recipe_ingredients', 'recipe_ingredients.ingredient']), messages: []}, status: :ok
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

  def add_related_ingredients(recipe, recipe_ingredients)
    recipe_ingredients.each do |recipe_ingredient|
      ingredient = Ingredient.find_by(name: recipe_ingredient['ingredient']['name'], user_id: @current_user.id)
      ingredient = @current_user.ingredients.create!(name: recipe_ingredient['ingredient']['name']) if !ingredient
      if recipe_ingredient['id'] == nil
        recipe.recipe_ingredients.create!(
          ingredient_id: ingredient.id,
          quantity: recipe_ingredient['quantity'],
          units: recipe_ingredient['units'],
          prepared: recipe_ingredient['prepared'],
          group_name: recipe_ingredient['group_name'],
          order: recipe_ingredient['order'] || 0
        )
      else
        RecipeIngredient.find_by(id: recipe_ingredient['id']).update!(
          ingredient_id: ingredient.id,
          quantity: recipe_ingredient['quantity'],
          units: recipe_ingredient['units'],
          prepared: recipe_ingredient['prepared'],
          group_name: recipe_ingredient['group_name'],
          order: recipe_ingredient['order'] || 0
        )
      end
    end
  end

  def add_related_directions(recipe, directions)
    directions.each do |direction|
      if direction['id'] == nil
        recipe.directions.create!(
          content: direction['content'],
          order: direction['order']
        )
      else
        Direction.find_by(id: direction['id']).update!(
          content: direction['content'],
          order: direction['order']
        )
      end
    end
  end

end
