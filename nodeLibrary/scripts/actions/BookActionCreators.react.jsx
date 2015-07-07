var LibraryAppDispatcher = require('../dispatcher/LibraryAppDispatcher.js');
var LibraryConstants = require('../constants/LibraryConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = LibraryConstants.ActionTypes;

module.exports = {

  loadBooks: function() {
    LibraryAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_BOOKS
    });
    WebAPIUtils.loadBooks();
  },
  
  loadBook: function(bookId) {
    LibraryAppDispatcher.handleViewAction({
      type: ActionTypes.LOAD_BOOK,
      bookId: bookId
    });
    WebAPIUtils.loadBook(bookId);
  }

};

