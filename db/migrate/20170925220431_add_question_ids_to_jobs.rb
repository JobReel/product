class AddQuestionIdsToJobs < ActiveRecord::Migration[5.0]
  def change
    add_column :jobs, :question_id, :integer, array: true, default: []
  end
end
