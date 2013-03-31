define([], function () {

	// Google Analytics data
	var urchinId = 'UA-39743634-1',
		loadInterval = 100,
		ready = false;

	// GOOGLE ANALYTICS HELPER ENGINE
	var Analytics = {

		_load: function () {
			var gaHost = ('https:' == document.location.protocol) ? 'https://ssl.' : 'http://www.';
			var s = document.createElement('script');
			s.src = gaHost + 'google-analytics.com/ga.js';
			document.getElementsByTagName('head')[0].appendChild(s);
			var checker = this._wrap(this, this._check);
			setTimeout(checker, loadInterval);
		},

		_check: function () {
			if (window._gat) {
				gaTracker = _gat._getTracker(urchinId);

				gaTracker._initData();

				ready = true;
				pageTracker = gaTracker;
			} else {
				var checker = this._wrap(this, this._check);
				setTimeout(checker, loadInterval);
			}
		},

		trackPageview: function (page) {
			if (ready) {
				gaTracker._trackPageview(page);
			} else {
				var tpv = this._wrap(this, this.trackPageview);
				setTimeout(function () {
					tpv(page);
				}, loadInterval);
			}
		},

		_wrap: function (obj, method) {
			return function () {
				return method.apply(obj, arguments);
			};
		}
	};

	Analytics._load();

	return Analytics;

});