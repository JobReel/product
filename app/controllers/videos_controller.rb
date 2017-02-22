class VideosController < ApplicationController

  def show
    @intro_videos = Video.where("video_section = ? and user_id = ?", "Introduction", current_user.id)
    @education_videos = Video.where("video_section = ? and user_id = ?", "Education", current_user.id)
    @work_videos = Video.where("video_section = ? and user_id = ?", "Work Experience", current_user.id)
    @hobby_videos = Video.where("video_section = ? and user_id = ?", "Hobbies", current_user.id)
    @rec_videos = Video.where("video_section = ? and user_id = ?", "Recommendations", current_user.id)

    @video_new = Video.new
  end

  def create
    @vid = Video.new(video_params)
    @vid.user_id = current_user.id
    @vid.private_id = generate_code(10)
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
