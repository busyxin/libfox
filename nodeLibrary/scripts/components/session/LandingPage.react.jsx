var React = require('react');
var SessionActionCreators = require('../../actions/SessionActionCreators.react.jsx');
var SessionStore = require('../../stores/SessionStore.react.jsx');
var ErrorNotice = require('../../components/common/ErrorNotice.react.jsx');
var Router = require('react-router');
var LibraryConstants = require('../../constants/LibraryConstants.js');

var LandingPage = React.createClass({

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
    var errors = (this.state.errors.length > 0) ? <ErrorNotice errors={this.state.errors}/> : <div></div>;
    var OauthPath = LibraryConstants.APIEndpoints.OAUTH;
    return (
      <div className="landing-page">
        <div className="homepage-hero-module">
          {errors}
          <div className="landing__box">
            <h1>Learn something new</h1>
            <h2>Read a book!</h2>
            <a href={OauthPath} className="waves-effect waves-light btn-large green btn__oauth">
              login with your company google account
            </a>
          </div>
          <div className="video-wrapper">
            <div className="filter"></div>
            <video autoPlay loop className="fillWidth">
                <source src="For_wes/For_wes.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                <source src="For_wes/For_wes.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
            </video>
            <div className="poster hidden">
              <img src="For_wes/For_wes.jpg" alt=""/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LandingPage;

