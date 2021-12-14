class CreateRecipeIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :recipe_ingredients do |t|
      t.belongs_to :recipe, null: false, foreign_key: true
      t.belongs_to :ingredient, null: false, foreign_key: true
      t.float :quantity
      t.string :units
      t.string :prepared
      t.string :group_name

      t.timestamps
    end
  end
end
