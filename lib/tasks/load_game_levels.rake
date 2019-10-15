# rake load:game_levels
namespace :load do

	task :game_levels => :environment do

		GameLevel.destroy_all

		Game.all.each do |game|
			if game.suggested_age
				levels = Level.where("since_age >= ?", game.suggested_age[/\d+/])
				levels.each do |level|
					gl = GameLevel.create game: game, level: level
					puts gl.inspect
				end
				game.update(
					level_preschool: levels.where(subcategory: "Educación de Párvulos").any?,
					level_first_primary: levels.where(subcategory: "1º Ciclo").any?,
					level_second_primary: levels.where(subcategory: "2º Ciclo").any?,
					level_secondary: levels.where(subcategory: "Educación Media").any?,
				)
				puts game.inspect
			end
		end

	end

end