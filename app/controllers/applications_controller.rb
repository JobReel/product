class ApplicationsController < ApplicationController

  def create
    @newapp = Application.new(application_params)
    @jobapp = Job.find(application_params[:job_id])
    @newapp.access_ids.push(@jobapp.team_ids)
    @newapp.access_ids.flatten!
    @newapp.status = "incomplete"
    @newapp.save!

    render json: @newapp

  end

  def update
      @app = Application.find(params[:id])
      @app.update_attributes(application_params)
      if @app.valid?
        redirect_to user_path(@app)
      else
        render :edit, status: :unprocessable_entity
      end
  end

  def destroy
  end

 private

  def application_params
    params.require(:application).permit(:user_id, :job_id, :jobreel_id)
  end

end
