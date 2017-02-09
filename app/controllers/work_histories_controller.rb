class WorkHistoriesController < ApplicationController

  def show
    @work_histories = WorkHistory.find(params[:id])
  end

  def new
    @work_histories = WorkHistory.new
  end

  def create
    wh = WorkHistory.new(work_history_params)
    wh.user_id=current_user.id
    wh.save!
    redirect_to user_path(current_user.id)
  end

  def edit
    @work_histories = WorkHistory.find(params[:id])
  end

  def update
    @work_histories = WorkHistory.find(params[:id])
    @work_histories.update_attributes(work_history_params)
    if @work_histories.valid?
      redirect_to user_path(@work_histories)
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def work_history_params
    params.require(:work_history).permit(:company_name, :job_title, :job_start_date, :job_end_date, :job_description)
  end

end
