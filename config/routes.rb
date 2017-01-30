Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index'
  # Going to need to use nested resources so that a work history is created for a specific user
  resources :users, only: [:show, :edit, :update, :destroy]
end
