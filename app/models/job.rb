class Job < ApplicationRecord
  belongs_to :user

  has_many :jobreels, as: :polygroup1
  has_many :videos, as: :viewable
end
