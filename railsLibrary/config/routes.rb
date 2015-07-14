Rails.application.routes.draw do
  resources :books, except: [:new, :edit]
  post 'books/borrow' => 'books#borrow', defaults: { format: :json }
  post 'books/return' => 'books#return', defaults: { format: :json }

	devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  
end
