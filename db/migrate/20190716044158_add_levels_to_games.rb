class AddLevelsToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :level_preschool, :boolean, default: false
    add_column :games, :level_first_primary, :boolean, default: false
    add_column :games, :level_second_primary, :boolean, default: false
    add_column :games, :level_secondary, :boolean, default: false
  end
end
