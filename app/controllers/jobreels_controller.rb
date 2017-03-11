class JobreelsController < ApplicationController
  before_action :set_jobreels, only: [:update]
  respond_to :html, :js

  def create
    @new_jobreel = Jobreel.new
  end

  def edit
    @jobreel = Jobreel.find(params[:id])
  end

  def update
    @jobreel = Jobreel.find(params[:id])
    byebug
    @jobreel.update_attributes(jobreel_params)
  end

  def destroy
  end


  private

  def set_jobreels
    @jobreel = Jobreel.find(params[:id])
  end

  def jobreel_params
    params.require(:jobreel).permit(:user_id, :section1_videos, :section2_videos, :section3_videos, :section4_videos, :section5_videos)
  end

end
