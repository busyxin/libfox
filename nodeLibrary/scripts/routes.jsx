var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var LibraryConstants = require('./constants/LibraryConstants.js');

var LibraryApp = require('./components/LibraryApp.react.jsx');
var LandingPage = require('./components/session/LandingPage.react.jsx');
var GoogleOauth = require('./components/session/GoogleOauth.react.jsx');
var GoogleOauthCallback = require('./components/session/GoogleOauthCallback.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');
var BooksPage = require('./components/books/BooksPage.react.jsx');
var BookPage = require('./components/books/BookPage.react.jsx');

var OauthPath = LibraryConstants.APIEndpoints.OAUTH;

module.exports = (
  <Route name="app" path="/" handler={LibraryApp}>
    <DefaultRoute handler={LandingPage} />
   	<Route name="oauth" path={OauthPath} handler={GoogleOauth}/>
   	<Route name="oauthCallback" path="/auth/google_oauth2/callback" handler={GoogleOauthCallback}/>
    <Route name="login" path="/login" handler={LoginPage}/>
    <Route name="signup" path="/signup" handler={SignupPage}/>
    <Route name="books" path="/books" handler={BooksPage}/>
   	<Route name="book" path="/books/:bookId" handler={BookPage}/>
  </Route>
);