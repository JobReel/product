class RecommendationsController < ApplicationController

    def new
      @recommendations = Recommendation.new
    end

    def create
      rec = Recommendation.new(recommendations_params)
      rec.user_id=current_user.id
      rec.save!
      redirect_to user_path(current_user.id)
    end

    def edit
      @recommendations = Recommendation.find(params[:id])
    end

    def update
      @recommendations = Recommendation.find(params[:id])
      @recommendations.update_attributes(recommendations_params)
      if @recommendations.valid?
        redirect_to user_path(@recommendations)
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @recommendations = Recommendation.find(params[:id])
      @recommendations.destroy
      redirect_to user_path(current_user.id)
    end

    private

    def recommendations_params
      params.require(:recommendation).permit(:company_title, :company_name, :time_known, :user_relationship, :profile_image)
    end
end
