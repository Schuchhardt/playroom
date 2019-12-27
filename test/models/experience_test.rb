# == Schema Information
#
# Table name: experiences
#
#  id          :bigint(8)        not null, primary key
#  description :text
#  image_url   :string
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  game_id     :bigint(8)
#  user_id     :bigint(8)
#
# Indexes
#
#  index_experiences_on_game_id  (game_id)
#  index_experiences_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (game_id => games.id)
#  fk_rails_...  (user_id => users.id)
#

require 'test_helper'

class ExperienceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
