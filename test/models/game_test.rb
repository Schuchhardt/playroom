# == Schema Information
#
# Table name: games
#
#  id                   :bigint(8)        not null, primary key
#  cover_url            :string
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

require 'test_helper'

class GameTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
