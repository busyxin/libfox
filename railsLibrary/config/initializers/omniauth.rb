Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['CLIENT_ID'], ENV['CLIENT_SECRET'], {
  	scope: ['email', 'profile', 'https://www.googleapis.com/auth/gmail.readonly'],
  	access_type: 'offline',
  	image_aspect_ratio: 'square',
  	image_size: 50,
  	provider_ignores_state: true}
end