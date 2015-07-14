require 'faker'

#10.times do
#  User.create(email: Faker::Internet.email, username: Faker::Internet.user_name, password: 'password')
#end

Book.create(
  title: "Adobe InDesign CC: Das umfassende Handbuch",
  author: "Hans Peter Schneeberger, Robert Feix",
  img_url: "https://s3-eu-west-1.amazonaws.com/cover2.galileo-press.de/video/9783836224314_800_2d.png",
  hitfox_id: 001,
  isbn: "978-3-8362-3569-3",
  summary: "Dieses Standardwerk bietet Ihnen auf 1200 farbigen Seiten alles, was Sie zu Adobe InDesign CS6 wissen müssen und können: Ein Layout anlegen und organisieren, Inhalte für Ihr Layout hinzufügen, professionell mit Text und Typografie umgehen, lange Dokumente meistern, perfekte Printproduktionen, Ebooks exportieren, barrierefreie PDFs mit InDesign erstellen, Tablet-Publishing, InDesign automatisieren mit GREP und Skripting, XML-Publishing uvm. Blättern Sie das Buch immer wieder durch: Auch ein fortgeschrittener InDesign-Nutzer wird häufig auf Neues stoßen und erfahren, wie er noch produktiver mit seiner Software arbeiten kann.",
  publisher: Faker::Company.name,
  publication_date: Faker::Date.backward(300),
  language: "German")

Book.create(
  title: "Agile Retrospectives: Making Good Teams Great",
  author: "Esther Derby",
  img_url: "http://ecx.images-amazon.com/images/I/41tFCu4Y1ML.jpg",
  hitfox_id: "062",
  isbn: "978-3-8362-3569-5",
  summary: "See how to mine the experience of your software development team continually throughout 
  the life of the project. The tools and recipes in this book will help you uncover and solve hidden \(and not-so-hidden) problems with your technology, your methodology, and those difficult people issues on your team. Project retrospectives help teams examine what went right and what went wrong on a project. But traditionally, retrospectives (also known as post-mortems) are only helpful at the end of the project\-\-too late to help. You need agile retrospectives that are iterative and incremental. You need to accurately find and fix problems to help the team today. Now, Derby and Larsen show you the tools, tricks, and tips you need to fix the problems you face on a software development project on an on-going basis. You'll see how to architect retrospectives in general, how to design them specifically for your team and organization, how to run them effectively, how to make the needed changes, and how to scale these techniques up. You'll learn how to deal with problems, and implement solutions effectively throughout the project\-\-not just at the end. With regular tune-ups, your team will hum like a precise, world-class orchestra.",
  publisher: Faker::Company.name,
  publication_date: Faker::Date.backward(300),
  language: "German")


10.times do
  Book.create(
  	title: Faker::App.name,
  	author: Faker::Name.name,
  	img_url: "http://ecx.images-amazon.com/images/I/518BRSUysFL._SY344_BO1,204,203,200_.jpg",
  	hitfox_id: Faker::Number.number(3),
  	isbn: Faker::Code.isbn,
  	summary: Faker::Lorem.paragraph(3),
  	publisher: Faker::Company.name,
  	publication_date: Faker::Date.backward(300),
  	language: Faker::Company.name)
end