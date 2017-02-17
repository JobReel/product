class CreateVideos < ActiveRecord::Migration[5.0]
  def change
    create_table :videos do |t|
      t.integer :user_id
      t.string :cloud_video
      t.string :video_section

      t.timestamps
    end
  end
end
