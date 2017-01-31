class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(user_params)
    redirect_to user_path
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :title, :city, :state, :bio, :degree_type, :degree_field)
  end

end
