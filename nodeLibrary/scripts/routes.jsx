var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;

var LibraryConstants = require('./constants/LibraryConstants.js');
var LibraryApp = require('./components/LibraryApp.react.jsx');
var LoginPage = require('./components/session/LoginPage.react.jsx');
var SignupPage = require('./components/session/SignupPage.react.jsx');
var LandingPage = require('./components/session/LandingPage.react.jsx');
var DashboardPage = require('./components/DashboardPage.react.jsx');
var BorrowedPage = require('./components/BorrowedPage.react.jsx');
var BooksPage = require('./components/books/BooksPage.react.jsx');
var BookPage = require('./components/books/BookPage.react.jsx');
var RouteResolver = require('./components/RouteResolver.react.jsx')

var OauthPath = LibraryConstants.APIEndpoints.OAUTH;

module.exports = (
  <Route name="app" path="/" handler={LibraryApp}>
    <DefaultRoute handler={LandingPage} />
    <Route name="login" path="session/login" handler={LoginPage}/>
    <Route name="signup" path="session/signup" handler={SignupPage}/>
    <Route name="dashboard" path="/dashboard" handler={DashboardPage}/>
    <Route name="borrowed" path="/borrowed" handler={BorrowedPage}/>
    <Route name="books" path="/books" handler={BooksPage}/>
   	<Route name="book" path="/books/:bookId" handler={BookPage}/>
   	<NotFoundRoute handler={RouteResolver} />
  </Route>
);