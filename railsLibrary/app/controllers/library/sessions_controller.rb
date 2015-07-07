module Library
  class SessionsController < ApplicationController
    #skip_before_action :authenticate_user_from_token!
    #layout false

    #before_action :authenticate_user!
    
    def new
    end
   
    def create
      @auth = request.env['omniauth.auth']['credentials']
      puts "Auth key"
      puts @auth

      puts "omniauth"
      puts request.env['omniauth.auth']
      @token = Token.create(
        access_token: @auth['token'],
        refresh_token: @auth['refresh_token'],
        expires_at: Time.at(@auth['expires_at']).to_datetime)

      puts "Current User"
      puts current_user


        render json: @auth
      #redirect_to "http://7724797b.ngrok.io"
    end


    # POST /library/login
=begin
    def create
      @user = User.find_for_database_authentication(email: params[:username])
      return invalid_login_attempt unless @user

      if @user.valid_password?(params[:password])
        sign_in :user, @user
        render json: @user, serializer: SessionSerializer, root: nil
      else
        invalid_login_attempt
      end
    end

    private

    def invalid_login_attempt
      warden.custom_failure!
      render json: {error: t('sessions_controller.invalid_login_attempt')}, status: :unprocessable_entity
    end
=end


  end
end