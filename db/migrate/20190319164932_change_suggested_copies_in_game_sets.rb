class ChangeSuggestedCopiesInGameSets < ActiveRecord::Migration[5.2]
  def change
  	change_column :game_sets, :suggested_copies, :string
  end
end
