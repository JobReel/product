class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.string :text
      t.integer :job_id
      t.integer :jobreel_id
      t.integer :rating

      t.timestamps
    end
  end
end
