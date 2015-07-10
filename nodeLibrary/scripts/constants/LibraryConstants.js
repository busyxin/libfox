var keyMirror = require('keymirror');

var APIRoot = "https://c03d76d0.ngrok.io";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/library/login",
    REGISTRATION:   APIRoot + "/library/users",
    BOOKS:          APIRoot + "/books",
    OAUTH:          "https://accounts.google.com/o/oauth2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=https://22862254.ngrok.io/&response_type=token&client_id=793149540663-i5seg678ha6t56m3af4oprh792vrli3c.apps.googleusercontent.com"
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
