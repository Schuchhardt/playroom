class AddYoutubeLinkToGames < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :youtube_link, :string
  end
end
