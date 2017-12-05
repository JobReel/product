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
    @jobs = Job.order(created_at: :desc).where(user_id: current_user.id)
    @recs = Recommendation.where(user_id: current_user.id)
    @teamcheck = User.all
    gon.user_id = @user.id
  end

  def settings
    @user = current_user
    @workhistory = WorkHistory.where(user_id: current_user.id)
    @videos = Video.where(user_id: current_user.id)
    @jobreels = Jobreel.where(user_id: current_user.id)
    @jobs = Job.where(user_id: current_user.id)
    @recs = Recommendation.where(user_id: current_user.id)
    gon.user_id = @user.id
  end

  def addtoteamAPI
    @userlist = User.select("id, title, image, image_id, first_name, last_name").all

    render json: @userlist
  end

  def addnewpersonAPI
    @joblist = Job.select("id, job_title, logo, city, state, created_at").all

    render json: @joblist
  end  

end
