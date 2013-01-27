// Filename: test/spec/modules/RouterSpec.js
define([
	'router'
	], function (router) {

	describe('router', function () {

		var pushStateSpy;

		router.init();

		it('has a "home" route', function () {
			expect(router.routes['']).toEqual('showHome');
		});

		it('triggers the "home" route', function () {
			var home = spyOn(router, 'showHome').andCallThrough();
			pushStateSpy = spyOn(window.history, 'pushState').andCallFake(function (data, title, url) {
				expect(url).toEqual('/');
				router.showHome();
			});
			router.navigate('');
			expect(pushStateSpy).toHaveBeenCalled();
			expect(home).toHaveBeenCalled();
		});
	});

});