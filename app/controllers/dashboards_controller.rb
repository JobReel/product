class DashboardsController < ApplicationController

  def show
    @user = current_user
    @workhistory = WorkHistory.where(user_id: current_user.id)
    @videos = Video.where(user_id: current_user.id)
    @jobreels = Jobreel.where(user_id: current_user.id)
    @jobs = Job.where(user_id: current_user.id)
    @recs = Recommendation.where(user_id: current_user.id)
  end

end
