class CreateCompetencies < ActiveRecord::Migration[5.0]
  def change
    create_table :competencies do |t|
      t.string :name
      t.integer :job_id
      t.integer :jobreel_id
      t.text :summary

      t.timestamps
    end
  end
end
