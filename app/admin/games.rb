ActiveAdmin.register Game do
  permit_params :name, :sku, :description, :difficulty, :game_time, :idps, :number_of_players, 
    :suggested_age, :youtube_link, :level_preschool, :level_first_primary, :level_second_primary, 
    :level_secondary, :cover_url, :game_type, game_skills_attributes: [:id, :_destroy, :skill_id], game_idps_attributes: [:id, :_destroy, :idp_id]

  menu priority: 3

  before_save do |game|
    game.name = game.name.upcase
    true
  end

  config.sort_order = "name_asc"

  index do
    #selectable_column
    id_column
    column :name
    column "Ludotecas" do |game|
      game.playsets.count
    end
    column "Descripción" do |game|
      !game.description.empty?
    end
    column "Portada" do |game|
      !game.cover_url.nil?
    end
    column "Habilidades" do |game|
      game.game_skills.any?
    end
    column "IDPS" do |game|
      game.idps.any?
    end
    column "Niveles" do |game|
      [game.level_preschool, game.level_first_primary, game.level_second_primary, game.level_secondary].any? { |x| x == true }
    end
    column "Youtube Link" do |game|
      !game.youtube_link.nil?
    end
    actions
  end

  filter :name

  show do
    attributes_table do
        row :name
        row :sku
        row :description
        row :difficulty
        row :game_time           
        row :number_of_players
        row :suggested_age
        row :game_type
        row :youtube_link
        row :level_preschool
        row :level_first_primary
        row :level_second_primary
        row :level_secondary
        row "Portada" do |g|
          if g.cover_url.nil?
            nil
          else
            image_tag g.cover_url
          end
        end
    end
    panel "Ludotecas donde esta el juego" do
      table_for game.game_sets do
        column "Ludoteca - Colegio" do |gs|
          "#{gs.playset.playset_type} - #{gs.playset.establishment.name}" 
        end
      end
    end
    panel "Habilidades" do
      table_for game.game_skills do
        column "Nombre" do |gs|
          gs.skill.display_name
        end
      end
    end
    panel "IDPS" do
      table_for game.game_idps do
        column "Nombre" do |gs|
          gs.idp.name
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :sku
      f.input :description, as: :text
      f.input :difficulty, :as => :select, :collection => ["inicial", "intermedio", "avanzado"]
      f.input :game_type, :as => :select, :collection => ["competitivo", "colaborativo", "semi-colaborativo"]
      f.input :game_time           
      f.input :number_of_players
      f.input :suggested_age, :as => :select, :collection => (0..15).to_a.map{|n| "Desde #{n} años"}
      f.input :youtube_link
      f.input :level_preschool
      f.input :level_first_primary
      f.input :level_second_primary
      f.input :level_secondary
      f.input :cover_url
      # f.input :image, as: :file
    end
    
    f.has_many :game_skills do |gs|
      gs.inputs "Habilidades" do
        gs.input :skill 
        if !gs.object.nil?
          gs.input :_destroy, :as => :boolean, :label => "Eliminar?"
        end
      end
    end

    f.has_many :game_idps do |gs|
      gs.inputs "IDPS" do
        gs.input :idp
        if !gs.object.nil?
          gs.input :_destroy, :as => :boolean, :label => "Eliminar?"
        end
      end
    end

    f.actions
  end

  # controller do
  #   def update_resource(object, attributes)
  #     puts "before update"
  #     puts attributes.inspect
  #     object.update_attributes(*attributes)
  #     puts "after update"
  #   end
  #   # def update(options={}, &block)
  #   #   super do |success, failure|
  #   #     block.call(success, failure) if block
  #   #     failure.html { render :edit }
  #   #   end
  #   # end
  # end

  csv do
    column :id
    column :name        
    column :description
    column :difficulty
    column :game_time
    column :idps
    column :number_of_players    
    column :suggested_age  
    column :level_preschool
    column :level_first_primary
    column :level_second_primary
    column :level_secondary
    column :youtube_link        
    column :cover_url
    #column('link_imagen') { |g| g.image.attached? ? url_for(g.image) : '' }     
    column :created_at     
    column :updated_at     
  end

end
