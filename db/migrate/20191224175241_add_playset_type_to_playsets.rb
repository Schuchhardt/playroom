class AddPlaysetTypeToPlaysets < ActiveRecord::Migration[5.2]
  def change
    add_column :playsets, :playset_type, :string
  end
end
