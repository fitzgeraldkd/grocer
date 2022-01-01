class AddColumnsToRecipes < ActiveRecord::Migration[6.1]
  def change
    add_column :recipes, :course, :string
    add_column :recipes, :vegetarian, :boolean
    add_column :recipes, :vegan, :boolean
  end
end
