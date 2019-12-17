ActiveAdmin.register Establishment do
  permit_params :name, :rbd, :address, :phone, :commune_id, :education_level_preschool,
    :education_level_primary, :education_level_secondary, :education_level_secondary_tech,
    :establishment_kind, :ive, :students_per_course, :total_students
  menu priority: 2

  index do
    selectable_column
    id_column
    column :name
    column :rbd
    column :commune
    column :phone
    column :contact_name
    actions
  end

  filter :name
  filter :rbd

  show do
    attributes_table do
      row :name
      row :rbd
      row :commune
      row :phone
      row :contact_name
      row :contact_email
      row :contact_phone
    end
    panel "Ludotecas" do
      table_for establishment.playsets do
        column "Nombre" do |gs|
          gs.name
        end
        column "Nro de juegos" do |gs|
          gs.games.count
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :rbd
      f.input :address
      f.input :phone
      f.input :contact_name
      f.input :contact_email
      f.input :contact_phone
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
