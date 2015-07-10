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

  // signup: function(email, username, password, passwordConfirmation) {
  //   request.post(APIEndpoints.REGISTRATION)
  //     .send({ user: { 
  //       email: email, 
  //       username: username,
  //       password: password,
  //       password_confirmation: passwordConfirmation
  //     }})
  //     .set('Accept', 'application/json')
  //     .end(function(error, res) {
  //       if (res) {
  //         if (res.error) {
  //           var errorMsgs = _getErrors(res);
  //           ServerActionCreators.receiveLogin(null, errorMsgs);
  //         } else {
  //           json = JSON.parse(res.text);
  //           ServerActionCreators.receiveLogin(json, null);
  //         }
  //       }
  //     });
  // },

  // login: function(email, password) {
  //   request.post(APIEndpoints.LOGIN)
  //     .send({ username: email, password: password, grant_type: 'password' })
  //     .set('Accept', 'application/json')
  //     .end(function(error, res){
  //       if (res) {
  //         if (res.error) {
  //           var errorMsgs = _getErrors(res);
  //           ServerActionCreators.receiveLogin(null, errorMsgs);
  //         } else {
  //           json = JSON.parse(res.text);
  //           ServerActionCreators.receiveLogin(json, null);
  //         }
  //       }
  //     });
  // },

  loadBooks: function() {
    console.log(sessionStorage.getItem('accessToken'));
    request.get(APIEndpoints.BOOKS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
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
          json = JSON.parse(res.text);
          ServerActionCreators.receiveBook(json);
        }
      });
  }

};

