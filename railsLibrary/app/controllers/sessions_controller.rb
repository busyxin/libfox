class SessionsController < Devise::SessionsController
  #skip_before_action :authenticate_user_from_token!
  #layout false

  #before_action :authenticate_user!
  
  def create
    super do |resource|
      BackgroundWorker.trigger(resource)
    end
  end
  
#  def create
 #   puts "In sessions controller create ---------^"
    
    #@auth = request.env['omniauth.auth']['credentials']
    #puts "Auth key"
    #puts @auth

 #   puts "omniauth"
 #   puts request.env['omniauth.auth']

  #  @token = Token.create(
  #    access_token: @auth['token'],
  #    refresh_token: @auth['refresh_token'],
  #    expires_at: Time.at(@auth['expires_at']).to_datetime)

  #  render json: @auth
    #redirect_to "http://7724797b.ngrok.io"
  #end
end