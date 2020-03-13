# rake load:teachers CSV="" RBD=""
namespace :load do
	
	ROOT_CSV = "#{Rails.root}/db/data/establishments/"

    task :teachers => :environment do
        
        if ENV['CSV'].empty? or ENV['RBD'].empty?
            puts "missing CSV or RBD"
            return false
        end

        est = Establishment.find_by rbd: ENV['RBD']
        if est.nil?
            puts "establishment not found"
            return false
        end

		csv_text = File.read("#{ROOT_CSV}#{ENV['CSV']}")
		csv = CSV.parse(csv_text, :headers => true)
        csv.each do |row|
            pass = row['RUT'].gsub(".", "").gsub("-", "").gsub("K", "k") # password es su rut sin puntos ni guion
            user = User.find_by email: row['CORREO']
            user_data = {name: row['NOMBRE'], last_name: row['APELLIDO'], rut: row['RUT'], password: pass, phone: row['FONO'].gsub(/\s+/, ""), user_type: :teacher}
            if user.nil?
                user = User.create user_data.merge({email: row['CORREO'].strip.downcase})
            else
                user.update! user_data
            end
            puts user.inspect
            UserEstablishment.create establishment: est, user: user
		end

	end

end