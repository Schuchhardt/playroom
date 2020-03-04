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

class Resource < ApplicationRecord
    has_many :establishment_resources
end
