class User < ApplicationRecord
  validates :username, :firebase_id, presence: true, uniqueness: true
  validates :password_salt, presence: true
end
