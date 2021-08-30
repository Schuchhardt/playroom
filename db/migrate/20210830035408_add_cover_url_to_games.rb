class AddCoverUrlToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :cover_url, :string
  end
end
