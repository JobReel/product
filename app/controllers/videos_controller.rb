class VideosController < ApplicationController

  def show
    @videos = Video.where("user_id = ?", current_user.id)
    # @video_new = Video.new
    @video_new = Video.find(params[:id])
  end

  def create
    # vid = Video.new(video_params)
    # vid.user_id=current_user.id
    # vid.save!
    # Video.create(video_params)
    # redirect_to video_path(current_user.id)
  end

  def edit
    @videos = Video.find(params[:id])
  end

  def update
    @video_new = current_user.videos.create(video_params)
    @video_new.update_attributes(video_params)
    if @video_new.valid?
      redirect_to video_path(@video_new)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def video_params
    params.require(:video).permit(:cloud_video, :video_section, :user_id)
  end
end
