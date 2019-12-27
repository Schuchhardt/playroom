class DeletePlaysetSubscriptions < ActiveRecord::Migration[5.2]
  def change
    drop_table :playset_subscriptions
#    remove_foreign_key :playset_subscriptions, :establishments
    # remove_foreign_key :playsets, :playset_subscriptions
  end
end
