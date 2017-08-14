class JobsController < ApplicationController
before_action :authenticate_user!, only: [:new, :create, :edit, :update, :destroy]

  def index
    @jobs = Job.all
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
    @jobreel.save!

    redirect_to jobs_path
  end

  def show
    @job = Job.find(params[:id])
    @jobreel = Jobreel.find_by(job_id: params[:id])

    @intro_videos = JSON.parse(@jobreel.section1_videos)
    @challenge_videos = JSON.parse(@jobreel.section2_videos)
    @expectation_videos = JSON.parse(@jobreel.section3_videos)
    @team_videos = JSON.parse(@jobreel.section4_videos)
    @benefit_videos = JSON.parse(@jobreel.section5_videos)

  end

  def edit
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
