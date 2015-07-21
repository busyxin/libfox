Rails.application.routes.draw do
  resources :books, except: [:new]
  get 	'books/user/:id' => 'books#borrowed', defaults: { format: :json }
  post 	'books/:id/borrow' => 'books#borrow', defaults: { format: :json }
  post 	'books/:id/return' => 'books#return', defaults: { format: :json }

	devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  
end
