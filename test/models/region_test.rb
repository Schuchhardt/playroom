# == Schema Information
#
# Table name: regions
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  short_name :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class RegionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
