var React = require('react');
var ErrorNotice = require('./common/ErrorNotice.react.jsx');
var Router = require('react-router');
var LibraryConstants = require('../constants/LibraryConstants.js');

var APIEndpoints = LibraryConstants.APIEndpoints;

var RouteResolver = React.createClass({

	statics: {
		isGoogleCallback: function() {
			var locationHash = window.location.hash;
			return (locationHash && locationHash.substr(2).indexOf("state=") === 0)
		}
	},

	mixins: [Router.Navigation],

	componentWillMount: function() {
		if (RouteResolver.isGoogleCallback()) this.transitionTo('books');
	},

	render: function() {
		return <div>Error 404 not found</div>
	}
	
});

module.exports = RouteResolver;
