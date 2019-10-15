# == Schema Information
#
# Table name: skills
#
#  id             :bigint(8)        not null, primary key
#  name           :string
#  skill_category :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Skill < ApplicationRecord
	has_many :game_skills, dependent: :destroy

	def display_name
		"#{self.skill_category} #{self.name}"
	end
end
