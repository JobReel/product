class ApplicationsController < ApplicationController

  def create
    @newapp = Application.new(application_params)
    @jobapp = Job.find(application_params[:job_id])
    @newapp.access_ids.push(@jobapp.team_ids)
    @newapp.status = "incomplete"
    @newapp.save!

  end

  def update
  end

  def destroy
  end

 private

  def application_params
    params.require(:application).permit(:user_id, :job_id, :jobreel_id)
  end

end
