class ChangeDatetimeToDate < ActiveRecord::Migration[5.0]
  def change
    change_column :work_histories, :job_start_date, :date
    change_column :work_histories, :job_end_date, :date
  end
end
