var LibraryAppDispatcher = require('../dispatcher/LibraryAppDispatcher.js');
var LibraryConstants = require('../constants/LibraryConstants.js');

var ActionTypes = LibraryConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    LibraryAppDispatcher.handleServerAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receiveBooks: function(json) {
    LibraryAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOKS,
      json: json
    });
  },

  receiveBorrowed: function(json) {
    LibraryAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BORROWED,
      json: json
    });
  },

  receiveBook: function(json) {
    LibraryAppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_BOOK,
      json: json
    });
  }
};
