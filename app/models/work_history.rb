class WorkHistory < ActiveRecord::Base
  belongs_to :user
  has_many :videos

  validates :job_title, presence: true
  validates :company_name, presence: true
  validates :job_end_date, presence: true
  validates :job_description, presence: true
  validates :job_start_date, presence: true
end
