class AddRoletoUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :employer_role, :boolean, :default => false
  end
end
