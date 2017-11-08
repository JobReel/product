class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :set_user
  before_action :configure_permitted_parameters, if: :devise_controller?

  def set_user
    if user_signed_in?
      @user ||= current_user
    else
      @user ||= User.new
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :employer_role, :current_password)
    end
    devise_parameter_sanitizer.permit(:update) do |user_params|
      user_params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
    end
  end

  private

  def authenticate_user
    if user_signed_in?
      super
    else
      redirect_to root_path, notice: "Please Login to view your dashboard!"
    end
  end

  def display_avatar(user)
    if user.image.blank?
      return '<img src="http://res.cloudinary.com/jobreel/image/upload/c_thumb,g_face,h_30,r_15,w_30/v1491256810/default_avatar.png" alt="Default avatar">'
    else
      return '<img src="http://res.cloudinary.com/jobreel/image/upload/c_thumb,g_face,h_30,r_15,w_30/v'+ user.image.stored_version + '/' + user.first_name + '.png" alt="User Avatar">'
    end
  end

  def display_avatar_lg(user)
    if user.image.blank?
      return '<img src="http://res.cloudinary.com/jobreel/image/upload/c_thumb,g_face,h_50,r_25,w_50/v1491256810/default_avatar.png" alt="Default avatar">'
    else
      return '<img src="http://res.cloudinary.com/jobreel/image/upload/c_thumb,g_face,h_50,r_25,w_50/v'+ user.image.stored_version + '/' + user.first_name + '.png" alt="User Avatar">'
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
