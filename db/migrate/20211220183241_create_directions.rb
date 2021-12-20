class CreateDirections < ActiveRecord::Migration[6.1]
  def change
    create_table :directions do |t|
      t.text :content
      t.belongs_to :recipe, null: false, foreign_key: true
      t.integer :order

      t.timestamps
    end
  end
end
