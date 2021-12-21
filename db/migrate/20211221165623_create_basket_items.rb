class CreateBasketItems < ActiveRecord::Migration[6.1]
  def change
    create_table :basket_items do |t|
      t.belongs_to :ingredient, null: false, foreign_key: true
      t.float :quantity
      t.string :units

      t.timestamps
    end
  end
end
