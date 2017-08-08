class AddSectionDurationsToJobreels < ActiveRecord::Migration[5.0]
  def change
      add_column :jobreels, :section1_duration, :float, null: true
      add_column :jobreels, :section2_duration, :float, null: true
      add_column :jobreels, :section3_duration, :float, null: true
      add_column :jobreels, :section4_duration, :float, null: true
      add_column :jobreels, :section5_duration, :float, null: true
  end
end
