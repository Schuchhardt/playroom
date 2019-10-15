class AddEducationalLevelsToEstablishments < ActiveRecord::Migration[5.2]
  def change
    add_column :establishments, :education_level_preschool, :boolean
    add_column :establishments, :education_level_primary, :boolean
    add_column :establishments, :education_level_secondary, :boolean
  end
end
