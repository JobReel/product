class CreateWorkHistory < ActiveRecord::Migration[5.0]
  def change
    create_table :work_histories do |t|
      t.integer :user_id
      t.string :job_title
      t.string :company_name

    end
  end
end
