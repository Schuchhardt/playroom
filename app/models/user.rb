# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)        not null, primary key
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :inet
#  email                  :string
#  encrypted_password     :string           default(""), not null
#  last_name              :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :inet
#  name                   :string
#  phone                  :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  role                   :string
#  rut                    :string
#  sign_in_count          :integer          default(0), not null
#  user_type              :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

class User < ApplicationRecord
  include TranslateEnum
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable, :validatable, :trackable, :registerable
  
  has_many :user_establishments, dependent: :destroy
  has_many :establishments, through: :user_establishments

  accepts_nested_attributes_for :user_establishments, :allow_destroy => true

  enum user_type: { teacher: 0, executive: 1}
  translate_enum :user_type

  attr_accessor :rbd


  def display_name
  	"#{self.name} #{self.email}"
  end

  def school_name
    if establishments.any?
      if establishments.uniq.count > 1
        "#{establishments.length} colegios" 
      else
        establishments.first.name
      end
    end
  end

end
