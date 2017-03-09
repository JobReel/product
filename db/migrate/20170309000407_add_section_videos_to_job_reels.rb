class AddSectionVideosToJobReels < ActiveRecord::Migration[5.0]
  def change
    add_column :jobreels, :section1_videos, :string
    add_column :jobreels, :section2_videos, :string
    add_column :jobreels, :section3_videos, :string
    add_column :jobreels, :section4_videos, :string
    add_column :jobreels, :section5_videos, :string
  end
end
