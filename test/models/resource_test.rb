# == Schema Information
#
# Table name: resources
#
#  id         :bigint(8)        not null, primary key
#  file_url   :string
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class ResourceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
