class CreateJobreels < ActiveRecord::Migration[5.0]
  def change
    create_table :jobreels do |t|
      t.integer :user_id
      t.integer :overall_rating
      t.integer :competency_ratings, array: true, default: []
      t.string :video_list, array: true, default: []


      t.timestamps
    end
  end
end
