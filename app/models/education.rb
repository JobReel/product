class Education < ApplicationRecord
  belongs_to :user

  validates :college_major, presence: true
  validates :college_name, presence: true
  validates :college_end_date, presence: true
  validates :education_description, presence: true
  validates :college_start_date, presence: true

end
