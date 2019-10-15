# == Schema Information
#
# Table name: game_sets
#
#  id               :bigint(8)        not null, primary key
#  studied_goal     :string
#  suggested_copies :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  game_id          :bigint(8)
#  playset_id       :bigint(8)
#
# Indexes
#
#  index_game_sets_on_game_id     (game_id)
#  index_game_sets_on_playset_id  (playset_id)
#
# Foreign Keys
#
#  fk_rails_...  (game_id => games.id)
#  fk_rails_...  (playset_id => playsets.id)
#

require 'test_helper'

class GameSetTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
