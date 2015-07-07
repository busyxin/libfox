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
        <div className="row">
          <BooksList books={this.state.books} />
        </div>
      </div>
    );
  }
});

var BookItem = React.createClass({
  render: function() {
    return (
      <li className="book">
        <div className="book__title">
          <Link to="book" params={ {bookId: this.props.book.id} }>
            {this.props.book.title}
          </Link>
        </div>
        <div className="book__summary">
          {this.props.book.summary}
        </div>
      </li>
      );
  }
});

var BooksList = React.createClass({
  render: function() {
    return (
      <ul className="large-8 medium-10 small-12 small-centered columns">
        {this.props.books.map(function(book, index){
          return <BookItem book={book} key={"book-" + index}/>
        })}
      </ul>
    );
  }
});

module.exports = BooksPage;

