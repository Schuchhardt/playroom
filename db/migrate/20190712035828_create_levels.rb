class CreateLevels < ActiveRecord::Migration[5.2]
  def change
    create_table :levels do |t|
      t.string :name
      t.string :subcategory
      t.string :category

      t.timestamps
    end
  end
end
