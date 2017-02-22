class UsersController < ApplicationController

  def show
    @user = User.find(current_user.id)
    @work_histories = WorkHistory.find(params[:id])
    render :layout => 'profile_view'
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

  def logged_in
    if user_signed_in?
      render :layout => 'user-loggedin'
    else
      render :layout => 'public_view'
    end
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :title, :city, :state, :bio, :degree_type, :degree_field, :image, :video)
  end

end
