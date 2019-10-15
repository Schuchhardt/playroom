# rake read_pdf:images
namespace :read_pdf do
	
	ROOT_GAMES = "#{Rails.root}/db/data/games/"

	task :images => :environment do

		Game.all.each do |game|
			next if game.name.nil?
			g_folder = game.name.strip.gsub(/\s+/, "_").tr("!¡/,@#'´.áéíóúÁÉÍÓÚñ+:", '')
			filename = "#{ROOT_GAMES}#{g_folder}/cover.png"
			if File.exist?(filename)
				file = File.open(filename)
				game.image.attach(io: file, filename: "#{g_folder}.png")
				game.save!
				ap game
			else
				puts "*****"*4
				puts "NO EXISTE!!! #{filename}"
			end
		end

	end
end