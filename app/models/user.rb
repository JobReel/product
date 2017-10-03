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
    puts Dir.pwd
    self.first_name ||= "default_avatar"
    self.last_name ||= "Last Name"
    self.title = "Job Title"
    self.city = "City"
    self.state = "State"
    self.bio = "Your Bio"
    self.degree = "degree"
    self.degree_type = "Type of Degree"
    self.degree_field = "Degree Field"
    self.save!
    self.video = ImageUploader.new
    self.first_name ||= "First Name"
    if self.first_name == "First Name"
      img = Avatarly.generate_avatar(self.email, {size: 128})
    else
      img = Avatarly.generate_avatar(self.first_name + " " + self.last_name, {size: 128})
    end
    File.open('app/assets/images/avatar/' + self.email + '.png', 'wb') do |f|
      f.write img
    end
    self.image = Rails.root.join('app/assets/images/avatar/' + self.email + '.png').open
    self.save!
    set_default_jobreel(self)
  end

  private

  def set_default_jobreel(user)
    @defaultjr = Jobreel.new(user_id:user.id)
    @defaultjr.save!
  end


end
