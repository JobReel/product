class AddTitlesToJobreels < ActiveRecord::Migration[5.0]
  def change
    add_column :jobreels, :job_id, :integer
    add_column :jobreels, :section1_title, :string
    add_column :jobreels, :section2_title, :string
    add_column :jobreels, :section3_title, :string
    add_column :jobreels, :section4_title, :string
    add_column :jobreels, :section5_title, :string
  end
end
