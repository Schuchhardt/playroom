class CreateGameSkills < ActiveRecord::Migration[5.2]
  def change
    create_table :game_skills do |t|
      t.references :game, foreign_key: true
      t.references :skill, foreign_key: true

      t.timestamps
    end
  end
end
