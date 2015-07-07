var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3000";

APIRoot = "https://1330a5a6.ngrok.io";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/library/login",
    REGISTRATION:   APIRoot + "/library/users",
    BOOKS:          APIRoot + "/books",
    OAUTH:          APIRoot + "/auth/google_oauth2"
  },

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ActionTypes: keyMirror({
    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    // Routes
    REDIRECT: null,
    RECEIVE_BOOKS: null,
    RECEIVE_BOOK: null,
    LOAD_BOOKS: null,
    LOAD_BOOK: null
  })

};
