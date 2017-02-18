class Video < ApplicationRecord
  mount_uploader :cloud_video, VideoUploader
  belongs_to :user
end
