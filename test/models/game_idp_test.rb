# == Schema Information
#
# Table name: game_idps
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  game_id    :bigint(8)
#  idp_id     :bigint(8)
#
# Indexes
#
#  index_game_idps_on_game_id  (game_id)
#  index_game_idps_on_idp_id   (idp_id)
#
# Foreign Keys
#
#  fk_rails_...  (game_id => games.id)
#  fk_rails_...  (idp_id => idps.id)
#

require 'test_helper'

class GameIdpTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
