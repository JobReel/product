class ApplicationsController < ApplicationController

  def create
    @newapp = Application.new(application_params)
    # @newapp.access_ids = Job.find_by_id(application_params.user_id).team_ids
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
