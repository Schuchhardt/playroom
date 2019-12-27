# == Schema Information
#
# Table name: playsets
#
#  id               :bigint(8)        not null, primary key
#  description      :string
#  finish_at        :date
#  name             :string
#  playset_type     :string
#  price            :integer
#  start_at         :date
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  establishment_id :bigint(8)
#
# Indexes
#
#  index_playsets_on_establishment_id  (establishment_id)
#
# Foreign Keys
#
#  fk_rails_...  (establishment_id => establishments.id)
#

class Playset < ApplicationRecord
	belongs_to :establishment
	has_many :game_sets, dependent: :destroy
	has_many :games, through: :game_sets
	has_one_attached :image
	accepts_nested_attributes_for :game_sets, :allow_destroy => true

	def number_of_games
		self.games.count
	end

	def image_url
		self.image.service_url if self.image and self.image.attached?
	end
end
