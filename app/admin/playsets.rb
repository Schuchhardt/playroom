ActiveAdmin.register Playset do
  permit_params :establishment_id, :description, :price, :playset_type, :image, :start_at, :finish_at,
    game_sets_attributes: [:id, :_destroy, :game_id, :suggested_copies]
  menu priority: 2

  index do
    selectable_column
    id_column
    column :establishment
    column :playset_type
    column "Nro de Juegos" do |ps|
      ps.games.count
    end
    actions
  end

  filter :establishment
  filter :playset_type

  show do
    attributes_table do
        row :establishment
        row :playset_type
        row :description
        row :start_at
        row :finish_at
        row :price
        row "Imagen" do |g|
          if g.image.attached?
            image_tag url_for(g.image)
          else
            nil
          end
        end
    end
    panel "Juegos" do
      table_for playset.game_sets do
        column "Nombre" do |gs|
          gs.game.name
        end
        column "Copias sugeridas" do |gs|
          gs.suggested_copies
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :establishment
      f.input :playset_type, :as => :select, :collection => ["Convivencia Escolar", "Formación Ciudadana", "Decreto 83, DUA", "PIE", "Estrategias de Transición (373)", "Equipo directivo", "Taller PlayGo", "Espacios CRA", "EJT"]
      f.input :description, as: :text
      f.input :price
      f.input :start_at
      f.input :finish_at
      f.input :image, as: :file
    end

    f.has_many :game_sets do |gs|
      gs.inputs "Juego" do
        gs.input :game
        gs.input :suggested_copies
        if !gs.object.nil?
          gs.input :_destroy, :as => :boolean, :label => "Eliminar?"
        end
      end
    end


    f.actions
  end

end
