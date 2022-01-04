class Ingredient < ApplicationRecord
  belongs_to :user
  has_many :recipe_ingredients, dependent: :destroy
  has_many :recipes, through: :recipe_ingredients
  has_many :basket_items, dependent: :destroy

  validates :name, presence: true, uniqueness: { scope: :user_id, message: "invalid, you already have an ingredient with this name" }
end
