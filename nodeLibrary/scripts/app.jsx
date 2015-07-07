var React = require('react');
var router = require('./stores/RouteStore.react.jsx').getRouter();
window.React = React;

router.run(function (Handler, state) {
  React.render(<Handler/>, document.getElementById('content'));
});

jQuery(function() {
  return $.ajax({
    url: 'https://apis.google.com/js/client:plus.js?onload=gpAsyncInit',
    dataType: 'script',
    cache: true
  });
});

window.gpAsyncInit = function() {
  $('button').click(function(e) {
  	console.log("clicked");
    e.preventDefault();
    gapi.auth.authorize({
      response_type: 'code',
      cookie_policy: 'single_host_origin',
      client_id: '793149540663-i5seg678ha6t56m3af4oprh792vrli3c.apps.googleusercontent.com',
      scope: 'email profile'
    }, function(response) {
    	console.log("Response");
      if (response && !response.error) {
      	console.log("No google error");
      	console.log(response);

        $.ajax({
        	type: 'POST', 
        	url: "http://1330a5a6.ngrok.io/auth/google_oauth2/callback", 
        	dataType: 'json', 
        	data: response,
        	crossDomain: true,
          success: function(json) {
          	    	console.log("Success JSON");
          	    	console.log(json);
          }
        });
      } else {
      	console.log("Error")
      	console.log(response);
      }
    });
  });
};
