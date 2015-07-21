class Book < ActiveRecord::Base
	belongs_to :user
	belongs_to :category
	delegate :user_id, :to => :borrow, :allow_nil => true
end
