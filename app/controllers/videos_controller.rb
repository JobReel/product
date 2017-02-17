class VideosController < ApplicationController

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
    @videos = Video.find(params[:id])
    @videos.update_attributes(video_params)
    if @video.valid?
      redirect_to studio_users_path(@videos)
    else
      render :edit, status: :unprocessable_entity
    end


  private

  def video_params
    params.require(:video).permit(:cloud_video, :section)
  end

end
