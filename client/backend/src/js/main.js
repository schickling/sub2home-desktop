// Filename: main.js
require(['config'], function () {

	// wait for config loaded and start app
	require(['router', 'server'], function (router, server) {

		server.init();

		// start router
		router.init();

	});
});