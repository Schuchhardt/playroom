class DeletePlaysetSubscriptions < ActiveRecord::Migration[5.2]
  def change
    drop_table :playset_subscriptions, if_exists: true
  end
end
