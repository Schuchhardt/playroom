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
            user = User.find_or_create_by email: row['CORREO']
            user.update! name: row['NOMBRE'], password: row['RUT'].gsub(".", "").gsub("-", "").gsub("K", "k"), user_type: :teacher
            puts user.inspect
            UserEstablishment.create establishment: est, user: user
		end

	end

end