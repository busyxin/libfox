var LibraryAppDispatcher = require('../dispatcher/LibraryAppDispatcher.js');
var LibraryConstants = require('../constants/LibraryConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = LibraryConstants.ActionTypes;

module.exports = {

  signup: function(email, username, password, passwordConfirmation) {
    LibraryAppDispatcher.handleViewAction({
      type: ActionTypes.SIGNUP_REQUEST,
      email: email,
      username: username,
      password: password,
      passwordConfirmation: passwordConfirmation
    });
    WebAPIUtils.signup(email, username, password, passwordConfirmation);
  },

  login: function(email, password) {
    LibraryAppDispatcher.handleViewAction({
      type: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });
    WebAPIUtils.login(email, password);
  },

  logout: function() {
    LibraryAppDispatcher.handleViewAction({
      type: ActionTypes.LOGOUT
    });
  }
  
};

