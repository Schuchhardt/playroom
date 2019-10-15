class AddColumnsToEstablishments < ActiveRecord::Migration[5.2]
  def change
    add_column :establishments, :establishment_kind, :string
    add_reference :establishments, :commune, foreign_key: true
    add_column :establishments, :ive, :integer
    add_column :establishments, :total_students, :integer
    add_column :establishments, :students_per_course, :integer
  end
end
