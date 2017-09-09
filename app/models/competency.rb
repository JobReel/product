class Competency < ApplicationRecord
  has_many :questions

  belongs_to :job, optional: true
  belongs_to :jobreel, optional: true
  
end
