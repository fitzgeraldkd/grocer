class User < ApplicationRecord
  validates :username, :email, :firebase_id, presence: true, uniqueness: true
  validates :username, format: { with: /\A[a-zA-Z_\d]+\z/, message: "Only letters, numbers, and underscores allowed"}
end
