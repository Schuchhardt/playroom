class AddShortNameToRegions < ActiveRecord::Migration[5.2]
  def change
    add_column :regions, :short_name, :string
  end
end
