ActiveAdmin.register Game do
  active_admin_import
  permit_params :name, :description, :difficulty, :game_time, :number_of_players, :suggested_age, :youtube_link, :level_preschool, :level_first_primary, :level_second_primary, :level_secondary, :image
  menu priority: 3

  index do
    selectable_column
    id_column
    column :name
    column :description
    column :difficulty
    column :game_time           
    column :number_of_players
    column :suggested_age
    actions
  end

  filter :name

  show do
    attributes_table do
        row :name
        row :description
        row :difficulty
        row :game_time           
        row :number_of_players
        row :idps
        row :suggested_age
        row :youtube_link
        row :level_preschool
        row :level_first_primary
        row :level_second_primary
        row :level_secondary
        row "Imagen" do |g|
          if g.image.attached?
            image_tag url_for(g.image)
          else
            nil
          end
        end
    end
    panel "Ludotecas" do
      table_for game.game_sets do
        column "Nombre" do |gs|
          gs.playset.name
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
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :description
      f.input :difficulty
      f.input :game_time           
      f.input :number_of_players
      f.input :idps
      f.input :suggested_age
      f.input :youtube_link
      f.input :level_preschool
      f.input :level_first_primary
      f.input :level_second_primary
      f.input :level_secondary
      f.input :image, as: :file
    end
    
    # f.has_many :game_skills, label: "asd" do |gs|
    #   gs.inputs "Habilidades" do
    #     if !gs.object.nil?
    #       gs.input :_destroy, :as => :boolean, :label => "Eliminar?"
    #     end

    #     gs.input :skill 
    #   end
    # end

    f.actions
  end


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
    column('link_imagen') { |g| g.image.attached? ? url_for(g.image) : '' }     
    column :created_at     
    column :updated_at     
  end

end
