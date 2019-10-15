class AddEducationTechLevelToEstablishments < ActiveRecord::Migration[5.2]
  def change
    add_column :establishments, :education_level_secondary_tech, :boolean
  end
end
