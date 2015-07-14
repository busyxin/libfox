class AddStatusToBooks < ActiveRecord::Migration
  def change
    add_column :books, :status, :string, null: false, default: 'available'
  end
end
