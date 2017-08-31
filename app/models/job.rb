class Job < ApplicationRecord
  belongs_to :user

  has_many :jobreels
  has_many :videos

end
