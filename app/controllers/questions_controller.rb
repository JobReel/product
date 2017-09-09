class QuestionsController < ApplicationController

  def create
    @question = Question.new(question_params)
    @question.save!
    redirect_to jobs_path
  end

  def edit
  end


  def update
  end

  def destroy
  end


private

def question_params
  params.require(:question).permit(:text, :job_id, :jobreel_id, :rating)
end



end
