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
      user_params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :employer_role)
    end
  end

end
