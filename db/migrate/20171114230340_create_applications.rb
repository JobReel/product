class CreateApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :applications do |t|

      t.integer :user_id
      t.integer :job_id
      t.integer :jobreel_id
      t.integer :access_ids, array: true, default: []
      t.string :status

      t.timestamps
    end
  end
end
