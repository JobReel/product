class JobsController < ApplicationController
before_action :authenticate_user!, only: [:new, :show, :create, :edit, :update, :destroy]

  def index
    @jobs = Job.all

    @user = current_user
    @avatar = display_avatar(@user)
    @avatarlg = display_avatar_lg(@user)
  end

  def new
    @user = current_user
    gon.user_id = @user.id
    @job = Job.new
      
    @competencies = Competency.all
    gon.competencies = @competencies

    @questions = Question.all
    gon.questions = @questions

  end

  def create
    @job = Job.create(job_params)
    @job.team_ids.push(current_user.id)
    @job.save!

    render json: @job

  end

  def step2
    @job = Job.find(params[:id])
    @user = current_user
    gon.user_id = @user.id

  end


  def show
    @job = Job.find(params[:id])
    @competencies = {ambition: "Ambition",
     technical: "Technical Skills",
     creative: "Creative Problem Solving",
     cultural: "Cultural Sensitivity",
     leadership: "Leadership",
     emotional: "Emotional Intelligence",
     hobbies: "Hobbies & Interests",
     custom: "Custom Question"}
    @jobreel = Jobreel.find_by(job_id: params[:id])
    gon.user_id = current_user.id


    @user = current_user
    @avatar = display_avatar(@user)
    @avatarlg = display_avatar_lg(@user)

    @intro_videos = @jobreel.section1_videos
    @challenge_videos = @jobreel.section2_videos
    @expectation_videos = @jobreel.section3_videos
    @team_videos = @jobreel.section4_videos
    @perks_videos = @jobreel.section5_videos
    @all_videos = "[\"default_intro\"]"


    unless (@intro_videos.nil? || @challenge_videos.nil? || @expectation_videos.nil? || @team_videos.nil? || @expectation_videos.nil?)
      @all_videos = JSON.parse(@intro_videos) + JSON.parse(@challenge_videos) + JSON.parse(@expectation_videos) + JSON.parse(@team_videos) + JSON.parse(@perks_videos)
    end
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

    if (@intro_videos.nil? || @challenge_videos.nil? || @expectation_videos.nil? || @team_videos.nil? || @expectation_videos.nil?)
      gon.totalduration = 10
    end
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
    @job.requirements = @job.requirements.reject(&:empty?)
    @job.save!
    # redirect_to jobs_path(:id)

    render json: @job
  end

  def destroy
    @job = Job.find(params[:id])
    @jobreel = Jobreel.find_by(job_id: params[:id])
    @job.destroy
    @jobreel.destroy
    redirect_to jobs_path
  end

private

def job_params
  params.require(:job).permit(:user_id, {:team_ids => []}, :job_title, :city, :state, :job_description, {:requirements => []}, {:question_id => []}, :qualifications)
end


end
