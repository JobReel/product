Rails.application.routes.draw do
  devise_for :users, controllers: {sessions: "sessions", registrations: "registrations"}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index'
  get '/employer' => 'pages#employer'
  get '/employerAPI' => 'jobreels#jobreel_by_job_id'
  get '/vidtest' => 'pages#vidtest'
  get '/customplayer' => 'pages#customplayer'
  # Going to need to use nested resources so that a work history is created for a specific user

  resources :users, only: [:show, :edit, :update, :destroy]
  resources :work_histories
  resources :educations
  resources :recommendations
  resources :videos
  resources :jobs
  resources :jobreels
  resource :dashboards, only: [:show]
end
