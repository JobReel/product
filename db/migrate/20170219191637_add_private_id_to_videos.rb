class AddPrivateIdToVideos < ActiveRecord::Migration[5.0]
  def change
    add_column :videos, :private_id, :string
  end
end
