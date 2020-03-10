# == Schema Information
#
# Table name: games
#
#  id                   :bigint(8)        not null, primary key
#  description          :string
#  difficulty           :string
#  game_time            :string
#  game_time_from       :integer
#  game_time_to         :integer
#  game_type            :string
#  level_first_primary  :boolean          default(FALSE)
#  level_preschool      :boolean          default(FALSE)
#  level_second_primary :boolean          default(FALSE)
#  level_secondary      :boolean          default(FALSE)
#  name                 :string
#  number_of_players    :string
#  sku                  :string
#  suggested_age        :string
#  youtube_link         :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class Game < ApplicationRecord
	has_one_attached :image
	has_many :game_sets
	has_many :game_skills
	has_many :game_levels
	has_many :game_idps
	has_many :playsets, through: :game_sets
	has_many :levels, through: :game_levels
	has_many :skills, through: :game_skills
	has_many :idps, through: :game_idps
	accepts_nested_attributes_for :game_skills, :allow_destroy => true
	accepts_nested_attributes_for :game_idps, :allow_destroy => true
	default_scope { order(name: :asc) }

	def image_url
		self.image.service_url if self.image and self.image.attached?
	end

	def youtube_embed_url
		"https://www.youtube.com/embed/#{YouTubeAddy.extract_video_id(self.youtube_link)}" if self.youtube_link
	end

	def playsets_ids
		self.playsets.map(&:id)
	end

	def category_levels
		self.levels.map(&:category).uniq
	end

	def idps_names
		"#{self.idps.map(&:name).join(" - ")}"
	end	

	def game_levels
	 	gl = []
		gl << "Ed. Párvulos" if self.level_preschool
		gl << "1ª Ciclo" if self.level_first_primary
		gl << "2ª Ciclo" if self.level_second_primary
		gl << "Ed. Media" if self.level_secondary
        gl
	end

	def skills_ids
		self.skills.map(&:id)
	end

	def skills_by_category
		self.skills.group_by(&:skill_category)
	end

end
