# == Schema Information
#
# Table name: playset_subscriptions
#
#  id               :bigint(8)        not null, primary key
#  finished_at      :datetime
#  started_at       :datetime
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  establishment_id :bigint(8)
#  playset_id       :bigint(8)
#
# Indexes
#
#  index_playset_subscriptions_on_establishment_id  (establishment_id)
#  index_playset_subscriptions_on_playset_id        (playset_id)
#
# Foreign Keys
#
#  fk_rails_...  (establishment_id => establishments.id)
#  fk_rails_...  (playset_id => playsets.id)
#

require 'test_helper'

class PlaysetSubscriptionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
