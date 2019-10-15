class CreateGameSets < ActiveRecord::Migration[5.2]
  def change
    create_table :game_sets do |t|
      t.references :game, foreign_key: true
      t.references :playset, foreign_key: true
      t.integer :suggested_copies

      t.timestamps
    end
  end
end
