class RecipeIngredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :ingredient
  validates :order, presence: true
  validate :recipe_and_ingredient_belong_to_same_user

  def recipe_and_ingredient_belong_to_same_user
    unless ingredient&.user == recipe&.user
      errors.add(:ingredient, "must belong to same user as recipe")
      errors.add(:recipe, "must belong to same user as ingredient")
    end
  end
end
