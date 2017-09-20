class Jobreel < ApplicationRecord
  belongs_to :user
  belongs_to :job, optional: true

  has_many :videos
  has_many :competencies
  has_many :questions

  def job_title
    job ? job.job_title : "Profile Jobreel"
  end

  def as_json(options = { })
    h = super (options)
    h[:job_title] = job_title
    h
  end

  def get_section1_videos
    JSON.parse(section1_videos)
  end

  def get_videos(section)
    JSON.parse(section)
    case section
    when :section1
      JSON.parse(section1_videos)
    when :section2
      JSON.parse(section2_videos)
    end
  end

end
