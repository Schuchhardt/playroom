# == Schema Information
#
# Table name: levels
#
#  id          :bigint(8)        not null, primary key
#  category    :string
#  name        :string
#  since_age   :integer
#  subcategory :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class LevelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
