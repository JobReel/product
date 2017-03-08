class CreateRecommendations < ActiveRecord::Migration[5.0]
  def change
    create_table :recommendations do |t|
      t.integer :user_id
      t.boolean :verified
      t.string :company_name
      t.string :company_title
      t.string :user_relationship
      t.string :time_known
      t.string :video_id
      t.string :profile_image
      t.timestamps
    end
  end
end
