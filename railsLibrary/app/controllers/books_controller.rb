class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]

  # GET /books
  # GET /books.json
  def index
    @books = Book.all
    render json: @books
  end

  # GET /books/user/:id
  def borrowed
    books_ids = Borrow.where(user_id: params[:id], status: 'borrowed').pluck(:book_id)
    @books = Book.find(books_ids)
    puts @books
    render json: @books
  end

  # PATCH/PUT /books/borrow'
  def borrow
    @book = Book.find(params[:id])

    if Borrow.where(book_id: @book.id, status: 'borrowed').blank?

      #Originally Borrow.new, using Borrow.create to persist and retrieve id
      @borrow = Borrow.new({user_id: 1,
        book_id: @book.id,
        borrowed_date: Time.now,
        return_date: Time.now + 2.weeks,
        status: 'borrowed'})

      @book.update(status: 'borrowed')

      if @book.save && @borrow.save
        render json: @book
      else
        render json: @book.errors, status: :unprocessable_entity
      end

    else 
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /books/return'
  def return
    @book = Book.find(params[:id])
    @borrow = Borrow.where(book_id: @book.id, status: 'borrowed').first  

    puts @borrow  

    if @borrow.present?

      @borrow.status = 'returned'
      @book.update(status: 'available')

      if @borrow.save && @book.save
        render json: @book
      else
        render json: @book.errors, status: :unprocessable_entity
      end

    else 
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # GET /books/1
  # GET /books/1.json
  def show
    render json: @book
  end

  # POST /books
  # POST /books.json
  def create
    @book = Book.new(book_params)

    if @book.save
      render json: @book, status: :created, location: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /books/1
  # PATCH/PUT /books/1.json
  def update

    if params[:action] == "RETURN_BOOK" 
      @book.return()
    elseif params[:action] == "BORROW_BOOK"
      @book.borrow()
    end
 
    if @book.update(book_params)
      head :no_content
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @book.destroy
    head :no_content
  end

  private

    def set_book
      @book = Book.find(params[:id])
    end

    def book_params
      params.require(:book).permit(:title, :isbn, :summary, :publisher, :publication_date, :language, :user_id, :img_url, :status)
    end
end
