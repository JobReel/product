class Video < ApplicationRecord
  mount_uploader :cloud_video, VideoUploader
  belongs_to :user
  belongs_to :job
  belongs_to :work_history
  belongs_to :jobreel



end
