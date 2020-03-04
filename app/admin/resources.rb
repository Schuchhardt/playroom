ActiveAdmin.register Resource do
  permit_params :name, :file_url, establishment_resources_attributes: [:id, :_destroy, :establishment_id]

  index do
    selectable_column
    id_column
    column :name
    column :file_url
    actions
  end

  filter :name

  show do
    attributes_table do
        row :name
        row :file_url
    end
    panel "Establecimientos que tienen este recurso" do
      table_for resource.establishment_resources do
        column "Nombre" do |gs|
          gs.establishment.name
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :file_url
    end
    f.has_many :establishment_resources do |gs|
        gs.inputs "Establecimientos" do
          gs.input :establishment
          if !gs.object.nil?
            gs.input :_destroy, :as => :boolean, :label => "Eliminar?"
          end
        end
      end
    f.actions
  end

end
