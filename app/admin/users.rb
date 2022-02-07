ActiveAdmin.register User do
  active_admin_import validate: true,
    template: 'import',
    batch_size: 1,
    template_object: ActiveAdminImport::Model.new(
      hint: "Para cargar varios profesores al mismo tiempo es necesario crear el colegio primero y despues cargar planilla (csv) en esta pantalla",
      csv_headers: ["RUT","CORREO", "NOMBRE", "APELLIDO"],
      csv_options: {col_sep: ";", row_sep: nil, quote_char: nil}
    )

  collection_action :import_csv, method: :post do
    # Do some CSV importing work here...
    errors = []
    lines = []
    if params[:active_admin_import_model].nil?
      errors << "Por favor adjuntar planilla" 
    else
      puts "begin importing"
      import_headers = ["RUT","CORREO", "NOMBRE", "APELLIDO"]
      import_file = params[:active_admin_import_model][:file]
      File.open(import_file.path) do |f|
        line_counter = 0
        f.each_line do |line|
          puts line.inspect
          if (line_counter == 0) # header
            if import_headers.join(',') != line.strip or line.strip.split(',').length != import_headers.length
              errors << "Formato de planilla incorrecto" 
              break
            end
          else
            fields = line.strip.split(",")
            if (fields[0].empty? or fields[1].empty? or fields[2].empty?)
              errors << "Faltan datos requeridos como RUT, CORREO o NOMBRE" 
            else
              lines << line.strip
            end
          end
          line_counter +=1
        end
      end
      puts "finished"
    end
    if errors.empty?
      users_created = []
      lines.each do |l|
        fields = l.split(",")
        rut = fields[0].gsub(".", "").gsub("-", "").gsub("K", "k") # password es su rut sin puntos ni guion
        user = User.find_by email: fields[1]
        user_data = {name: fields[2].strip, last_name: fields[3], rut: rut, password: rut, user_type: :teacher} 
        if user.nil?
            user = User.create user_data.merge({email: fields[1].strip.downcase})
        else
            user.update! user_data
        end
        puts user.inspect
        users_created << UserEstablishment.find_or_create_by(establishment_id: params[:establishment_id], user_id: user.id)
      end
      redirect_to collection_path, notice: "#{users_created.length} Usuarios cargados!"
    else
      redirect_to "/admin/users/import", flash: { error: errors.first }
    end
  end

  permit_params :name, :phone, :user_type, :email, :rut, :password, :password_confirmation,
    user_establishments_attributes: [:id, :_destroy, :establishment_id]

  index do
    selectable_column
    id_column
    column :name
    column :email
    column :rut
    column "Colegio" do |user|
      user.school_name
    end
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
