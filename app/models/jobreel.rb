class Jobreel < ApplicationRecord
  belongs_to :user
  belongs_to :job
  belongs_to :polygroup1, polymorphic: true

  has_many :videos, as: :viewable

end
