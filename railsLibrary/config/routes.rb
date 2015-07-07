Rails.application.routes.draw do
  resources :books, except: [:new, :edit]
  post 'books/borrow' => 'books#borrow', defaults: { format: :json }
  post 'books/return' => 'books#return', defaults: { format: :json }

  devise_for :user, only: []
  
  namespace :library, defaults: { format: :json } do
    resource :login, only: [:create], controller: :sessions
    resources :users, only: [:create]
  end

	get "auth/:provider/callback" => 'library/sessions#create'
end
