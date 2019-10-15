ActiveAdmin.register Skill do
  permit_params :name, :skill_category
  menu priority: 4

  index do
    selectable_column
    id_column
    column :name
    column :skill_category
    actions
  end

  filter :name
  filter :skill_category

  form do |f|
    f.inputs do
      f.input :name
      f.input :skill_category
    end
    f.actions
  end

end
