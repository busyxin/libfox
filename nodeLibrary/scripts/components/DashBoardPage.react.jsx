var React = require('react');
var Router = require('react-router');
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../stores/SessionStore.react.jsx');
var ErrorNotice = require('./common/ErrorNotice.react.jsx');
var LibraryConstants = require('../constants/LibraryConstants.js');

var DashboardPage = React.createClass({

  getInitialState: function() {
    return { errors: [] };
  },
 
  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({ errors: SessionStore.getErrors() });
  },

  render: function() {
    console.log("landing page");
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var OauthPath = LibraryConstants.APIEndpoints.OAUTH;
    return (
      <div>
        {errors}
        <div className="row">
          <div className="card card--login small-10 medium-6 large-4 columns small-centered">
            <a href={OauthPath}>
              <button>login with your company google account</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DashboardPage;

