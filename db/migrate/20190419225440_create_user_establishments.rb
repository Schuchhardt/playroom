class CreateUserEstablishments < ActiveRecord::Migration[5.2]
  def change
    create_table :user_establishments do |t|
      t.references :user, foreign_key: true
      t.references :establishment, foreign_key: true

      t.timestamps
    end
  end
end
