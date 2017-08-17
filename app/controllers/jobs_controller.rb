class JobsController < ApplicationController
before_action :authenticate_user!, only: [:new, :show, :create, :edit, :update, :destroy]

  def index
    @jobs = Job.all

    @user = current_user
    @avatar = display_avatar(@user)
    @avatarlg = display_avatar_lg(@user)
  end

  def new
    @job = Job.new
  end

  def create
    @job = Job.create(job_params)
    @job.user_id = current_user.id
    @job.save!

    @jobreel = Jobreel.new()
    @jobreel.user_id = current_user.id
    @jobreel.job_id = Job.last.id
    @jobreel.section1_title = "About the Company"
    @jobreel.section2_title = "Challenges"
    @jobreel.section3_title = "Expectations"
    @jobreel.section4_title = "Team"
    @jobreel.section5_title = "Perks & Benefits"
    @jobreel.section1_duration = 0
    @jobreel.section2_duration = 0
    @jobreel.section3_duration = 0
    @jobreel.section4_duration = 0
    @jobreel.section5_duration = 0
    @jobreel.save!

    redirect_to jobs_path
  end

  def show
    @job = Job.find(params[:id])
    @jobreel = Jobreel.find_by(job_id: params[:id])

    @user = current_user
    @avatar = display_avatar(@user)
    @avatarlg = display_avatar_lg(@user)

    @intro_videos = @jobreel.section1_videos
    @challenge_videos = @jobreel.section2_videos
    @expectation_videos = @jobreel.section3_videos
    @team_videos = @jobreel.section4_videos
    @perks_videos = @jobreel.section5_videos

    @all_videos = JSON.parse(@intro_videos) + JSON.parse(@challenge_videos) + JSON.parse(@expectation_videos) + JSON.parse(@team_videos) + JSON.parse(@perks_videos)

    gon.totalduration = 0

    unless @intro_videos.nil?
      gon.intro_videos = JSON.parse(@intro_videos)
      gon.section1Duration = @jobreel.section1_duration
      gon.totalduration = gon.totalduration + gon.section1Duration
    end

    unless @challenge_videos.nil?
      gon.challenge_videos = JSON.parse(@challenge_videos)
      gon.section2Duration = @jobreel.section2_duration
      gon.totalduration = gon.totalduration + gon.section2Duration
    end

    unless @expectation_videos.nil?
      gon.intro_videos = JSON.parse(@expectation_videos)
      gon.section3Duration = @jobreel.section3_duration
      gon.totalduration = gon.totalduration + gon.section3Duration
    end

    unless @team_videos.nil?
      gon.intro_videos = JSON.parse(@team_videos)
      gon.section4Duration = @jobreel.section4_duration
      gon.totalduration = gon.totalduration + gon.section4Duration
    end

    unless @perks_videos.nil?
      gon.intro_videos = JSON.parse(@perks_videos)
      gon.section5Duration = @jobreel.section5_duration
      gon.totalduration = gon.totalduration + gon.section5Duration
    end
byebug

  end

  def edit
    @user = current_user
    @avatar = display_avatar(@user)
    @avatarlg = display_avatar_lg(@user)

    @job = Job.find(params[:id])
  end

  def update
    @job = Job.find(params[:id])
    @job.user_id = current_user.id
    @job.update_attributes(job_params)
    redirect_to jobs_path(:id)
  end

  def destroy
    @job = Job.find(params[:id])
    @job.destroy
    redirect_to jobs_path
  end

private

def job_params
  params.require(:job).permit(:user_id, :job_title, :city, :state, :job_description, :requirements)
end


end
