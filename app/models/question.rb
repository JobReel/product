class Question < ApplicationRecord
  belongs_to :competency
  belongs_to :jobreel, optional: true
  belongs_to :job, optional: true

  validates :text, presence: true
  validates :comptetency_id, presence: true

end
