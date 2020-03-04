ActiveAdmin.register User do
  permit_params :name, :phone, :user_type, :email, :rut, :password, :password_confirmation,
    user_establishments_attributes: [:id, :_destroy, :establishment_id]

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :rut
    column :phone
    actions
  end

  filter :email
  filter :name

  show do
    attributes_table do
        row :name
        row :email
        row :rut
        row :user_type
        row :phone
        row :created_at
        row :updated_at
    end
    panel "Colegios a los que pertenece" do
      table_for user.user_establishments do
        column "Nombre" do |gs|
          gs.establishment.name
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :user_type, as: :select, collection: (User.translated_user_types.map{ |w| [w[0], w[1]]})
      f.input :email
      f.input :rut
      f.input :name
      f.input :phone
      f.input :password
      f.input :password_confirmation
    end

    f.has_many :user_establishments do |gs|
      gs.inputs "Colegios" do
        gs.input :establishment
        if !gs.object.nil?
          gs.input :_destroy, :as => :boolean, :label => "Eliminar?"
        end
      end
    end


    f.actions
  end

end
