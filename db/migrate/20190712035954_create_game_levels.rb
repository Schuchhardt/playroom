class CreateGameLevels < ActiveRecord::Migration[5.2]
  def change
    create_table :game_levels do |t|
      t.references :game, foreign_key: true
      t.references :level, foreign_key: true

      t.timestamps
    end
  end
end
