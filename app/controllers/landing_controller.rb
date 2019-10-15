class LandingController < ApplicationController
	before_action :authenticate_user!

	def index
		@current_establishment = current_user.establishments.first
  	end

	def playsets
		formatted_playsets = []
		if current_user.establishments.empty?
			return render json: formatted_playsets, status: 200
		end
		current_user.establishments.first.playsets.each do |pl|
			playset = pl.slice(:id, :name, :description, :number_of_games, :image_url ).dup
			playset[:disabled] = false
			formatted_playsets << playset
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
