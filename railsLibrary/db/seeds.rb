require 'faker'

#10.times do
#  User.create(email: Faker::Internet.email, username: Faker::Internet.user_name, password: 'password')
#end

10.times do
  Book.create(
  	title: Faker::App.name,
  	author: Faker::Name.name,
  	img_url: Faker::Avatar.image("my-own-slug", "250x150", "jpg"),
  	hitfox_id: Faker::Number.number(3),
  	isbn: Faker::Code.isbn,
  	summary: Faker::Lorem.paragraph,
  	publisher: Faker::Company.name,
  	publication_date: Faker::Date.backward(300),
  	language: Faker::Company.name)
end