// Filename: src/js/modules/postalOracle.js
define([
    'gmaps'
    ], function (gmaps) {

	"use strict";

	var geocoder = new gmaps.Geocoder();

	var PostalOracle = {

		shouldBeCanceled: false,

		calculate: function (successCallback, errorCallback) {

			var self = this,
				postal;

			if (!navigator.geolocation) {
				errorCallback();
				return;
			}

			this.shouldBeCanceled = false;

			navigator.geolocation.getCurrentPosition(function (position) {

				if (self.shouldBeCanceled) return;

				var latlng = new gmaps.LatLng(position.coords.latitude, position.coords.longitude);

				geocoder.geocode({
					latLng: latlng
				}, function (results, status) {

					if (self.shouldBeCanceled) return;

					if (status == gmaps.GeocoderStatus.OK) {

						// parse results for postal
						for (var i = 0; i < results[0].address_components.length; i++) {
							for (var j = 0; j < results[0].address_components[i].types.length; j++) {
								if (results[0].address_components[i].types[j] == "postal_code") {
									postal = results[0].address_components[i].long_name;
									break;
								}
							}
						}

						if (postal < 10000 || postal > 99999) {
							errorCallback();
						} else {
							self.setPostal(postal);
							successCallback();
						}

					} else {
						errorCallback();
					}

				});
			}, errorCallback, {
				timeout: 10000
			});
		},

		cancel: function () {
			this.shouldBeCanceled = true;
		},

		setPostal: function (postal) {
			localStorage.setItem('postal', postal);
		},

		getPostal: function () {
			return localStorage.getItem('postal');
		}

	};

	return PostalOracle;

});