class Direction < ApplicationRecord
  belongs_to :recipe
  validates :content, presence: true
  validates :order, presence: true, uniqueness: { scope: :recipe_id, message: "order value already exists on this recipe" }
end
