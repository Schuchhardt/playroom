class AddSkuToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :sku, :string
  end
end
