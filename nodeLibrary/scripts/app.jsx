(function() {
	let React = require('react');
	let injectTapEventPlugin = require('react-tap-event-plugin');
	let router = require('./stores/RouteStore.react.jsx').getRouter();

	window.React = React;

	injectTapEventPlugin();

	router.run(function (Handler, state) {
	  React.render(<Handler/>, document.getElementById('content'));
	});
})();