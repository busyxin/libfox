var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var BookStore = require('../../stores/BookStore.react.jsx');
var BookActionCreators = require('../../actions/BookActionCreators.react.jsx');
var State = require('react-router').State;

var Router = require('react-router');
var Link = Router.Link;


var LibfoxTheme = require('../../themes/libfox-theme.js');
var Mui = require('material-ui');
var ThemeManager = new Mui.Styles.ThemeManager();

var RaisedButton = Mui.RaisedButton;

var BookPage = React.createClass({
  
  mixins: [ State ],

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

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
  
  handleBook: function(event) {
    console.log("Borrowbook triggered");
    console.log(this.state);
    console.log(this.getParams());
    BookActionCreators.borrowBook(this.getParams().bookId);
  },

  getStatusMsg: function() {
    var statusMsg = {
      "available": "Book it",
      "borrowed": "Borrowed",
      "lost": "Lost"
    }[this.state.book.status];

    if (!statusMsg) statusMsg = "Unavailable";
    return statusMsg;
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
                <RaisedButton className={"book__details__button_" + this.state.book.status} onClick={this.handleBook} label={this.getStatusMsg()} />
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

