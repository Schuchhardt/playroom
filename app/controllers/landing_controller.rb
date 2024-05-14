class LandingController < ApplicationController
	before_action :authenticate_user!

	def index
		@current_establishment = get_current_establishment
  	end

	def playsets
		formatted_playsets = []
		# if current_user.establishments.empty?
		# 	return render json: formatted_playsets, status: 200
		# end
		get_current_establishment.playsets.each do |pl|
			playset = pl.slice(:id, :name, :playset_type, :description, :number_of_games, :cover_url, :number_of_games ).dup
			playset[:image_url] = get_default_img(playset) if playset[:cover_url].nil? || playset[:cover_url].empty?
			playset[:disabled] = false
			formatted_playsets << playset
		end

		PLAYSET_TYPES.each do |ps|
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
		games_to_match = []
		if current_user.establishments.empty?
			return render json: formatted_games, status: 200
		end
		if params[:playset_id]
			playset = Playset.find params[:playset_id]
			games_to_match = playset.games
		else
			get_current_establishment.playsets.each do |pl|
				pl.games.each do |game|
					games_to_match << game
				end
			end
		end
		
		games_to_match.each do |game|
			formatted_games << game.slice(:id, :name, :description, :difficulty, :game_time, :number_of_players, :suggested_age, :youtube_embed_url, :image_url, :game_levels)
		end
		render json: formatted_games.sort_by { |obj| obj[:name] }.uniq { |item| item[:id] }
	end

	def game
		game = Game.find params[:id]
		g = game.slice(:id, :name, :description, :difficulty, :game_time, :idps_names, :number_of_players, :suggested_age, :youtube_embed_url, :image_url, :playsets_ids, :skills_ids, :skills_by_category, :game_levels, :game_type, :pdf_url, :sku, :game_time_from, :game_time_to)
		all_games_in_playset = []
		get_current_establishment.playsets.each do |pl|
			pl.games.each do |game|
				all_games_in_playset << game.slice(:id, :name, :image_url, :game_time, :difficulty, :suggested_age) if game[:id] != g[:id]
			end
		end
		related_games = get_related_games(g, all_games_in_playset.uniq{|gp| gp[:id]})
		render json: g.merge({related_games: related_games}) , status: 200
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

	def resources
		formatted_res = []
		if current_user.establishments.empty?
			return render json: formatted_res, status: 200
		end
		Resource.all.each do |res|
			formatted_res << res.slice(:id, :name, :file_url)
		end
		render json: formatted_res
	end

	def new_teacher_session
		sessions = []
		sessions_errors = []
		params[:games].each do |game|
			new_session = TeacherSession.new(
				user_id: current_user.id,
				game_id: game,
				number_of_students: params[:students],
				subject: params[:time],
				played_at: params[:day],
				grade: params[:course].to_i,
				ods_4_material:	params[:ods_4_material].to_i,
				ods_4_motivation:	params[:ods_4_motivation].to_i,
				ods_5_gender:	params[:ods_5_gender].to_i,
				ods_5_stereotypes:	params[:ods_5_stereotypes].to_i
			)
			if new_session.save
				sessions << new_session
			else
				sessions_errors << new_session.errors
			end
		end
		if sessions_errors.any?
			render json: { errors: sessions_errors }, status: 400
		else
			render json: sessions, status: 200
		end
	end

	def presigned_url
		s3_client = Aws::S3::Client.new(
			access_key_id: Rails.application.credentials.aws[:access_key_id],
			secret_access_key: Rails.application.credentials.aws[:secret_access_key],
			region: Rails.application.credentials.aws[:region]
		)
		
		bucket = Rails.application.credentials.aws[:bucket]
		object_key = params[:filename]
		final_url = "https://#{bucket}.s3.#{Rails.application.credentials.aws[:region]}.amazonaws.com/#{object_key}"
		presigned_url = s3_client.presigned_url(:put_object, bucket: bucket, key: object_key, acl: 'public-read')
	
		render json: { url: presigned_url, final_url: final_url }
	end

	private
	
	def get_default_img playset
		PLAYSET_TYPES.find{ |pl| pl[:playset_type] == playset[:playset_type]}[:image_url]
	end

	def get_related_games game, games_to_match
		games_ranking = []
		games_to_match.each do |g|
			#matches = count_matches(game[:skills_ids], g[:skills_ids])
			matches = 0
			matches += 1 if g[:difficulty] == game[:difficulty]
			matches += 1 if g[:suggested_age] == game[:suggested_age]
			matches += 1 if g[:game_time] == game[:game_time]
			games_ranking << { matches: matches, game: g}
		end
		games_ranking.sort_by{ |hsh| hsh[:matches] }.map{ |hsh| hsh[:game] }.reverse.first(4)
	end

	def count_matches arr, arr2
		num = 0
		arr.uniq.each do |a|
			num += arr2.uniq.count(a)
		end
		num
	end

	def get_current_establishment
		if cookies[:establishment_id].nil?
			current_user.establishments.count > 0 ? current_user.establishments.first : Establishment.first
		else 
			est = current_user.establishments.find_by(id: cookies[:establishment_id])
			if est.nil?
				current_user.establishments.count > 0 ? current_user.establishments.first : Establishment.first
			else
				est
			end
		end
	end

end
