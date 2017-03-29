class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session, only: Proc.new { |c| c.request.format.json? }
  before_action :set_user

  def set_user
    if user_signed_in?
      @user ||= current_user
    else
      @user ||= User.new
    end
  end
end
