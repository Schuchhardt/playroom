# == Schema Information
#
# Table name: playsets
#
#  id               :bigint(8)        not null, primary key
#  cover_url        :string
#  description      :string
#  finish_at        :date
#  name             :string
#  playset_type     :string
#  price            :integer
#  start_at         :date
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  establishment_id :bigint(8)
#
# Indexes
#
#  index_playsets_on_establishment_id  (establishment_id)
#
# Foreign Keys
#
#  fk_rails_...  (establishment_id => establishments.id)
#

require 'test_helper'

class PlayroomTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
