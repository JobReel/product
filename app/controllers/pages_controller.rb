class PagesController < ApplicationController

  def index
    # redirect to dashboard if user is signed in already
    # http://stackoverflow.com/questions/14416234/devise-redirect-automatically-from-root-url-if-signed-in
    if user_signed_in?
      redirect_to dashboards_path
    end
  end

  def employer
  end

  def vidtest
  end

  def customplayer
  end

end
