class CreateEducations < ActiveRecord::Migration[5.0]
  def change
    create_table :educations do |t|
      t.integer :user_id
      t.string :college_name
      t.string :college_major
      t.string :college_end_date
      t.string :college_start_date
      t.text :education_description
      t.string :video_id
      t.timestamps
    end
  end
end
