var LibraryAppDispatcher = require('../dispatcher/LibraryAppDispatcher.js');
var LibraryConstants = require('../constants/LibraryConstants.js');

var ActionTypes = LibraryConstants.ActionTypes;

module.exports = {

  redirect: function(route) {
    LibraryAppDispatcher.handleViewAction({
      type: ActionTypes.REDIRECT,
      route: route
    });
  }

};


