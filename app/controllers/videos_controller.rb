class VideosController < ApplicationController

  def show
    # @videos = Video.where("user_id = ?", current_user.id)
    @library = Video.find(current_user.id)
  end

  def new
    @videos = Video.new
  end

  def create
    vid = Video.new(video_params)
    vid.user_id=current_user.id
    vid.save!
    redirect_to studio_users_path(current_user.id)
  end

  def edit
    @videos = Video.find(params[:id])
  end

  def update
    @videos = Video.find(current_user.id)
    @videos.update_attributes(video_params)
    if @videos.valid?
      redirect_to video_path(@videos)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def video_params
    params.require(:video).permit(:cloud_video, :section, :user_id)
  end
end
