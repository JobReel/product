class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_user

  def set_user
    if user_signed_in?
      @user = current_user
    else
    end
  end
end
