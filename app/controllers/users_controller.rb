class UsersController < ApplicationController

  def show
    @user = User.find(current_user.id)
    if @user.nil?
      @user = User.new
    else
    end
    @avatar = display_avatar(@user)
    @video_avatar = display_video(@user)
  end

  def edit
    @user = User.find(current_user.id)
  end

  def update
    @user = User.find(current_user.id)
    @user.update_attributes(user_params)
      if @user.valid?
        redirect_to user_path(@user)
      else
        render :edit, status: :unprocessable_entity
      end
  end

private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :title, :city, :state, :bio, :degree_type, :degree_field, :image, :video)
  end

  def display_avatar(user)
    if user.image.blank?
      return '<img src="http://res.cloudinary.com/jobreel/image/upload/v1491256810/default_avatar.png" alt="Default avatar">'
    else
      return '<img src="http://res.cloudinary.com/jobreel/image/upload/c_thumb,g_face,h_40,r_20,w_40/v'+ user.image.stored_version + '/' + user.first_name + '.png" alt="User Avatar">'
    end
  end

  def display_video(user)
    if user.video.blank?
      return '<img src="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_72,w_100/poatoe.jpg" alt="Default Video">'
    else
      return '<img src="http://res.cloudinary.com/jobreel/video/upload/c_fill,h_72,w_100/' + user.first_name + '.jpg" alt="User Video">'
    end
  end


end
