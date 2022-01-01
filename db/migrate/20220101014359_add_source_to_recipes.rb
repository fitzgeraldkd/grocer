class AddSourceToRecipes < ActiveRecord::Migration[6.1]
  def change
    add_column :recipes, :source, :string, null: false, default: ''
  end
end
