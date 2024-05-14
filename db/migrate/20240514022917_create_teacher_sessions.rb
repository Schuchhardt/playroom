class CreateTeacherSessions < ActiveRecord::Migration[6.1]
  def change
    create_table :teacher_sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true
      t.integer :number_of_students
      t.string :subject
      t.timestamp :played_at
      t.integer :grade
      t.boolean :ods_4_material
      t.boolean :ods_4_motivation
      t.boolean :ods_5_gender
      t.boolean :ods_5_stereotypes

      t.timestamps
    end
  end
end
