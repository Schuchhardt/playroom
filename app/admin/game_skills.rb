ActiveAdmin.register GameSkill do
  permit_params :game_id, :skill_id
  menu priority: 6

  index do
    selectable_column
    id_column
    column :game
    column :skill
    actions
  end

  filter :game
  filter :skill

  form do |f|
    f.inputs do
      f.input :game
      f.input :skill
    end
    f.actions
  end

end
