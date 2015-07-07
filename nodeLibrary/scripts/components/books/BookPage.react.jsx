var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var BookStore = require('../../stores/BookStore.react.jsx');
var BookActionCreators = require('../../actions/BookActionCreators.react.jsx');
var State = require('react-router').State;

var BookPage = React.createClass({
  
  mixins: [ State ],

  getInitialState: function() {
    return { 
      book: BookStore.getBook(), 
      errors: []
    };
  },
 
  componentDidMount: function() {
    BookStore.addChangeListener(this._onChange);
    BookActionCreators.loadBook(this.getParams().bookId);
  },

  componentWillUnmount: function() {
    BookStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ 
      book: BookStore.getBook(),
      errors: BookStore.getErrors()
    }); 
  },
  
  render: function() {
    return (
      <div className="row">
        <div className="book__title">{this.state.book.title}</div>
        <div className="book__author">{this.state.book.author}</div>
        <div className="book__isbn">{this.state.book.isbn}</div>
        <div className="book__body">{this.state.book.summary}</div>
        <div className="book__user">{this.state.book.user}</div>
      </div>
     );
  }

});

module.exports = BookPage;

