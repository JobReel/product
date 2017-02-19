class VideosController < ApplicationController

  def show
    @videos = Video.where("user_id = ?", current_user.id)
    @video_new = Video.new
  end

  def create
    @vid = Video.new(video_params)
    @vid.user_id=current_user.id
    @vid.private_id=generate_code(10)
    @vid.save!
    redirect_to video_path(current_user.id)
  end

  def edit
    @videos = Video.find(params[:id])
  end

  def update
    @video_new = current_user.videos.create(video_params)
    @video_new.update_attributes(video_params)
    if @video_new.valid?
      redirect_to video_path(current_user.id)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def generate_code(number)
    charset = Array('A'..'Z') + Array('a'..'z')
    Array.new(number) { charset.sample }.join
  end

  def video_params
    params.require(:video).permit(:cloud_video, :video_section, :user_id)
  end
end
