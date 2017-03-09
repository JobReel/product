class Recommendation < ApplicationRecord
  mount_uploader :profile_image, RecommendationUploader

  belongs_to :user

  validates :company_title, presence: true
  validates :company_name, presence: true
  validates :time_known, presence: true
  validates :user_relationship, presence: true
end
