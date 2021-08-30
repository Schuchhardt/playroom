ActiveAdmin.register Playset do
  permit_params :establishment_id, :description, :price, :playset_type, :cover_url, :start_at, :finish_at,
    game_sets_attributes: [:id, :_destroy, :game_id, :suggested_copies]
  menu priority: 2

  before_save do |playset|
    default_playset = PLAYSET_TYPES.find{ |pl| pl[:playset_type] == playset[:playset_type]}
    playset.description = default_playset[:description] unless !playset.description.empty?
    # playset.description = default_playset[:description] unless !playset.description.empty?
  end

  index do
    selectable_column
    id_column
    column :establishment
    column :playset_type
    column "Nro de Juegos" do |ps|
      ps.games.count
    end
    column "Descripción" do |ps|
      !ps.description.nil?
    end
    column "Imagen" do |ps|
      !ps.cover_url.nil?
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
        row "Imagen" do |p|
          if !p.cover_url.nil?
            image_tag p.cover_url
          else
            image_tag PLAYSET_TYPES.find{ |pl| pl[:playset_type] == p.playset_type}[:image_url]
          end
        end
    end
    panel "Juegos" do
      table_for playset.game_sets do
        column "Nombre" do |gs|
          gs.game.name
        end
        column "Copias disponibles" do |gs|
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
      f.input :cover_url
      # f.input :image, as: :file
    end

    f.has_many :game_sets do |gs|
      gs.object.suggested_copies = gs.object.suggested_copies || "1"
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
