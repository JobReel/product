class Jobreel < ApplicationRecord
  belongs_to :user
  belongs_to :job, optional: true

  has_many :videos

  def job_title
    job ? job.job_title : "Profile Jobreel"
  end

  def as_json(options = { })
    h = super (options)
    h[:job_title] = job_title
    h
  end

end
