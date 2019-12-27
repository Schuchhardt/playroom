class CreateExperiences < ActiveRecord::Migration[5.2]
  def change
    create_table :experiences do |t|
      t.string :title
      t.text :description
      t.references :game, foreign_key: true
      t.references :user, foreign_key: true
      t.string :image_url

      t.timestamps
    end
  end
end
