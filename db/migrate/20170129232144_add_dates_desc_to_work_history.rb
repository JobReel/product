class AddDatesDescToWorkHistory < ActiveRecord::Migration[5.0]
  def change
    add_column :work_histories, :employment_dates, :datetime
    add_column :work_histories, :job_description, :text
    add_column :users, :degree, :string
  end
end
