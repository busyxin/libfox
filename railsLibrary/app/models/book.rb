class Book < ActiveRecord::Base
	belongs_to :user
	has_many :book_categories
	has_many :categories, through: :book_categories
	delegate :user_id, :to => :borrow, :allow_nil => true
end
