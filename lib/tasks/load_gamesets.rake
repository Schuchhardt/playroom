# rake load:gamesets
namespace :load do
	
	gameset_csv = "#{Rails.root}/db/data/Juegos de Ludotecas.xlsx - Lista Ludotecas.csv"

	task :gamesets => :environment do

		csv_text = File.read(gameset_csv)
		csv = CSV.parse(csv_text, :headers => true)
		csv.each do |row|
			puts row.inspect
			game = Game.find_by_name row['Nombre Original']
			if game
				playset = Playset.find_or_create_by name: row['Ludoteca']
				playset.update description: row['Descripcion Ludoteca']
				GameSet.find_or_create_by(
					game: game,
					playset: playset,
					suggested_copies: row['Copias sugeridas'],
					studied_goal: row['Objetivo Estudiado']
				)
			end
		end

	end

end