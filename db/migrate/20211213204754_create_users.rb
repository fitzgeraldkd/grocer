class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :firebase_id
      t.string :password_salt

      t.timestamps
    end
  end
end
