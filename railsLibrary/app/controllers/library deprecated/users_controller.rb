module Library
  class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

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

