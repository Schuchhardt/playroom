class AddPdfUrlToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :pdf_url, :string
  end
end
