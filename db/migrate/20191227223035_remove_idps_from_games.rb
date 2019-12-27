class RemoveIdpsFromGames < ActiveRecord::Migration[5.2]
  def change
    remove_column :games, :idps, :string
  end
end
