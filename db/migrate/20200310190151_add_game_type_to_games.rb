class AddGameTypeToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :game_type, :string
  end
end
