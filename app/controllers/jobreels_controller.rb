class JobreelsController < ApplicationController
  before_action :set_jobreels, only: [:update]
  respond_to :html, :js

  def index
    render json: Jobreel.where(user_id: current_user.id)
  end

  def jobreel_by_job_id
    render json: Jobreel.where(job_id: (params[:job_id]))
  end

  def instant_apply

    results = Jobreel.where(section2_title: (params[:competency1]), section3_title:(params[:competency2]), section4_title:(params[:competency3]), section5_title:(params[:competency4]))

    render json: results
  end

  def create
    @new_jobreel = Jobreel.new
  end

  def edit
    @jobreel = Jobreel.find(params[:id])
  end

  def update
    @jobreel = Jobreel.find(params[:id])
    @jobreel.update_attributes(jobreel_params)
    render json: @jobreel
  end

  def destroy
  end


  private

  def set_jobreels
    @jobreel = Jobreel.find(params[:id])
  end

  def jobreel_params
    params.require(:jobreel).permit(:user_id, :section1_duration, :section2_duration, :section3_duration, :section4_duration, :section5_duration, {:section1_videos=>[]}, {:section2_videos=>[]}, {:section3_videos=>[]}, {:section4_videos=>[]}, {:section5_videos=>[]}, :section1)
  end

  def employer_jobreel_params
    params.require(:jobreel).permit(:user_id, :job_id, {:section1_videos=>[]}, {:section2_videos=>[]}, {:section3_videos=>[]}, {:section4_videos=>[]}, {:section5_videos=>[]})
  end

end
