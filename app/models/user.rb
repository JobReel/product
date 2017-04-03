class User < ApplicationRecord
  mount_uploader :image, ImageUploader
  mount_uploader :video, ImageUploader
  has_many :work_histories
  has_many :videos
  has_many :jobs
  has_many :jobreels
  has_many :educations
  has_many :recommendations
  after_create :set_defaults!

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

 validates :first_name, presence: true, on: :update
 validates :last_name, presence: true, on: :update
 validates :title, presence: true, on: :update
 validates :city, presence: true, on: :update
 validates :state, presence: true, on: :update
 validates :bio, presence: true, on: :update
 validates :degree_type, presence: true, on: :update
 validates :degree_field, presence: true, on: :update

 def set_defaults!
   byebug
   self.image.public_id = "default_avatar"
 end

end
