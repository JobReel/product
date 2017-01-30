class WorkHistoriesController < ApplicationController

  def show
    @work_histories = WorkHistory.find(params[:id])
  end

  private

  def user_params
    params.require(:work_histories).permit(:first_name, :last_name, :title, :city, :state)
  end

end
