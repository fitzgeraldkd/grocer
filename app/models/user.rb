class User < ApplicationRecord
  validates :username, :firebase_id, presence: true, uniqueness: true
end
