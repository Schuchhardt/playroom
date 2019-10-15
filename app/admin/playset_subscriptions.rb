ActiveAdmin.register PlaysetSubscription do
  permit_params :started_at, :finished_at, :establishment_id, :playset_id
  menu priority: 6

  index do
    selectable_column
    id_column
    column :establishment
    column :playset
    column :started_at
    column :finished_at
    actions
  end

  filter :establishment

  form do |f|
    f.inputs do
      f.input :establishment
      f.input :playset
      f.input :started_at, :as => :date_picker
      f.input :finished_at, :as => :date_picker
    end
    f.actions
  end

end
