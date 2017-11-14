class ApplicationsController < ApplicationController

  def create
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
