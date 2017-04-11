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

end
