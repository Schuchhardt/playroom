class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :name
      t.string :last_name
      t.integer :phone
      t.integer :user_type

      t.timestamps
    end
  end
end
