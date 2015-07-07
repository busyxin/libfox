class BookSerializer < ActiveModel::Serializer
  attributes :id, :author, :title, :isbn, :summary, :publisher, :publication_date, :language, :user, :img_url
end
