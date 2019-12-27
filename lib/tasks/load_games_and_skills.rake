# rake load:games
namespace :load do
	
	GAMES_XLSX = "#{Rails.root}/db/data/Detalle de juegos y habilidades - Plataforma.xlsx"

	task :games => :environment do

		# Load xlsx
		xlsx = Roo::Spreadsheet.open(GAMES_XLSX)

		xlsx.each_row_streaming(offset: 2, max_rows: 100) do |row|
			next if row[0].value.nil?
			puts "*****"*5
			puts "name: #{row[0].value}"
			g = Game.find_or_create_by(name: row[0].value.strip)
			if g.nil?
				puts "No encontrado"
			else
				g.description = row[1].value
				g.suggested_age = row[2].value
				g.game_time = row[3].value
				g.number_of_players = row[4].value
				g.youtube_link = row[5].value
				g.difficulty = row[6].value
				g.idps = row[7].value
				g.level_first_primary = true
				g.level_preschool = true
				g.level_second_primary = true
				g.level_secondary = true
				g.save!
				puts g.inspect

				# skills_name = [
				# 	"Pensamiento Crítico",
				# 	"Pensamiento Creativo",
				# 	"Resolución de Problemas",
				# 	"Comunicación Efectiva",
				# 	"Trabajo en Equipo",
				# 	"Empatía",
				# 	"Recordar",
				# 	"Comprender",
				# 	"Aplicar",
				# 	"Analizar",
				# 	"Evaluar",
				# 	"Crear",
				# 	"Conciencia de sí mismo",
				# 	"Autorregulación",
				# 	"Conciencia de los otros",
				# 	"Habilidades para relacionarse",
				# 	"Toma de decisiones responsable"
				# ]

				# skills_name.each_with_index do |s_name, index|
				# 	if row[index + 12].value && row[index + 12].value == "x"
				# 		s = Skill.find_by_name s_name
				# 		gs = GameSkill.create game: g, skill: s
				# 		puts gs.inspect
				# 	end
				# end
			end

		end

	end

end