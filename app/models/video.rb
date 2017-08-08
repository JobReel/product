class Video < ApplicationRecord
  mount_uploader :cloud_video, VideoUploader
  belongs_to :user
  belongs_to :job, optional: true
  belongs_to :work_history, optional: true
  belongs_to :jobreel, optional: true

end
