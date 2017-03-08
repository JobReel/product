class EducationsController < ApplicationController

  def new
    @educations = Education.new
  end

  def create
    ed = Education.new(educations_params)
    ed.user_id=current_user.id
    ed.save!
    redirect_to user_path(current_user.id)
  end

  def edit
    @educations = Education.find(params[:id])
  end

  def update
    @educations = Education.find(params[:id])
    @educations.update_attributes(educations_params)
    if @educations.valid?
      redirect_to user_path(@educations)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @educations = Education.find(params[:id])
    @educations.destroy
    redirect_to user_path(current_user.id)
  end

  private

  def educations_params
    params.require(:education).permit(:college_name, :college_major, :college_end_date, :college_start_date, :education_description)
  end
end
