var LibraryAppDispatcher = require('../dispatcher/LibraryAppDispatcher.js');
var LibraryConstants = require('../constants/LibraryConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = LibraryConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _books = [];
var _borrowed = [];
var _errors = [];
var _book = { title: "", summary: "", user: { username: "" }, img_url: "", status: "" };

var BookStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllBorrowed: function() {
    return _borrowed;
  },

  getAllBooks: function() {
    return _books;
  },

  getBook: function() {
    return _book;
  },

  getErrors: function() {
    return _errors;
  }
  
});

BookStore.dispatchToken = LibraryAppDispatcher.register(function(payload) {
  var action = payload.action;
  
  switch(action.type) {
    
    case ActionTypes.RECEIVE_BOOKS:
      _books = action.json.books;
      BookStore.emitChange();
      break;

    case ActionTypes.RECEIVE_BORROWED:
      _books = action.json.books;
      BookStore.emitChange();
      break;
    
    case ActionTypes.RECEIVE_BOOK:
    case ActionTypes.BORROW_BOOK:
    case ActionTypes.RETURN_BOOK:
      if (action.json) {
        _book = action.json.book;
        _errors = [];
      }
      if (action.errors) {
        _errors = action.errors;
      }
      BookStore.emitChange();
      break;
  }

  return true;
});

module.exports = BookStore;

