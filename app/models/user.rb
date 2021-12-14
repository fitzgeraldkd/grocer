class User < ApplicationRecord
  validates :username, :email, :firebase_id, presence: true, uniqueness: true
end
