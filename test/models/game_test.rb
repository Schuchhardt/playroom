# == Schema Information
#
# Table name: games
#
#  id                   :bigint(8)        not null, primary key
#  description          :string
#  difficulty           :string
#  game_time            :string
#  idps                 :string
#  level_first_primary  :boolean          default(FALSE)
#  level_preschool      :boolean          default(FALSE)
#  level_second_primary :boolean          default(FALSE)
#  level_secondary      :boolean          default(FALSE)
#  name                 :string
#  number_of_players    :string
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
