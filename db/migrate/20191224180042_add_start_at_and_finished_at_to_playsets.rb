class AddStartAtAndFinishedAtToPlaysets < ActiveRecord::Migration[5.2]
  def change
    add_column :playsets, :start_at, :date
    add_column :playsets, :finish_at, :date
  end
end
