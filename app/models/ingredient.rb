class Ingredient < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, uniqueness: { scope: :user_id, message: "user already has this ingredient" }
end
