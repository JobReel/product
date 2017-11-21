class DashboardsController < ApplicationController
before_action :authenticate_user!

  def show
    @user = current_user
    gon.user_id = @user.id
    @workhistory = WorkHistory.where(user_id: current_user.id)
    @videos = Video.where(user_id: current_user.id)
    @jobreels = Jobreel.where(user_id: current_user.id)
    @jobs = Job.where(user_id: current_user.id)
    @recs = Recommendation.where(user_id: current_user.id)

    @video_avatar = display_video(@user)
  end

  def team
    @user = current_user
    @workhistory = WorkHistory.where(user_id: current_user.id)
    @videos = Video.where(user_id: current_user.id)
    @jobreels = Jobreel.where(user_id: current_user.id)
    @jobs = Job.where(user_id: current_user.id)
    @recs = Recommendation.where(user_id: current_user.id)
    @teamcheck = User.all
  end

  def settings
    @user = current_user
    @workhistory = WorkHistory.where(user_id: current_user.id)
    @videos = Video.where(user_id: current_user.id)
    @jobreels = Jobreel.where(user_id: current_user.id)
    @jobs = Job.where(user_id: current_user.id)
    @recs = Recommendation.where(user_id: current_user.id)
  end

end
