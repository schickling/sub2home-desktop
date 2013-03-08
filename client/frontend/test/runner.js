// Filename: test/runner.js
require(['../src/js/config'], function () {

	// wait for config loaded
	require({

		baseUrl: '../src/js',

		paths: { // relative to baseUrl
			spec: '../../test/spec',
			sinon: '../../test/lib/sinon/sinon'
		},

		shim: {
			sinon: {
				exports: 'sinon'
			}
		}

	}, [
		// 'spec/modules/RouterSpec',
		// 'spec/modules/NotificationcenterSpec'
		], function () {
		// jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
		// jasmine.getEnv().execute();
	});

});