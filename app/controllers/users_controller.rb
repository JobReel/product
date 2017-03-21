class UsersController < ApplicationController

  def show
    @user = User.find(current_user.id)
    if @user.nil?
      @user = User.new
    else
    end
  end

  def edit
    @user = User.find(current_user.id)
  end

  def update
    @user = User.find(current_user.id)
     if @user.video?
      @user.update_attributes(user_params)
      if @user.valid?
        redirect_to user_path(@user)
      else
        render :edit, status: :unprocessable_entity
      end
    else
      @new_jobreel = Jobreel.new

      @new_jobreel.user_id = current_user.id
      @new_jobreel.section1_title = "Introduction"
      @new_jobreel.section2_title = "Education"
      @new_jobreel.section3_title = "Work Experience"
      @new_jobreel.section4_title = "Hobbies"
      @new_jobreel.section5_title = "Recommendations"
      @new_jobreel.save!

      @user.update_attributes(user_params)
      if @user.valid?
        redirect_to user_path(@user)
      else
        render :edit, status: :unprocessable_entity
      end
    end
  end

private

def generate_code(number)
  charset = Array('A'..'Z') + Array('a'..'z')
  Array.new(number) { charset.sample }.join
end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :title, :city, :state, :bio, :degree_type, :degree_field, :image, :video)
  end

end
