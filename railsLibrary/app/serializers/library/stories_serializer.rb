module Library
  class StoriesSerializer < ActiveModel::Serializer
    
    attributes :title, :created_at, :abstract, :id
    has_one :user, serializer: Library::UserSerializer

    def abstract
      object.body[0..200]
    end

  end
end

