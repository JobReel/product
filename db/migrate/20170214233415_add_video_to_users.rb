class AddVideoToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :video, :string
  end
end
