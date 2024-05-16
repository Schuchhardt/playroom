class AddPictureUrlToTeacherSessions < ActiveRecord::Migration[6.1]
  def change
    add_column :teacher_sessions, :picture_url, :string
  end
end
