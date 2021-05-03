Rails.application.routes.draw do
  root to: 'posts#index'
  resources :posts

  resources :sessions
  get :sign_in,  to: 'sessions#new', as: :sign_in
end
