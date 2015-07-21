var ServerActionCreators = require('../actions/ServerActionCreators.react.jsx');
var LibraryConstants = require('../constants/LibraryConstants.js');
var request = require('superagent');

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

var APIEndpoints = LibraryConstants.APIEndpoints;

module.exports = {

  loadBooks: function() {
    request.get(APIEndpoints.BOOKS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          ServerActionCreators.receiveBooks(json);
        }
      });
  },

  loadBook: function(bookId) {
    request.get(APIEndpoints.BOOKS + '/' + bookId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          ServerActionCreators.receiveBook(json);
        }
      });
  },

  loadBorrowed: function(userId) {
    request.get(APIEndpoints.BOOKS + '/user/' + userId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          var json = JSON.parse(res.text);
          ServerActionCreators.receiveBorrowed(json);
        }
      });
  },

  updateBookStatus: function(bookId, action) {

    //Better done via Put or Patch?
    action = {
      "BORROW_BOOK": "borrow",
      "RETURN_BOOK": "return"
    }[action];

    request.post(APIEndpoints.BOOKS + "/" + bookId + "/" + action)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .send({"action": action})
      .end(function(error, res){
        if (res) {
          console.log(res);
          var json = JSON.parse(res.text);
          ServerActionCreators.receiveBook(json);
        }
      });
  }

};

