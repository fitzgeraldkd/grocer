class Recipe < ApplicationRecord
  belongs_to :user
  has_many :directions, dependent: :destroy
  has_many :recipe_ingredients, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients

  validates :name, presence: true, uniqueness: { scope: :user_id, message: "invalid, you already have a recipe with this name" }
end
