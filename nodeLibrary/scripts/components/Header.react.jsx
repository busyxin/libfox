var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../actions/SessionActionCreators.react.jsx');

var Header = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string
  },

  logout: function(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },
  
  componentDidMount: function() {
    //There must be a better way
    $(document).ready(function() {
      $('.dropdown-button', React.findDOMNode(this)).each(function() {
        var $that = $(this);
        $that.dropdown({
          inDuration: 300,
          outDuration: 225,
          constrain_width: $that.hasClass("constrainWidth"),
          hover: false,
          gutter: 0,
          belowOrigin: true
        });
      });
    });
  },

  render: function() {
    //Swap loggedIn DOM when sessions are implemented
    var leftNav = this.props.isLoggedIn ? (
        <div></div>
      ) : (
        <ul className="left hide-on-med-and-down">
          <li><a href="#/borrowed">My books</a></li>
          <li><a className="dropdown-button" href="#!" data-activates="dropdown1">Browse<i className="material-icons right">arrow_drop_down</i></a></li>
        </ul>
      );

    var rightNav = this.props.isLoggedIn ? (
        <div></div>
      ) : (
        <ul className="right hide-on-med-and-down ">
          <li><a className="dropdown-button constrainWidth" href="#!" data-activates="dropdown2">chin.man.yeung@hitfoxgroup.com<i className="material-icons right">arrow_drop_down</i></a></li>
        </ul>
      );

    return (
      <div className="navbar-fixed">

        <ul id="dropdown1" className="dropdown-content">
          <li><a href="#/books">All Categories</a></li>
          <li className="divider"></li>
          <li><a href="#">Accounting</a></li>
          <li className="divider"></li>
          <li><a href="#">Business &amp; Economics</a></li>
          <li className="divider"></li>
          <li><a href="#">Design<span className="new badge">2</span></a></li>
          <li className="divider"></li>
          <li><a href="#">Management</a></li>
          <li className="divider"></li>
          <li><a href="#">Technology<span className="new badge">4</span></a></li>
        </ul>

        <ul id="dropdown2" className="dropdown-content">
          <li><a href="#">Settings</a></li>
          <li className="divider"></li>
          <li><a href="#" onClick={this.logout}>Sign out</a></li>
        </ul>

        <nav className="white" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1><a href="#"><strong>HitFox Library</strong></a></h1>
            </li>
          </ul>
          <div className="nav-wrapper">
            {rightNav}
            {leftNav}
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Header;

