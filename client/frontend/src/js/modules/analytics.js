define([], function () {

	// GOOGLE ANALYTICS HELPER ENGINE
	var Analytics = {

		// Google Analytics data
		urchinId: 'UA-39743634-1',
		loadInterval: 100,
		isReady: false,
		tracker: null,

		_load: function () {
			var gaHost = ('https:' == document.location.protocol) ? 'https://ssl.' : 'http://www.',
				s = document.createElement('script');

			s.src = gaHost + 'google-analytics.com/ga.js';
			document.getElementsByTagName('head')[0].appendChild(s);

			var checker = this._wrap(this, this._check);
			setTimeout(checker, this.loadInterval);
		},

		_check: function () {
			var gat = window._gat;

			if (gat) {
				this.tracker = gat._getTracker(this.urchinId);

				this.tracker._initData();
				this.isReady = true;
			} else {
				var checker = this._wrap(this, this._check);
				setTimeout(checker, this.loadInterval);
			}
		},

		trackPageview: function (page) {
			if (this.isReady) {
				this.tracker._trackPageview(page);
			} else {
				var tpv = this._wrap(this, this.trackPageview);
				setTimeout(function () {
					tpv(page);
				}, this.loadInterval);
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