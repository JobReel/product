class AddIndexesToWorkHistory < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :title
    add_index :users, :first_name
    add_index :users, :last_name
    add_index :users, :city
    add_index :users, :state
    add_index :work_histories, :company_name
    add_index :work_histories, :job_title
  end
end
