class Job < ApplicationRecord
  belongs_to :user

  has_many :jobreels
  has_many :videos
  has_many :competencies
  has_many :questions

  validates_uniqueness_of :job_title, scope: [:user_id, :city, :state]

end
