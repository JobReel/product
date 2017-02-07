class AddDegreeToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :degree_type, :string
    add_column :users, :degree_field, :string

    add_index :users, :degree_type
    add_index :users, :degree_field
  end
end
