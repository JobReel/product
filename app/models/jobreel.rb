class Jobreel < ApplicationRecord
  belongs_to :user
  belongs_to :job

  has_many :videos

end
