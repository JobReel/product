class User < ApplicationRecord
  mount_uploader :image, ImageUploader
  mount_uploader :video, ImageUploader
  mount_uploader :image, ImageUploader
  has_many :work_histories
  has_many :videos, as: :viewable
  has_many :jobs
  has_many :jobreels, as: :polygroup1

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
end
