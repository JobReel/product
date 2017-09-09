class AddCompetencyIdtoQuestions < ActiveRecord::Migration[5.0]
  def change
    add_column :questions, :competency_id, :integer
  end
end
