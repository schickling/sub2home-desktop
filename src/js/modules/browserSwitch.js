// Filename: src/js/modules/BrowserSwitch.js
define([
    'modules/browserDetect'
    ], function (browserDetect) {

	var BrowserSwitch = {

		init: function () {

			browserDetect.init();

			if (this._isMobileClient()) {
				this._changeUrlPathname('mobil');
			} else if (this._isUnsupportedBrowser()) {
				this._changeUrlPathname('browser');
			}
		},

		_isMobileClient: function () {
			return (window.innerWidth <= 1000 || window.innerHeight <= 500) && window.orientation !== undefined;
		},

		_isUnsupportedBrowser: function () {
			var browser = browserDetect.browser,
				version = browserDetect.version;

			if (browser == 'Explorer' && version <= 7) {
				return true;
			}

			if (browser == 'Firefox' && version <= 3) {
				return true;
			}

			if (browser == 'Chrome' && version <= 3) {
				return true;
			}

			if (browser == 'Safari' && version <= 3) {
				return true;
			}

			if (browser == 'Opera' && version <= 10) {
				return true;
			}

			return false;
		},

		_changeUrlPathname: function (pathname) {

			pathname = '/' + pathname;

			if (window.location.pathname != pathname) {
				window.location.pathname = pathname;
			}
		}

	};

	return BrowserSwitch;
});