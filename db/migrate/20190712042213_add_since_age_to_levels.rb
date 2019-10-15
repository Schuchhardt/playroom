class AddSinceAgeToLevels < ActiveRecord::Migration[5.2]
  def change
    add_column :levels, :since_age, :integer
  end
end
