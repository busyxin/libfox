var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var BookStore = require('../../stores/BookStore.react.jsx');
var BookActionCreators = require('../../actions/BookActionCreators.react.jsx');
var State = require('react-router').State;
var Navigation = require('react-router').Navigation;
var LibfoxTheme = require('../../themes/libfox-theme.js');

var Router = require('react-router');
var Link = Router.Link;

var LibfoxTheme = require('../../themes/libfox-theme.js');
var Mui = require('material-ui');
var ThemeManager = new Mui.Styles.ThemeManager();

var Snackbar = Mui.Snackbar;
var RaisedButton = Mui.RaisedButton;
var Dialog = Mui.Dialog;
var FontIcon = Mui.FontIcon;

var BookPage = React.createClass({
  
  mixins: [ State, Navigation ],

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
    ThemeManager.setTheme(LibfoxTheme);
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
    if (this.isAvailable()) {
      BookActionCreators.borrowBook(this.getParams().bookId);  
      this.refs.borrowedSnackbar.show();
    } else if (this.isBorrowed()) {
      BookActionCreators.returnBook(this.getParams().bookId);  
      this.refs.returnedSnackbar.show();
    }
  },

  handleDismiss: function() {
    this.refs.borrowedSnackbar.dismiss();
    this.refs.returnedSnackbar.dismiss();
  },

  _handleTouchTap: function() {
    this.refs.bookCoverDialog.show();
  },

  getStatusMsg: function() {
    if (this.isBorrowed()) {
      return "Return book"
    }

    var statusMsg = {
      "available": "Book it",
      "borrowed": "Borrowed",
      "lost": "Lost"
    }[this.state.book.status];

    if (!statusMsg) statusMsg = "Unavailable";

    return statusMsg;
  },

  isAvailable: function() {
    return this.state.book.status === "available";
  },

  isBorrowed: function() {
    //Check if the book is in the users list
    return this.state.book.status === "borrowed";
  },

  render: function() {

  let standardActions = [
    { text: 'Close' }
  ];

    return (
      <div className="container">
        <div className="row">
          <div className="col l10 offset-l1">
            <div className="book__details z-depth-3 white">
              <div className="col s12 m5 l8">
                <div className="book__details__author">{this.state.book.author}</div>
                <div className="book__details__title">{this.state.book.title}</div>

                <div className="book__details__categories">
                  <ul className="book__details__categories__tokens">
                    <li>Computer Science</li>
                    <li>Big Data</li>
                    <li>Trololo</li>
                    <li>Startups</li>
                    <li>Computer Science</li>
                    <li>Big Data</li>
                    <li>Trololo</li>
                    <li>Startups</li>
                  </ul>
                </div>

                <div className="book__details__summary">
                  <p className="book__details__summary__text">
                    {this.state.book.summary}
                  </p>
                </div>

                <div className="book__details__hitfox_id">HitFox Internal Id: {this.state.book.hitfox_id}</div>  
                <div className="book__details__created_date">Added to HitFox on: {this.state.book.created_at}</div>  

                <div className="book__details__isbn">ISBN: {this.state.book.isbn}</div>
                <div className="book__details__publisher">Publisher: {this.state.book.publisher}</div>
                <div className="book__details__publication_date">Publication date: {this.state.book.publication_date}</div>
                <div className="book__details__language">Language: {this.state.book.language}</div> 

              </div>
              <div className="col s12 m7 l4 center-align">
                
                <Dialog
                  autoDetectWindowHeight={true}
                  modal={false}
                  actions={standardActions}
                  ref="bookCoverDialog"
                  autoScrollBodyContent={true}>
                  <img src={this.state.book.img_url} alt={this.state.book.title} />
                </Dialog>
                
                <div className="book__details__img z-depth-1"><img src={this.state.book.img_url} alt={this.state.book.title} onClick={this._handleTouchTap}/></div>

                <Snackbar 
                  message="The book has been borrowed."
                  ref="borrowedSnackbar"
                  action="ok"
                  autoHideDuration="3000"
                  onActionTouchTap={this.handleDismiss}/>

                <Snackbar 
                  message="The book has been returned."
                  ref="returnedSnackbar"
                  action="ok"
                  autoHideDuration="3000"
                  onActionTouchTap={this.handleDismiss}/>

                <RaisedButton 
                  className={"book__details__button_" + this.state.book.status} 
                  disabled={!this.isAvailable() && !this.isBorrowed()} 
                  onClick={this.handleBook} 
                  label={this.getStatusMsg()} 
                  style={{
                    width: '100%',
                    margin: '25px auto'
                  }}/>

                <div className="link" onClick={() => this.goBack()}>Go back</div>
              </div>
            </div>
          </div>
        </div>
      </div>
     );
  }

});

module.exports = BookPage;

