class AddDurationToVideos < ActiveRecord::Migration[5.0]
  def change
      add_column :videos, :duration, :float, null: true
  end
end
