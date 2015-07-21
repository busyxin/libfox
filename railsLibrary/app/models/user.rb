class User < ActiveRecord::Base
  devise :database_authenticatable, :recoverable, :validatable, :omniauthable, :omniauth_providers => [:google_oauth2]

  after_create :update_access_token!

  has_many :borrows  
  has_many :books, through: :borrows

  validates :username, presence: true
  validates :email, presence: true

  private

  def update_access_token!
    self.access_token = generate_access_token
    save
  end

  def generate_access_token
    loop do
      token = "#{self.id}:#{Devise.friendly_token}"
      break token unless User.where(access_token: token).first
    end
  end
  
end
