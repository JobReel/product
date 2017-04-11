class DashboardsController < ApplicationController
before_action :authenticate_user!

  def show
    @user = current_user
    @workhistory = WorkHistory.where(user_id: current_user.id)
    @videos = Video.where(user_id: current_user.id)
    @jobreels = Jobreel.where(user_id: current_user.id)
    @jobs = Job.where(user_id: current_user.id)
    @recs = Recommendation.where(user_id: current_user.id)

    @avatar = display_avatar(@user)
    @avatarlg = display_avatar_lg(@user)
    @video_avatar = display_video(@user)
  end

end
