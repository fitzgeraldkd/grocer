class RemovePasswordSaltFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :password_salt
  end
end
