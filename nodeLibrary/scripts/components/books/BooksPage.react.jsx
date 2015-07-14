var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var BookStore = require('../../stores/BookStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var BookActionCreators = require('../../actions/BookActionCreators.react.jsx');
var Router = require('react-router');
var Link = Router.Link;
var timeago = require('timeago');

var BooksPage = React.createClass({

  getInitialState: function() {
    return { 
      books: BookStore.getAllBooks(), 
      errors: []
    };
  },
 
  componentDidMount: function() {
    BookStore.addChangeListener(this._onChange);
    BookActionCreators.loadBooks();
  },

  componentWillUnmount: function() {
    BookStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ 
      books: BookStore.getAllBooks(),
      errors: BookStore.getErrors()
    }); 
  },

  render: function() {
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    return (
      <div>
        {errors}
        <div className="container">
          <div className="row">
            <BooksList books={this.state.books} />
          </div>
        </div>
      </div>
    );
  }
});

var BookItem = React.createClass({

  render: function() {

    var imgCover = {
      backgroundImage: 'url(' + this.props.book.img_url + ')'
    };

    return (
        <div className="book z-depth-1">
            <div className="book__cover" style={imgCover}></div>
            <div className="book__author">
                {this.props.book.author}
            </div>
            <div className="book__title">
                {this.props.book.title}
            </div>
            <div className="book__summary">
              <p className="book__summary__text">
                {this.props.book.summary}
              </p>
            </div>
          <Link to="book" params={ {bookId: this.props.book.id} }>
            <div className="book__bottom white-text">Available</div>
          </Link>
        </div>
      );
  }
});

var BooksList = React.createClass({
  render: function() {
    return (
      <div className="col s12 book_catalog_container">
        {this.props.books.map(function(book, index){
          return <BookItem book={book} key={"book-" + index}/>
        })}
      </div>
    );
  }
});

module.exports = BooksPage;

