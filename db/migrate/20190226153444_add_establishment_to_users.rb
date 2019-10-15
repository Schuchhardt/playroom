class AddEstablishmentToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :establishment, foreign_key: true
  end
end
