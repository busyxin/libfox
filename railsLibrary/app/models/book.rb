class Book < ActiveRecord::Base
	belongs_to :user
	delegate :user_id, :to => :borrow, :allow_nil => true
end
