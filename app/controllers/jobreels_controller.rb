class JobreelsController < ApplicationController
end

def create
  @new_jobreel = Jobreel.new
end

def edit
end

def update
  @jobreel = Jobreel.find(params[:id])
end

def destroy
end


private

def jobreel_params
  params.require(:jobreel).permit(:user_id, :section1_videos, :section2_videos, :section3_videos, :section4_videos, :section5_videos)
end
