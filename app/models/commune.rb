# == Schema Information
#
# Table name: communes
#
#  id         :bigint(8)        not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  region_id  :bigint(8)
#
# Indexes
#
#  index_communes_on_region_id  (region_id)
#
# Foreign Keys
#
#  fk_rails_...  (region_id => regions.id)
#

class Commune < ApplicationRecord
  belongs_to :region
  has_many :establishments
  default_scope { order(name: :asc) }

end
