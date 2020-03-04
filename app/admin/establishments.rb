ActiveAdmin.register Establishment do
  permit_params :name, :rbd, :address, :phone, :commune_id, :education_level_preschool,
    :education_level_primary, :education_level_secondary, :education_level_secondary_tech,
    :establishment_kind, :ive, :students_per_course, :total_students, :logo
  menu priority: 2

  index do
    selectable_column
    id_column
    column :name
    column :rbd
    column :commune, :sortable => 'communes.name'
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
      row "Logo" do |e|
        if e.logo.attached?
          image_tag url_for(e.logo)
        else
          nil
        end
      end
      row :establishment_kind
      row :education_level_preschool
      row :education_level_primary
      row :education_level_secondary
      row :education_level_secondary_tech
      row :ive
      row :students_per_course
      row :total_students
    end
    panel "Ludotecas" do
      table_for establishment.playsets do
        column "Nombre" do |ps|
          link_to ps.playset_type, admin_playset_path(ps)
        end
        column "Nro de juegos" do |ps|
          ps.games.count
        end
        column "Fecha Inicio" do |ps|
          ps.start_at
        end
        column "Fecha Termino" do |ps|
          ps.finish_at
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :rbd
      f.input :logo, as: :file
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
