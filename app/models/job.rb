class Job < ApplicationRecord
  belongs_to :user

  has_many :jobreels
  has_many :videos
  has_many :competencies
  has_many :questions
  
  validates_uniqueness_of :job_title, scope: [:user_id, :city, :state]
  after_create :create_jobreel_for_job!


  def create_jobreel_for_job!
    @jobreel = Jobreel.new()
    @jobreel.user_id = current_user.id
    @jobreel.job_id = Job.last.id
    @jobreel.section1_title = "About the Company"
    @jobreel.section2_title = "Challenges"
    @jobreel.section3_title = "Expectations"
    @jobreel.section4_title = "Team"
    @jobreel.section5_title = "Perks & Benefits"
    @jobreel.section1_duration = 0
    @jobreel.section2_duration = 0
    @jobreel.section3_duration = 0
    @jobreel.section4_duration = 0
    @jobreel.section5_duration = 0
    @jobreel.save!
  end

end
