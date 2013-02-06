// Filename: src/js/views/store/config/MapView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'gmaps',
	'views/assets/mapStyles'
	], function ($, _, Backbone, gmaps, mapStyles) {

	var MapView = Backbone.View.extend({

		initialize: function () {
			this.loadMap();
		},

		loadMap: function () {

			var mapOptions = {
				center: new gmaps.LatLng(52.52, 13.4),
				// Berlin
				zoom: 13,
				keyboardShortcuts: false,
				disableDefaultUI: true,
				draggable: false,
				disableDoubleClickZoom: true,
				scrollwheel: false,
				styles: mapStyles,
				mapTypeId: gmaps.MapTypeId.TERRAIN
			};

			var map = this.map = new gmaps.Map(this.el, mapOptions);

			// initialize geocoder
			this.geocoder = new gmaps.Geocoder();

			// wait unitl map is loaded
			var self = this;
			gmaps.event.addListenerOnce(map, 'idle', function () {
				gmaps.event.trigger(map, 'resize');
			});

		}

	});

	return MapView;

});