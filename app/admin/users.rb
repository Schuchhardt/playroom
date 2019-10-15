ActiveAdmin.register User do
  permit_params :name, :phone, :user_type, :email, :password, :password_confirmation

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :user_type
    column :phone
    actions
  end

  filter :email
  filter :created_at

  form do |f|
    f.inputs do
      f.input :user_type, as: :select, collection: (User.translated_user_types.map{ |w| [w[0], w[1]]})
      f.input :email
      f.input :name
      f.input :phone
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end

end
