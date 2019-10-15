ActiveAdmin.register UserEstablishment do
  permit_params :establishment_id, :user_id
  menu priority: 6

  index do
    selectable_column
    id_column
    column :establishment
    column :user
    actions
  end

  filter :establishment
  filter :user

  form do |f|
    f.inputs do
      f.input :establishment
      f.input :user
    end
    f.actions
  end

end
