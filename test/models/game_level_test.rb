# == Schema Information
#
# Table name: game_levels
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  game_id    :bigint(8)
#  level_id   :bigint(8)
#
# Indexes
#
#  index_game_levels_on_game_id   (game_id)
#  index_game_levels_on_level_id  (level_id)
#
# Foreign Keys
#
#  fk_rails_...  (game_id => games.id)
#  fk_rails_...  (level_id => levels.id)
#

require 'test_helper'

class GameLevelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
