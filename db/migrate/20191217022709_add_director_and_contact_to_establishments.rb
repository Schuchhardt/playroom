class AddDirectorAndContactToEstablishments < ActiveRecord::Migration[5.2]
  def change
    add_column :establishments, :contact_name, :string
    add_column :establishments, :contact_email, :string
    add_column :establishments, :contact_phone, :string
  end
end
