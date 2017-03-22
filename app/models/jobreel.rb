class Jobreel < ApplicationRecord
  belongs_to :user
  belongs_to :job, optional: true

  has_many :videos

  def job_title
    job ? job.job_title : "Profile Jobreel"
  end
  #
  # def section1_title
  #   job ? section1_title : "Introduction"
  # end
  #
  # def section2_title
  #   job ? section2_title : "Education"
  # end
  #
  # def section3_title
  #   job ? section3_title : "Work Experience"
  # end
  #
  # def section4_title
  #   job ? section4_title : "Hobbies"
  # end
  #
  # def section5_title
  #   job ? section5_title : "Recommendations"
  # end

  def as_json(options = { })
    h = super (options)
    h[:job_title] = job_title
    # h[:section1_title] = section1_title
    # h[:section2_title] = section2_title
    # h[:section3_title] = section3_title
    # h[:section4_title] = section4_title
    # h[:section5_title] = section5_title
    h
  end

end
