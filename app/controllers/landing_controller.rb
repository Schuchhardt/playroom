class LandingController < ApplicationController
	before_action :authenticate_user!

	PLAYSET_TYPES = [
		{ id: "1", playset_type: "Convivencia Escolar", image_url: "https://i.imgur.com/q6oPqTX.jpg", description: "" },
		{ id: "2", playset_type: "Formación Ciudadana", image_url: "https://i.imgur.com/YE8UCqD.jpg", description: "" },
		{ id: "3", playset_type: "Decreto 83, DUA", image_url: "https://i.imgur.com/KuWUQJm.jpg", description: "" },
		{ id: "4", playset_type: "PIE", image_url: "https://i.imgur.com/HxgsqLd.jpg", description: "" },
		{ id: "5", playset_type: "Estrategias de Transición (373)", image_url: "https://i.imgur.com/YNVJX7D.jpg", description: "" },
		{ id: "6", playset_type: "Equipo directivo", image_url: "https://i.imgur.com/YNVJX7D.jpg", description: "" },
		{ id: "7", playset_type: "Taller PlayGo", image_url: "https://i.imgur.com/YNVJX7D.jpg", description: "" },
		{ id: "8", playset_type: "Espacios CRA", image_url: "https://i.imgur.com/YNVJX7D.jpg", description: "" },
		{ id: "9", playset_type: "EJT", image_url: "https://i.imgur.com/YNVJX7D.jpg", description: "" }
	]

	def index
		@current_establishment = current_user.establishments.first
  	end

	def playsets
		formatted_playsets = []
		if current_user.establishments.empty?
			return render json: formatted_playsets, status: 200
		end
		current_user.establishments.first.playsets.each do |pl|
			playset = pl.slice(:id, :name, :playset_type, :description, :number_of_games, :image_url ).dup
			playset[:disabled] = false
			formatted_playsets << playset
		end

		PLAYSET_TYPES.each do |ps|
			puts ps.inspect
			unless formatted_playsets.map{|fp| fp[:playset_type]}.uniq.include?(ps[:playset_type])
				formatted_playsets << ps.merge({ disabled: true })
			end
		end
		render json: formatted_playsets, status: 200
	end

	def playset
		formatted_games = []
		playset = Playset.find params[:id]
		playset.games.each do |gm|
			formatted_games << gm.slice(:id, :name, :description, :difficulty, :game_time, :number_of_players, :suggested_age, :youtube_embed_url, :image_url )
		end
		render json: {id: playset.id, name: playset.name, description: playset.description, games: formatted_games}, status: 200
	end

	def games
		formatted_games = []
		if current_user.establishments.empty?
			return render json: formatted_games, status: 200
		end
		current_user.establishments.first.playsets.each do |pl|
			pl.games.each do |game|
				formatted_games << game.slice(:id, :name, :description, :difficulty, :game_time, :idps, :number_of_players, :suggested_age, :youtube_embed_url, :image_url, :playsets_ids, :skills_ids, :skills_by_category, :game_levels)
			end
		end
		render json: formatted_games.sort_by { |obj| obj[:name] }.uniq { |item| item[:id] }
	end

	def skills
		formatted_skills = []
		Skill.all.each do |sk|
			formatted_skills << sk.slice(:id, :name, :skill_category)
		end
		render json: formatted_skills
	end

	def skills_categories
		skill_categories = Skill.all.group_by(&:skill_category)
		render json: skill_categories
	end

end
