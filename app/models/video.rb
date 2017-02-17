class Video < ApplicationRecord
  mount_uploader :cloud_video, ImageUploader
  belongs_to :user
end
