class CreatePlaysetSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :playset_subscriptions do |t|
      t.references :establishment, foreign_key: true
      t.references :playset, foreign_key: true
      t.datetime :started_at
      t.datetime :finished_at

      t.timestamps
    end
  end
end
