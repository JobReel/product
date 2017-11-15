class AddTeamIdstoJobs < ActiveRecord::Migration[5.0]
  def change
    add_column :jobs, :team_ids, :integer, array: true, default: []
  end
end
