// Filename: src/js/views/store/config/MapView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'gmaps',
	'views/assets/mapStyles'
	], function ($, _, Backbone, gmaps, mapStyles) {

	var MapView = Backbone.View.extend({

		map: null,

		marker: null,

		initialize: function () {
			this.loadMap();
		},

		loadMap: function () {

			var mapOptions = {
				center: new gmaps.LatLng(this.model.get('latitude'), this.model.get('longitude')),
				// Berlin
				zoom: 15,
				keyboardShortcuts: false,
				disableDefaultUI: true,
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
				self.addMarker();
				self.listenForCoordinateChanges();
			});

		},

		addMarker: function () {
			var icon = new gmaps.MarkerImage('../../img/static/common/pin.png', // url
			null, // size
			null, // origin
			new gmaps.Point(29, 87) // anchor
			);

			var marker = this.marker = new gmaps.Marker({
				position: this.map.getCenter(),
				icon: icon
			});

			// To add the marker to the map, call setMap();
			marker.setMap(this.map);
		},

		listenForCoordinateChanges: function () {
			this.model.on('change', function () {
				var newCenter = new gmaps.LatLng(this.model.get('latitude'), this.model.get('longitude'));
				this.marker.setPosition(newCenter);
				this.map.setCenter(newCenter);
			}, this);
		}

	});

	return MapView;

});