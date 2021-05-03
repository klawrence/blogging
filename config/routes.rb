Rails.application.routes.draw do
  root to: 'posts#index'
  resources :posts
  resources :sessions
  resources :users

  get :sign_in,  to: 'sessions#new', as: :sign_in
end
