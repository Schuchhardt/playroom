# rake load:gamesets
namespace :load do
	
	#gameset_csv = "#{Rails.root}/db/data/Juegos de Ludotecas.xlsx - Lista Ludotecas.csv"
	gameset_csv = "#{Rails.root}/db/data/ListaLudotecas.csv"

	task :gamesets => :environment do

		csv_text = File.read(gameset_csv)
		csv = CSV.parse(csv_text, :headers => true)
		csv.each do |row|
			games = Game.where id: row['Id Juego']#_by_name row['Nombre Original']
			if games.any? && !row['Ludoteca'].nil?
				playset = Playset.find_or_create_by name: row['Ludoteca']
				#playset.update description: row['Descripcion Ludoteca']
				GameSet.find_or_create_by(
					game: games.first,
					playset: playset,
					suggested_copies: row['Copias sugeridas'],
					#studied_goal: row['Objetivo Estudiado']
				)
			else
				puts "No encontrado, #{row['Nombre Original']}"
			end
		end

	end

end