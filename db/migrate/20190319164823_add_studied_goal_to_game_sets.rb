class AddStudiedGoalToGameSets < ActiveRecord::Migration[5.2]
  def change
    add_column :game_sets, :studied_goal, :string
  end
end
