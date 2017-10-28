class AddQualificationsToJobs < ActiveRecord::Migration[5.0]
  def change
    add_column :jobs, :qualifications, :text
  end
end
