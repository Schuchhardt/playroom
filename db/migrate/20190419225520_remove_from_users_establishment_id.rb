class RemoveFromUsersEstablishmentId < ActiveRecord::Migration[5.2]
  def change
  	remove_column :users, :establishment_id
  end
end
