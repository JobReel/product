class CreateJobs < ActiveRecord::Migration[5.0]
  def change
    create_table :jobs do |t|

      t.integer :user_id
      t.integer :overall_rating
      t.string :company_name
      t.string :logo
      t.string :job_title
      t.string :city
      t.string :state
      t.text :job_description
      t.string :requirements, array: true, default: []

      t.timestamps
    end
  end
end
