class AddSubmitToJobreels < ActiveRecord::Migration[5.0]
  def change
    add_column :jobs, :published, :boolean, :default => false
    add_column :jobreels, :submit_status, :boolean, :default => false
  end
end
