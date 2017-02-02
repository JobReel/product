class AddDatesToWorkHistory < ActiveRecord::Migration[5.0]
  def change
    add_column :work_histories, :job_start_date, :datetime
    rename_column  :work_histories, :employment_dates, :job_end_date
  end
end
