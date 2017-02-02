class WorkHistoriesController < ApplicationController

  def show
    @work_histories = WorkHistory.find(params[:id])
  end

  def edit
    @work_histories = WorkHistory.find(params[:id])
  end

  def update
    @work_histories = WorkHistory.find(params[:id])
    @work_histories.update_attributes(work_history_params)
    redirect_to user_path
  end

  private

  def work_history_params
    params.require(:work_history).permit(:company_name, :job_title, :job_start_date, :job_start_date, :job_description)
  end

end
