class AddEstablishmentToPlaysets < ActiveRecord::Migration[5.2]
  def change
    add_reference :playsets, :establishment, foreign_key: true
  end
end
