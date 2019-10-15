# == Schema Information
#
# Table name: game_skills
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  game_id    :bigint(8)
#  skill_id   :bigint(8)
#
# Indexes
#
#  index_game_skills_on_game_id   (game_id)
#  index_game_skills_on_skill_id  (skill_id)
#
# Foreign Keys
#
#  fk_rails_...  (game_id => games.id)
#  fk_rails_...  (skill_id => skills.id)
#

class GameSkill < ApplicationRecord
  belongs_to :game
  belongs_to :skill
end
