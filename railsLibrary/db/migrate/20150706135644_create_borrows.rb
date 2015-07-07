class CreateBorrows < ActiveRecord::Migration
  def change
    create_table :borrows do |t|
    	t.belongs_to :user, index: true
      t.belongs_to :book, index: true
      t.date :borrowed_date
      t.date :return_date
      t.string :status, default: "available"

      t.timestamps null: false
    end
  end
end
