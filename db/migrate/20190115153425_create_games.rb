class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :name
      t.string :description
      t.string :suggested_age
      t.string :game_time
      t.string :number_of_players
      t.string :difficulty

      t.timestamps
    end
  end
end
