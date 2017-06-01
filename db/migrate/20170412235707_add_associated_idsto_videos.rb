class AddAssociatedIdstoVideos < ActiveRecord::Migration[5.0]
  def change
    add_column :videos, :job_id, :integer, null: true
    add_column :videos, :jobreel_id, :integer, null: true
    add_column :videos, :work_history_id, :integer, null: true
  end
end
