ActiveAdmin.register Establishment do
  active_admin_import
  permit_params :name, :rbd, :address, :phone, :commune_id, :education_level_preschool, :education_level_primary, :education_level_secondary, :education_level_secondary_tech, :establishment_kind, :ive, :students_per_course, :total_students
  menu priority: 4

  index do
    selectable_column
    id_column
    column :name
    column :rbd
    column :commune
    column :phone
    actions
  end

  filter :name
  filter :rbd

  form do |f|
    f.inputs do
      f.input :name
      f.input :rbd
      f.input :address
      f.input :phone
      f.input :establishment_kind, as: :select, collection: (["Part. Sub.","Municipal","Particular", "Corporación", "Fundación"])
      f.input :commune
      f.input :education_level_preschool
      f.input :education_level_primary
      f.input :education_level_secondary
      f.input :education_level_secondary_tech
      f.input :ive
      f.input :students_per_course
      f.input :total_students
    end
    f.actions
  end

end
