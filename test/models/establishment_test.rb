# == Schema Information
#
# Table name: establishments
#
#  id                             :bigint(8)        not null, primary key
#  address                        :string
#  education_level_preschool      :boolean
#  education_level_primary        :boolean
#  education_level_secondary      :boolean
#  education_level_secondary_tech :boolean
#  establishment_kind             :string
#  ive                            :integer
#  name                           :string
#  phone                          :string
#  rbd                            :string
#  students_per_course            :integer
#  total_students                 :integer
#  created_at                     :datetime         not null
#  updated_at                     :datetime         not null
#  commune_id                     :bigint(8)
#
# Indexes
#
#  index_establishments_on_commune_id  (commune_id)
#
# Foreign Keys
#
#  fk_rails_...  (commune_id => communes.id)
#

require 'test_helper'

class EstablishmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
