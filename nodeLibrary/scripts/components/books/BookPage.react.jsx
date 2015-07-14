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
      <div className="container">
        <div className="row">
          <div className="col l10 offset-l1">
            <div className="book__details z-depth-3 white">
              <div className="col s12 m5 l8">
                <div className="book__details__author">{this.state.book.author}</div>
                <div className="book__details__title">{this.state.book.title}</div>
                <div className="book__details__summary">
                  <p className="book__details__summary__text">
                    {this.state.book.summary}
                  </p>
                </div>
              </div>
              <div className="col s12 m7 l4 center-align">
                <div className="book__details__img z-depth-1"><img src={this.state.book.img_url} alt={this.state.book.title} /></div>
                <a className="book__details__button waves-effect waves-light btn-large green">Book it</a>
                <div className="book__details__isbn">{this.state.book.isbn}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
     );
  }
});

module.exports = BookPage;

