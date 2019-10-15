# == Schema Information
#
# Table name: playsets
#
#  id          :bigint(8)        not null, primary key
#  description :string
#  name        :string
#  price       :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Playset < ApplicationRecord
	has_many :game_sets
	has_many :games, through: :game_sets
	has_one_attached :image

	def number_of_games
		self.games.count
	end

	def image_url
		self.image.service_url if self.image and self.image.attached?
	end
end
