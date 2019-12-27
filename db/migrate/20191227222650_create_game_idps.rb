class CreateGameIdps < ActiveRecord::Migration[5.2]
  def change
    create_table :game_idps do |t|
      t.references :idp, foreign_key: true
      t.references :game, foreign_key: true

      t.timestamps
    end
  end
end
