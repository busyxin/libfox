class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :hitfox_id
      t.string :title
      t.string :author
      t.string :isbn
      t.text :summary
      t.string :publisher
      t.date :publication_date
      t.string :language
      t.references :borrow

      t.timestamps null: false
    end

    add_index :books, :hitfox_id, unique: true
  end
end
