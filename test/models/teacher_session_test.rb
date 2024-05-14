# == Schema Information
#
# Table name: teacher_sessions
#
#  id                 :bigint(8)        not null, primary key
#  grade              :integer
#  number_of_students :integer
#  ods_4_material     :boolean
#  ods_4_motivation   :boolean
#  ods_5_gender       :boolean
#  ods_5_stereotypes  :boolean
#  played_at          :datetime
#  subject            :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  game_id            :bigint(8)        not null
#  user_id            :bigint(8)        not null
#
# Indexes
#
#  index_teacher_sessions_on_game_id  (game_id)
#  index_teacher_sessions_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (game_id => games.id)
#  fk_rails_...  (user_id => users.id)
#
require "test_helper"

class TeacherSessionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
