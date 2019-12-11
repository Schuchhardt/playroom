ActiveAdmin.register Playset do
  permit_params :name, :description, :price, :image
  menu priority: 3

  index do
    selectable_column
    id_column
    column :name
    column :description
    column "Nro de Juegos" do |ps|
      ps.games.count
    end
    actions
  end

  filter :name

  show do
    attributes_table do
        row :name
        row :description
        row "Imagen" do |g|
          if g.image.attached?
            image_tag url_for(g.image)
          else
            nil
          end
        end
    end
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :description
      f.input :image, as: :file
    end
    f.actions
  end

end
