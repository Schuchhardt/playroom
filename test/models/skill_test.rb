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

require 'test_helper'

class SkillTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
