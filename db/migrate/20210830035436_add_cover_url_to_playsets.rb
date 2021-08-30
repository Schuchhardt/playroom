class AddCoverUrlToPlaysets < ActiveRecord::Migration[5.2]
  def change
    add_column :playsets, :cover_url, :string
  end
end
