class VideosController < ApplicationController

  def show
    @user = current_user
    gon.user_id = @user.id

    @avatar = display_avatar(@user)
    @avatarlg = display_avatar_lg(@user)

    @jobreel = Jobreel.where(user_id: current_user.id, job_id: nil).first

    @intro_videos = Video.where(video_section: "Introduction", user_id: current_user.id)
    @education_videos = Video.where(video_section: "Education", user_id: current_user.id)
    @work_videos = Video.where(video_section: "Work Experience", user_id: current_user.id)
    @hobby_videos = Video.where(video_section: "Hobbies", user_id: current_user.id)
    @rec_videos = Video.where(video_section: "Recommendations", user_id: current_user.id)

    gon.intro_videos = @intro_videos
    gon.education_videos = @education_videos
    gon.work_videos = @work_videos
    gon.hobby_videos = @hobby_videos
    gon.rec_videos = @rec_videos

    ev = []
    @intro_videos.each do |vid|
      ev << {:overlay=>"video:" + vid.private_id, :flags=>"splice", :width=>300, :height=>200, :crop=>"fill"}
    end
    @education_videos.each do |vid|
      ev << {:overlay=>"video:" + vid.private_id, :flags=>"splice", :width=>300, :height=>200, :crop=>"fill"}
    end
    @work_videos.each do |vid|
      ev << {:overlay=>"video:" + vid.private_id, :flags=>"splice", :width=>300, :height=>200, :crop=>"fill"}
    end
    @hobby_videos.each do |vid|
      ev << {:overlay=>"video:" + vid.private_id, :flags=>"splice", :width=>300, :height=>200, :crop=>"fill"}
    end
    @overlays = [{:width=>300, :height=>200, :crop=>"fill"}]
    @overlays << ev
    @overlays.flatten!


    @video_new = Video.new
    @timeline_preview = current_user.video
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

  def display_default_video(user)
    if user.videos.blank?
      return '<img src="http://res.cloudinary.com/jobreel/image/upload/c_thumb,g_face,h_30,r_15,w_30/v1491256810/default_avatar.png" alt="Default avatar">'
    else
      return '<img src="http://res.cloudinary.com/jobreel/image/upload/c_thumb,g_face,h_30,r_15,w_30/v'+ user.image.stored_version + '/' + user.first_name + '.png" alt="User Avatar">'
    end
  end

end
