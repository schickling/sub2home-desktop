// Filename: src/js/modules/postalOracle.js
define([
    'gmaps'
    ], function (gmaps) {

	"use strict";

	var geocoder = new gmaps.Geocoder();

	var PostalOracle = {

		shouldBeCanceled: false,

		calculate: function (successCallback, errorCallback) {

			if (!navigator.geolocation) {
				errorCallback();
			}

			var self = this;

			this.shouldBeCanceled = false;

			navigator.geolocation.getCurrentPosition(function (position) {

				if (self.shouldBeCanceled) return;

				var latlng = new gmaps.LatLng(position.coords.latitude, position.coords.longitude);

				geocoder.geocode({
					latLng: latlng
				}, function (results, status) {

					if (self.shouldBeCanceled) return;

					if (!self.userInteractionTookPlace) {

						if (status == gmaps.GeocoderStatus.OK) {
							var postal = 0;

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
								successCallback(postal);
							}

						} else {
							errorCallback();
						}

					}
				});
			}, errorCallback, {
				timeout: 10000
			});
		},

		cancel: function () {
			this.shouldBeCanceled = true;
		}

	};

	return PostalOracle;

});