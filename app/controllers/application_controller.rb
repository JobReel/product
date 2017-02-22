class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_user

  def set_user
    if user_signed_in?
      @user = User.find(current_user.id)
    else
    end
  end
end
