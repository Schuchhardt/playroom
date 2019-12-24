ActiveAdmin.register GameSet do
  permit_params :game_id, :playset_id, :suggested_copies
  menu false

  index do
    selectable_column
    id_column
    column :game
    column :playset
    column :suggested_copies
    actions
  end

  filter :game
  filter :playset

  form do |f|
    f.inputs do
      f.input :playset
      f.input :game
      f.input :suggested_copies
    end
    f.actions
  end

end
