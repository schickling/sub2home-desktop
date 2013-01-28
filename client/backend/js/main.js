// Filename: main.js
require(['config'], function () {

	// wait for config loaded and start app
	require(['router'], function (router) {

		// start router
		router.init();

	});
});