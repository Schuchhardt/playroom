class CreateEstablishments < ActiveRecord::Migration[5.2]
  def change
    create_table :establishments do |t|
      t.string :name
      t.string :rbd
      t.string :address
      t.string :phone

      t.timestamps
    end
  end
end
