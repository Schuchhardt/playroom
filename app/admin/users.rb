ActiveAdmin.register User do
  active_admin_import validate: true,
    template: 'import',
    batch_size: 1,
    template_object: ActiveAdminImport::Model.new(
      hint: "Para cargar varios profesores al mismo tiempo es necesario crear el colegio primero y despues cargar planilla tipo aquí ",
      csv_headers: ["RBD","RUT","CORREO", "NOMBRE", "APELLIDO"],
      csv_options: {col_sep: ";", row_sep: nil, quote_char: nil}
    ),
    headers_rewrites: { :'RBD' => :establishment_id, :'RUT' => :rut, :'CORREO' => :email, :'NOMBRE' => :name, :'APELLIDO' => :last_name },
    before_batch_import: ->(importer) {
      establishment_rbds = importer.values_at(:establishment_id)
      # replacing rbd with establishment id
      establishments = Establishment.where(rbd: establishment_rbds).pluck(:rbd, :id)
      options = Hash[*establishments.flatten] # #{"1234" => 2, "12345" => 1}
      importer.batch_replace(:establishment_id, options)
    }

  collection_action :import_csv, method: :post do
    # Do some CSV importing work here...
    puts "begin importing"
    import_file = params[:active_admin_import_model][:file]
    csv = CSV.parse(import_file.path, :headers => true)
    debugger
    csv.each do |row| # rut tiene que estar con dv
      puts "ASDASDASD"
      puts row["NOMBRE"]
      puts row['rut']
    end
    puts "finished"
    redirect_to collection_path, notice: "Usuarios cargados!"
  end

  permit_params :name, :phone, :user_type, :email, :rut, :password, :password_confirmation,
    user_establishments_attributes: [:id, :_destroy, :establishment_id]

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :rut
    column :sign_in_count
    column :last_sign_in_at
    actions
  end

  filter :email
  filter :name

  show do
    attributes_table do
        row :name
        row :email
        row :rut
        row :user_type
        row :phone
        row :sign_in_count
        row :last_sign_in_at
        row :created_at
        row :updated_at
    end
    panel "Colegios a los que pertenece" do
      table_for user.establishments.uniq do
        column "Nombre - RBD" do |ps|
          link_to "#{ps.name} (#{ps.rbd})", admin_establishment_path(ps)
        end
      end
    end
  end

  form do |f|
    f.inputs do
      f.input :user_type, as: :select, collection: (User.translated_user_types.map{ |w| [w[0], w[1]]})
      f.input :email
      f.input :rut
      f.input :name
      f.input :phone
      f.input :password
      f.input :password_confirmation
    end

    f.has_many :user_establishments do |gs|
      gs.inputs "Colegios" do
        gs.input :establishment
        if !gs.object.nil?
          gs.input :_destroy, :as => :boolean, :label => "Eliminar?"
        end
      end
    end


    f.actions
  end

end
