class AddGameTimesToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :game_time_from, :integer
    add_column :games, :game_time_to, :integer
  end
end
