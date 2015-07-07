module Library
  class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    
    def google_oauth2
      puts "----------google oauth2--------"
        # You need to implement the method below in your model (e.g. app/models/user.rb)
        @user = User.from_omniauth(request.env["omniauth.auth"])

        if @user.persisted?
          flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
          sign_in_and_redirect @user, :event => :authentication
        else
          session["devise.google_data"] = request.env["omniauth.auth"]
          redirect_to new_user_registration_url
        end
    end

    def self.from_omniauth(access_token)
      puts "----------self from omniauth--------"
        data = access_token.info
        user = User.where(:email => data["email"]).first

        unless user
            user = User.create(name: data["name"],
              email: data["email"],
              password: Devise.friendly_token[0,20]
            )
        end
        user
    end

    #skip_before_action :authenticate_user_from_token!, only: [:create]
    #before_action :authenticate_user!
    # POST /library/users
    # Creates an user
    def create
      @user = User.new user_params

      if @user.save
        render json: @user, serializer: Library::SessionSerializer, root: nil
      else
        render json: { error: t('user_create_error') }, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :username, :password, :password_confirmation)
    end
  end
end

