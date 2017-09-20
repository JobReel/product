class Question < ApplicationRecord
  belongs_to :competency
  belongs_to :jobreel, optional: true
  belongs_to :job, optional: true

  validates :text, presence: true
  validates :competency_id, presence: true

end
