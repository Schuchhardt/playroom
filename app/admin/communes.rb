ActiveAdmin.register Commune do
  permit_params :name
  menu false#, priority: 6
  
  index do
    selectable_column
    id_column
    column :name
    column :region
    column :created_at
    actions
  end

  filter :name

  form do |f|
    f.inputs do
      f.input :name
      f.input :region
    end
    f.actions
  end

end
