class CreateEstablishmentResources < ActiveRecord::Migration[5.2]
  def change
    create_table :establishment_resources do |t|
      t.references :establishment, foreign_key: true
      t.references :resource, foreign_key: true

      t.timestamps
    end
  end
end
