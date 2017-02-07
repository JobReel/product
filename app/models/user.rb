class User < ApplicationRecord
  has_many :work_histories

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :bio, presence: true
  validates :degree_type, presence: true
  validates :degree_field, presence: true
end
